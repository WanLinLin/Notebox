// score width: used to initial mao-music-sheet-box div width to set score width
var initial_width = $('#mao-music-sheet-box').width() - 30;

// piano and guitar score canvas
var pianoScore = $('#piano_score');
var guitarScore = $('#guitar_score');

// piano vextab 'notes' string, starts with "notes"
var pianoNoteStr = 'notes ';
// guitar vextab 'notes' string, starts with "notes"
var guitarNoteStr = 'notes ';
// piano vextab 'text' string, starts with "notes"
var pianoTextStr = 'text ';
// guitar vextab 'text' string, starts with "notes"
var guitarTextStr = 'text ';

/**
 * pianoVexStr and guitarVexStr is currently the same, but basic piano chord composition 
 * is different from basic guitar chord, so the VexStrs will be different in the future.
 */

// piano final vextab string
var pianoVexStr;
// guitar final vextab string
var guitarVexStr;


var curChordName = '';
// current parsing chord for piano
var curPianoChordComposition = '';
// current parsing chord for guitar
var curGuitarChordComposition = '';
// using to count how many measure is parsed
var measureCount = 0;

// song has no vextab
if(vex_piano["musicString"] == "" || vex_piano === 'None') {
  console.log('no vextab');
  pianoVexStr = 'options width=' + initial_width.toString() + ' space=14 scale=1.0 font-size=12\n';
  pianoVexStr += 'stave\n';
  pianoTextStr += ':q, 無樂譜資料'
  pianoVexStr += pianoTextStr

  guitarVexStr = 'options width=' + initial_width.toString() + ' space=14 scale=1.0 font-size=12\n';
  guitarVexStr += 'stave\n';
  guitarTextStr += ':q, 無樂譜資料'
  guitarVexStr += guitarTextStr
}
else {
  vex_piano = JSON.parse(vex_piano);
  // Key signature of the score
  var key = vex_piano["key"];
  // Tempo of the score
  var tempo = 'tempo=120';
  // Tempo of the score
  var time = vex_piano["time"];
  // Guitar tuning of the score (standard|dropd|eb|E/5,B/4,G/4,D/4,A/3,E/3)
  var tuning = 'standard'
  // tokens in musicString
  var token = vex_piano["musicString"].split(" ");

  /**
   * initial vexstring: set up options and add the first stave 
   * which has to show the time signature and key signature.
   */
  pianoVexStr = 'options width=' + initial_width.toString() + ' space=14 scale=1.0 font-size=16 stave-distance=50\n';
  pianoVexStr += 'stave\n';
  if(key != '')
    pianoVexStr += 'key=' + key + '\n';
  if(time != '')
    pianoVexStr += 'time=' + time + '\n';

  guitarVexStr = 'options width=' + initial_width.toString() + ' space=14 scale=1.0 tab-stems=true font-size=16 stave-distance=200\n';
  guitarVexStr += 'tabstave\n';
  if(key != '')
    guitarVexStr += 'key=' + key + '\n';
  if(time != '')
    guitarVexStr += 'time=' + time + '\n';

  /*===========================================
  =            main parse function            =
  ===========================================*/
  for(var i = 0; i < token.length; i++) {
    var t = token[i];

    // parse bar
    if(t.indexOf('|') > -1) {
      parseBar(t);

      // every two measure add new stave
      if(measureCount % 2 == 1) {
        pianoNoteStr += '\n';
        guitarNoteStr += '\n';

        pianoVexStr += pianoNoteStr;
        pianoVexStr += pianoTextStr.substring(0, pianoTextStr.length - 2); // substring to remove the last comma

        guitarVexStr += guitarNoteStr;
        guitarVexStr += guitarTextStr.substring(0, guitarTextStr.length - 2); // substring to remove the last comma

        pianoVexStr += '\nstave\n'
        pianoNoteStr = 'notes ';
        pianoTextStr = 'text ';

        guitarVexStr += '\ntabstave\n';
        guitarNoteStr = 'notes ';
        guitarTextStr = 'text ';
      }
      measureCount++;
    }

    // parse chord
    if(hasMusialAlphabes(t)) {
      parseChord(t.substring(0, t.length - 1));
      t = t.substring(t.length - 1, t.length);
    }

    // parse duration
    if(hasDurations(t)){
      parseDuration(t);
    }
  }

  /*----------  fix the dumb parser  ----------*/
  if(measureCount % 2 == 1) {
    pianoVexStr += pianoNoteStr + '\n';
    pianoVexStr += pianoTextStr.substring(0, pianoTextStr.length - 2); // substring to remove the last comma

    guitarVexStr += guitarNoteStr + '\n';
    guitarVexStr += guitarTextStr.substring(0, guitarTextStr.length - 2); // substring to remove the last comma
  }
  if(measureCount % 2 == 0) {
    // remove the last null stave
    pianoVexStr = pianoVexStr.substring(0, pianoVexStr.lastIndexOf('stave'));
    guitarVexStr = guitarVexStr.substring(0, guitarVexStr.lastIndexOf('tabstave'));
  }
}

/*=====  End of main parse function  ======*/

/*============================================
=            main render function            =
============================================*/

// Load VexTab module.
vextab = VexTabDiv;

$(function() {
  console.log(pianoVexStr);
  console.log(guitarVexStr);
  VexTab = vextab.VexTab;
  Artist = vextab.Artist;
  Renderer = Vex.Flow.Renderer;

  Artist.DEBUG = false;
  VexTab.DEBUG = false;

  // Create VexFlow Renderer from canvas element with id #boo
  piano_renderer = new Renderer($('#piano_score')[0], Renderer.Backends.CANVAS);
  guitar_renderer = new Renderer($('#guitar_score')[0], Renderer.Backends.CANVAS);

  // Initialize VexTab artist and parser.
  piano_artist = new Artist(10, 10, 600, {scale: 1.0});
  piano_vextab = new VexTab(piano_artist);
  guitar_artist = new Artist(10, 10, 600, {scale: 1.0});
  guitar_vextab = new VexTab(guitar_artist);

  function render() {
    try {
      // parse and render piano score
      piano_vextab.reset();
      piano_artist.reset();
      piano_vextab.parse(pianoVexStr);
      piano_artist.render(piano_renderer);

      // parse and render guitar score
      guitar_vextab.reset();
      guitar_artist.reset();
      guitar_vextab.parse(guitarVexStr);
      guitar_artist.render(guitar_renderer);
    } catch (e) {
      console.log(e['message']);
    }
  }
  
  var oldWidthString = 'width=' + initial_width.toString();

  new ResizeSensor(jQuery('#mao-music-sheet-box'), function() {
    var detectScoreWidth = $('#mao-music-sheet-box').width() - 30;
    var newWidthString = ' width=' + detectScoreWidth.toString();

    pianoVexStr = pianoVexStr.replace(oldWidthString, newWidthString);
    guitarVexStr = guitarVexStr.replace(oldWidthString, newWidthString);
    oldWidthString = newWidthString;
    
    render();
  });
});

/*=====  End of main render function  ======*/


function parseBar(t) {
  switch(t) {
    // begin repeat bar
    case '|:':
      pianoNoteStr += '=|: ';
      guitarNoteStr += '=|: ';

      pianoTextStr += '=|:, ';
      guitarTextStr += '=|:, ';
      break;

    // end repeat bar
    case ':|':
      pianoNoteStr += '=:| ';
      guitarNoteStr += '=:| ';

      pianoTextStr += '=:|, ';
      guitarTextStr += '=:|, ';
      break;

    // standard bar
    case '|':
      pianoNoteStr += '| ';
      guitarNoteStr += '| ';

      pianoTextStr += '|, ';
      guitarTextStr += '|, ';
      break;

    // double bar
    case '||':
      pianoNoteStr += '=|| ';
      guitarNoteStr += '=|| ';

      pianoTextStr += '=||, ';
      guitarTextStr += '=||, ';
      break;

    default:
      break;
  }
}

function parseChord(t) {
  switch(t) {
    // C family
    case 'C':
      curPianoChordComposition = GuitarChords['C'];
      curGuitarChordComposition = GuitarChords['C'];

      curChordName = t;
      break;
    case 'Cm':
      curPianoChordComposition = GuitarChords['Cm'];
      curGuitarChordComposition = GuitarChords['Cm'];

      curChordName = t;
      break;
    case 'Cm7':
      curPianoChordComposition = GuitarChords['Cm7'];
      curGuitarChordComposition = GuitarChords['Cm7'];

      curChordName = t;
      break;
    case 'CM7':
    case 'Cmaj7':
      curPianoChordComposition = GuitarChords['Cmaj7'];
      curGuitarChordComposition = GuitarChords['Cmaj7'];

      curChordName = t;
      break;
    case 'C7':
      curPianoChordComposition = GuitarChords['C7'];
      curGuitarChordComposition = GuitarChords['C7'];

      curChordName = t;
      break;

    // #C family
    case '#C':
    case 'C#':
      curPianoChordComposition = GuitarChords['#C'];
      curGuitarChordComposition = GuitarChords['#C'];

      curChordName = t;
      break;
    case '#Cm':
    case 'C#m':
      curPianoChordComposition = GuitarChords['#Cm'];
      curGuitarChordComposition = GuitarChords['#Cm'];

      curChordName = t;
      break;
    case '#Cm7':
    case 'C#m7':
      curPianoChordComposition = GuitarChords['#Cm7'];
      curGuitarChordComposition = GuitarChords['#Cm7'];

      curChordName = t;
      break;
    case '#CM7':
    case 'C#M7':
    case '#Cmaj7':
    case 'C#maj7':
      curPianoChordComposition = GuitarChords['#Cmaj7'];
      curGuitarChordComposition = GuitarChords['#Cmaj7'];

      curChordName = t;
      break;
    case '#C7':
    case 'C#7':
      curPianoChordComposition = GuitarChords['#C7'];
      curGuitarChordComposition = GuitarChords['#C7'];

      curChordName = t;
      break;

    // bD family
    case 'bD':
    case 'Db':
      curPianoChordComposition = GuitarChords['bD'];
      curGuitarChordComposition = GuitarChords['bD'];

      curChordName = t;
      break;
    case 'bDm':
    case 'Dbm':
      curPianoChordComposition = GuitarChords['bDm'];
      curGuitarChordComposition = GuitarChords['bDm'];

      curChordName = t;
      break;
    case 'bDm7':
    case 'Dbm7':
      curPianoChordComposition = GuitarChords['bDm7'];
      curGuitarChordComposition = GuitarChords['bDm7'];

      curChordName = t;
      break;
    case 'bDM7':
    case 'DbM7':
    case 'bDmaj7':
    case 'Dbmaj7':
      curPianoChordComposition = GuitarChords['bDmaj7'];
      curGuitarChordComposition = GuitarChords['bDmaj7'];

      curChordName = t;
      break;
    case 'bD7':
    case 'Db7':
      curPianoChordComposition = GuitarChords['bD7'];
      curGuitarChordComposition = GuitarChords['bD7'];

      curChordName = t;
      break;

    // D family
    case 'D':
      curPianoChordComposition = GuitarChords['D'];
      curGuitarChordComposition = GuitarChords['D'];

      curChordName = t;
      break;
    case 'Dm':
      curPianoChordComposition = GuitarChords['Dm'];
      curGuitarChordComposition = GuitarChords['Dm'];

      curChordName = t;
      break;
    case 'Dm7':
      curPianoChordComposition = GuitarChords['Dm7'];
      curGuitarChordComposition = GuitarChords['Dm7'];

      curChordName = t;
      break;
    case 'DM7':
    case 'Dmaj7':
      curPianoChordComposition = GuitarChords['Dmaj7'];
      curGuitarChordComposition = GuitarChords['Dmaj7'];

      curChordName = t;
      break;
    case 'D7':
      curPianoChordComposition = GuitarChords['D7'];
      curGuitarChordComposition = GuitarChords['D7'];

      curChordName = t;
      break;

    // #D family
    case '#D':
    case 'D#':
      curPianoChordComposition = GuitarChords['#D'];
      curGuitarChordComposition = GuitarChords['#D'];

      curChordName = t;
      break;
    case '#Dm':
    case 'D#m':
      curPianoChordComposition = GuitarChords['#Dm'];
      curGuitarChordComposition = GuitarChords['#Dm'];

      curChordName = t;
      break;
    case '#Dm7':
    case 'D#m7':
      curPianoChordComposition = GuitarChords['#Dm7'];
      curGuitarChordComposition = GuitarChords['#Dm7'];

      curChordName = t;
      break;
    case '#DM7':
    case 'D#M7':
    case '#Dmaj7':
    case 'D#maj7':
      curPianoChordComposition = GuitarChords['#Dmaj7'];
      curGuitarChordComposition = GuitarChords['#Dmaj7'];

      curChordName = t;
      break;
    case '#D7':
    case 'D#7':
      curPianoChordComposition = GuitarChords['#D7'];
      curGuitarChordComposition = GuitarChords['#D7'];

      curChordName = t;
      break;

    // bE family
    case 'bE':
    case 'Eb':
      curPianoChordComposition = GuitarChords['bE'];
      curGuitarChordComposition = GuitarChords['bE'];

      curChordName = t;
      break;
    case 'bEm':
    case 'Ebm':
      curPianoChordComposition = GuitarChords['bEm'];
      curGuitarChordComposition = GuitarChords['bEm'];

      curChordName = t;
      break;
    case 'bEm7':
    case 'Ebm7':
      curPianoChordComposition = GuitarChords['bEm7'];
      curGuitarChordComposition = GuitarChords['bEm7'];

      curChordName = t;
      break;
    case 'bEM7':
    case 'EbM7':
    case 'bEmaj7':
    case 'Ebmaj7':
      curPianoChordComposition = GuitarChords['bEmaj7'];
      curGuitarChordComposition = GuitarChords['bEmaj7'];

      curChordName = t;
      break;
    case 'bE7':
    case 'Eb7':
      curPianoChordComposition = GuitarChords['bE7'];
      curGuitarChordComposition = GuitarChords['bE7'];

      curChordName = t;
      break;

    // E family
    case 'E':
      curPianoChordComposition = GuitarChords['E'];
      curGuitarChordComposition = GuitarChords['E'];

      curChordName = t;
      break;
    case 'Em':
      curPianoChordComposition = GuitarChords['Em'];
      curGuitarChordComposition = GuitarChords['Em'];

      curChordName = t;
      break;
    case 'Em7':
      curPianoChordComposition = GuitarChords['Em7'];
      curGuitarChordComposition = GuitarChords['Em7'];

      curChordName = t;
      break;
    case 'EM7':
    case 'Emaj7':
      curPianoChordComposition = GuitarChords['Emaj7'];
      curGuitarChordComposition = GuitarChords['Emaj7'];

      curChordName = t;
      break;
    case 'E7':
      curPianoChordComposition = GuitarChords['E7'];
      curGuitarChordComposition = GuitarChords['E7'];

      curChordName = t;
      break;

    // F family
    case 'F':
      curPianoChordComposition = GuitarChords['F'];
      curGuitarChordComposition = GuitarChords['F'];

      curChordName = t;
      break;
    case 'Fm':
      curPianoChordComposition = GuitarChords['Fm'];
      curGuitarChordComposition = GuitarChords['Fm'];

      curChordName = t;
      break;
    case 'Fm7':
      curPianoChordComposition = GuitarChords['Fm7'];
      curGuitarChordComposition = GuitarChords['Fm7'];

      curChordName = t;
      break;
    case 'FM7':
    case 'Fmaj7':
      curPianoChordComposition = GuitarChords['Fmaj7'];
      curGuitarChordComposition = GuitarChords['Fmaj7'];

      curChordName = t;
      break;
    case 'F7':
      curPianoChordComposition = GuitarChords['F7'];
      curGuitarChordComposition = GuitarChords['F7'];

      curChordName = t;
      break;

    // #F family
    case '#F':
    case 'F#':
      curPianoChordComposition = GuitarChords['#F'];
      curGuitarChordComposition = GuitarChords['#F'];

      curChordName = t;
      break;
    case '#Fm':
    case 'F#m':
      curPianoChordComposition = GuitarChords['#Fm'];
      curGuitarChordComposition = GuitarChords['#Fm'];

      curChordName = t;
      break;
    case '#Fm7':
    case 'F#m7':
      curPianoChordComposition = GuitarChords['#Fm7'];
      curGuitarChordComposition = GuitarChords['#Fm7'];

      curChordName = t;
      break;
    case '#FM7':
    case 'F#M7':
    case '#Fmaj7':
    case 'F#maj7':
      curPianoChordComposition = GuitarChords['#Fmaj7'];
      curGuitarChordComposition = GuitarChords['#Fmaj7'];

      curChordName = t;
      break;
    case '#F7':
    case 'F#7':
      curPianoChordComposition = GuitarChords['#F7'];
      curGuitarChordComposition = GuitarChords['#F7'];

      curChordName = t;
      break;

    // bG family
    case 'bG':
    case 'Gb':
      curPianoChordComposition = GuitarChords['bG'];
      curGuitarChordComposition = GuitarChords['bG'];

      curChordName = t;
      break;
    case 'bGm':
    case 'Gbm':
      curPianoChordComposition = GuitarChords['bGm'];
      curGuitarChordComposition = GuitarChords['bGm'];

      curChordName = t;
      break;
    case 'bGm7':
    case 'Gbm7':
      curPianoChordComposition = GuitarChords['bGm7'];
      curGuitarChordComposition = GuitarChords['bGm7'];

      curChordName = t;
      break;
    case 'bGM7':
    case 'GbM7':
    case 'bGmaj7':
    case 'Gbmaj7':
      curPianoChordComposition = GuitarChords['bGmaj7'];
      curGuitarChordComposition = GuitarChords['bGmaj7'];

      curChordName = t;
      break;
    case 'bG7':
    case 'Gb7':
      curPianoChordComposition = GuitarChords['bG7'];
      curGuitarChordComposition = GuitarChords['bG7'];

      curChordName = t;
      break;

    // G family
    case 'G':
      curPianoChordComposition = GuitarChords['G'];
      curGuitarChordComposition = GuitarChords['G'];

      curChordName = t;
      break;
    case 'Gm':
      curPianoChordComposition = GuitarChords['Gm'];
      curGuitarChordComposition = GuitarChords['Gm'];

      curChordName = t;
      break;
    case 'Gm7':
      curPianoChordComposition = GuitarChords['Gm7'];
      curGuitarChordComposition = GuitarChords['Gm7'];

      curChordName = t;
      break;
    case 'GM7':
    case 'Gmaj7':
      curPianoChordComposition = GuitarChords['Gmaj7'];
      curGuitarChordComposition = GuitarChords['Gmaj7'];

      curChordName = t;
      break;
    case 'G7':
      curPianoChordComposition = GuitarChords['G7'];
      curGuitarChordComposition = GuitarChords['G7'];

      curChordName = t;
      break;

    // #G family
    case '#G':
    case 'G#': 
      curPianoChordComposition = GuitarChords['#G'];
      curGuitarChordComposition = GuitarChords['#G'];

      curChordName = t;
      break;
    case '#Gm':
    case 'G#m': 
      curPianoChordComposition = GuitarChords['#Gm'];
      curGuitarChordComposition = GuitarChords['#Gm'];

      curChordName = t;
      break;
    case '#Gm7':
    case 'G#m7': 
      curPianoChordComposition = GuitarChords['#Gm7'];
      curGuitarChordComposition = GuitarChords['#Gm7'];

      curChordName = t;
      break;
    case '#GM7':
    case 'G#M7': 
    case '#Gmaj7':
    case 'G#maj7': 
      curPianoChordComposition = GuitarChords['#Gmaj7'];
      curGuitarChordComposition = GuitarChords['#Gmaj7'];

      curChordName = t;
      break;
    case '#G7':
    case 'G#7': 
      curPianoChordComposition = GuitarChords['#G7'];
      curGuitarChordComposition = GuitarChords['#G7'];

      curChordName = t;
      break;

    // bA family
    case 'bA':
    case 'Ab':
      curPianoChordComposition = GuitarChords['bA'];
      curGuitarChordComposition = GuitarChords['bA'];

      curChordName = t;
      break;
    case 'bAm':
    case 'Abm':
      curPianoChordComposition = GuitarChords['bAm'];
      curGuitarChordComposition = GuitarChords['bAm'];

      curChordName = t;
      break;
    case 'bAm7':
    case 'Abm7':
      curPianoChordComposition = GuitarChords['bAm7'];
      curGuitarChordComposition = GuitarChords['bAm7'];

      curChordName = t;
      break;
    case 'bAM7':
    case 'AbM7':
    case 'bAmaj7':
    case 'Abmaj7':
      curPianoChordComposition = GuitarChords['bAmaj7'];
      curGuitarChordComposition = GuitarChords['bAmaj7'];

      curChordName = t;
      break;
    case 'bA7':
    case 'Ab7':
      curPianoChordComposition = GuitarChords['bA7'];
      curGuitarChordComposition = GuitarChords['bA7'];

      curChordName = t;
      break;

    // A family
    case 'A':
      curPianoChordComposition = GuitarChords['A'];
      curGuitarChordComposition = GuitarChords['A'];

      curChordName = t;
      break;
    case 'Am':
      curPianoChordComposition = GuitarChords['Am'];
      curGuitarChordComposition = GuitarChords['Am'];

      curChordName = t;
      break;
    case 'Am7':
      curPianoChordComposition = GuitarChords['Am7'];
      curGuitarChordComposition = GuitarChords['Am7'];

      curChordName = t;
      break;
    case 'AM7':
    case 'Amaj7':
      curPianoChordComposition = GuitarChords['Amaj7'];
      curGuitarChordComposition = GuitarChords['Amaj7'];

      curChordName = t;
      break;
    case 'A7':
      curPianoChordComposition = GuitarChords['A7'];
      curGuitarChordComposition = GuitarChords['A7'];

      curChordName = t;
      break;

    // #A family
    case '#A':
    case 'A#':
      curPianoChordComposition = GuitarChords['#A'];
      curGuitarChordComposition = GuitarChords['#A'];

      curChordName = t;
      break;
    case '#Am':
    case 'A#m':
      curPianoChordComposition = GuitarChords['#Am'];
      curGuitarChordComposition = GuitarChords['#Am'];

      curChordName = t;
      break;
    case '#Am7':
    case 'A#m7':
      curPianoChordComposition = GuitarChords['#Am7'];
      curGuitarChordComposition = GuitarChords['#Am7'];

      curChordName = t;
      break;
    case '#AM7':
    case 'A#M7':
    case '#Amaj7':
    case 'A#maj7':
      curPianoChordComposition = GuitarChords['#Amaj7'];
      curGuitarChordComposition = GuitarChords['#Amaj7'];

      curChordName = t;
      break;
    case '#A7':
    case 'A#7':
      curPianoChordComposition = GuitarChords['#A7'];
      curGuitarChordComposition = GuitarChords['#A7'];

      curChordName = t;
      break;

    // bB family
    case 'bB':
    case 'Bb':
      curPianoChordComposition = GuitarChords['bB'];
      curGuitarChordComposition = GuitarChords['bB'];

      curChordName = t;
      break;
    case 'bBm':
    case 'Bbm':
      curPianoChordComposition = GuitarChords['bBm'];
      curGuitarChordComposition = GuitarChords['bBm'];

      curChordName = t;
      break;
    case 'bBm7':
    case 'Bbm7':
      curPianoChordComposition = GuitarChords['bBm7'];
      curGuitarChordComposition = GuitarChords['bBm7'];

      curChordName = t;
      break;
    case 'bBM7':
    case 'BbM7':
    case 'bBmaj7':
    case 'Bbmaj7':
      curPianoChordComposition = GuitarChords['bBmaj7'];
      curGuitarChordComposition = GuitarChords['bBmaj7'];

      curChordName = t;
      break;
    case 'bB7':
    case 'Bb7':
      curPianoChordComposition = GuitarChords['bB7'];
      curGuitarChordComposition = GuitarChords['bB7'];

      curChordName = t;
      break;

    // B family
    case 'B':
      curPianoChordComposition = GuitarChords['B'];
      curGuitarChordComposition = GuitarChords['B'];

      curChordName = t;
      break;
    case 'Bm':
      curPianoChordComposition = GuitarChords['Bm'];
      curGuitarChordComposition = GuitarChords['Bm'];

      curChordName = t;
      break;
    case 'Bm7':
      curPianoChordComposition = GuitarChords['Bm7'];
      curGuitarChordComposition = GuitarChords['Bm7'];

      curChordName = t;
      break;
    case 'BM7':
    case 'Bmaj7':
      curPianoChordComposition = GuitarChords['Bmaj7'];
      curGuitarChordComposition = GuitarChords['Bmaj7'];

      curChordName = t;
      break;
    case 'B7':
      curPianoChordComposition = GuitarChords['B7'];
      curGuitarChordComposition = GuitarChords['B7'];

      curChordName = t;
      break;

    // other chords
    default:
      return;
  }
}

function parseDuration(t) {
  switch(t) {
    case 'w':
      pianoNoteStr += ':w';
      guitarNoteStr += ':w';

      pianoTextStr += ':w, ';
      guitarTextStr += ':w, ';
      break;
    case 'h':
      pianoNoteStr += ':h';
      guitarNoteStr += ':h';

      pianoTextStr += ':h, ';
      guitarTextStr += ':h, ';
      break;
    case 'q':
      pianoNoteStr += ':q';
      guitarNoteStr += ':q';

      pianoTextStr += ':q, ';
      guitarTextStr += ':q, ';
      break;
    case 'i':
      pianoNoteStr += ':8';
      guitarNoteStr += ':8';

      pianoTextStr += ':8, ';
      guitarTextStr += ':8, ';
      break;
    case 's':
      pianoNoteStr += ':16';
      guitarNoteStr += ':16';

      pianoTextStr += ':16, ';
      guitarTextStr += ':16, ';
      break;
    case 't':
      pianoNoteStr += ':32';
      guitarNoteStr += ':32';

      pianoTextStr += ':32, ';
      guitarTextStr += ':32, ';
      break;
  }

  pianoNoteStr += curPianoChordComposition + ' ';
  guitarNoteStr += curGuitarChordComposition + ' ';

  processTextStr();

  curPianoChordComposition = '';
  curGuitarChordComposition = '';
  curChordName = '';
}

/**
 * handle '#' and 'b' sign problems, 
 * and concatenate the formal chord name to the VexTextString
 */
 
function processTextStr() {
  if(curChordName.indexOf('#') > -1) {
    var splitChordName = curChordName.split('#');
    var chordNameNoSharp = '';

    for(var i = 0; i < splitChordName.length; i++) {
      chordNameNoSharp += splitChordName[i];
    }

    pianoTextStr += chordNameNoSharp.substring(0, 1) + '#' + chordNameNoSharp.substring(1, chordNameNoSharp.length) + ', ';
    guitarTextStr += chordNameNoSharp.substring(0, 1) + '#' + chordNameNoSharp.substring(1, chordNameNoSharp.length) + ', ';
  }
  else if(curChordName.indexOf('b') > -1) {
    var splitChordName = curChordName.split('b');
    var chordNameNoFlat = '';

    for(var i = 0; i < splitChordName.length; i++) {
      chordNameNoFlat += splitChordName[i];
    }

    pianoTextStr += chordNameNoFlat.substring(0, 1) + 'b' + chordNameNoFlat.substring(1, chordNameNoFlat.length) + ', ';
    guitarTextStr += chordNameNoFlat.substring(0, 1) + 'b' + chordNameNoFlat.substring(1, chordNameNoFlat.length) + ', ';
  }
  else {
    pianoTextStr += curChordName + ', ';
    guitarTextStr += curChordName + ', ';
  }
}