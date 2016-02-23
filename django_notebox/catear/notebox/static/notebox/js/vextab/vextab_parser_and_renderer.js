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


// current parsing chord for piano
var curPianoChord = {'name':'', 'composition':''};
// current parsing chord for guitar
var curGuitarChord = {'name':'', 'composition':''};
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
      curPianoChord['composition'] = GuitarChords['C'];
      curGuitarChord['composition'] = GuitarChords['C'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Cm':
      curPianoChord['composition'] = GuitarChords['Cm'];
      curGuitarChord['composition'] = GuitarChords['Cm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Cm7':
      curPianoChord['composition'] = GuitarChords['Cm7'];
      curGuitarChord['composition'] = GuitarChords['Cm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'CM7':
    case 'Cmaj7':
      curPianoChord['composition'] = GuitarChords['Cmaj7'];
      curGuitarChord['composition'] = GuitarChords['Cmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'C7':
      curPianoChord['composition'] = GuitarChords['C7'];
      curGuitarChord['composition'] = GuitarChords['C7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // #C family
    case '#C':
      curPianoChord['composition'] = GuitarChords['#C'];
      curGuitarChord['composition'] = GuitarChords['#C'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Cm':
      curPianoChord['composition'] = GuitarChords['#Cm'];
      curGuitarChord['composition'] = GuitarChords['#Cm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Cm7':
      curPianoChord['composition'] = GuitarChords['#Cm7'];
      curGuitarChord['composition'] = GuitarChords['#Cm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#CM7':
    case '#Cmaj7':
      curPianoChord['composition'] = GuitarChords['#Cmaj7'];
      curGuitarChord['composition'] = GuitarChords['#Cmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#C7':
      curPianoChord['composition'] = GuitarChords['#C7'];
      curGuitarChord['composition'] = GuitarChords['#C7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // bD family
    case 'bD':
      curPianoChord['composition'] = GuitarChords['bD'];
      curGuitarChord['composition'] = GuitarChords['bD'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bDm':
      curPianoChord['composition'] = GuitarChords['bDm'];
      curGuitarChord['composition'] = GuitarChords['bDm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bDm7':
      curPianoChord['composition'] = GuitarChords['bDm7'];
      curGuitarChord['composition'] = GuitarChords['bDm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bDM7':
    case 'bDmaj7':
      curPianoChord['composition'] = GuitarChords['bDmaj7'];
      curGuitarChord['composition'] = GuitarChords['bDmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bD7':
      curPianoChord['composition'] = GuitarChords['bD7'];
      curGuitarChord['composition'] = GuitarChords['bD7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // D family
    case 'D':
      curPianoChord['composition'] = GuitarChords['D'];
      curGuitarChord['composition'] = GuitarChords['D'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Dm':
      curPianoChord['composition'] = GuitarChords['Dm'];
      curGuitarChord['composition'] = GuitarChords['Dm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Dm7':
      curPianoChord['composition'] = GuitarChords['Dm7'];
      curGuitarChord['composition'] = GuitarChords['Dm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'DM7':
    case 'Dmaj7':
      curPianoChord['composition'] = GuitarChords['Dmaj7'];
      curGuitarChord['composition'] = GuitarChords['Dmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'D7':
      curPianoChord['composition'] = GuitarChords['D7'];
      curGuitarChord['composition'] = GuitarChords['D7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // #D family
    case '#D':
      curPianoChord['composition'] = GuitarChords['#D'];
      curGuitarChord['composition'] = GuitarChords['#D'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Dm':
      curPianoChord['composition'] = GuitarChords['#Dm'];
      curGuitarChord['composition'] = GuitarChords['#Dm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Dm7':
      curPianoChord['composition'] = GuitarChords['#Dm7'];
      curGuitarChord['composition'] = GuitarChords['#Dm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#DM7':
    case '#Dmaj7':
      curPianoChord['composition'] = GuitarChords['#Dmaj7'];
      curGuitarChord['composition'] = GuitarChords['#Dmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#D7':
      curPianoChord['composition'] = GuitarChords['#D7'];
      curGuitarChord['composition'] = GuitarChords['#D7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // bE family
    case 'bE':
      curPianoChord['composition'] = GuitarChords['bE'];
      curGuitarChord['composition'] = GuitarChords['bE'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bEm':
      curPianoChord['composition'] = GuitarChords['bEm'];
      curGuitarChord['composition'] = GuitarChords['bEm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bEm7':
      curPianoChord['composition'] = GuitarChords['bEm7'];
      curGuitarChord['composition'] = GuitarChords['bEm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bEM7':
    case 'bEmaj7':
      curPianoChord['composition'] = GuitarChords['bEmaj7'];
      curGuitarChord['composition'] = GuitarChords['bEmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bE7':
      curPianoChord['composition'] = GuitarChords['bE7'];
      curGuitarChord['composition'] = GuitarChords['bE7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // E family
    case 'E':
      curPianoChord['composition'] = GuitarChords['E'];
      curGuitarChord['composition'] = GuitarChords['E'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Em':
      curPianoChord['composition'] = GuitarChords['Em'];
      curGuitarChord['composition'] = GuitarChords['Em'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Em7':
      curPianoChord['composition'] = GuitarChords['Em7'];
      curGuitarChord['composition'] = GuitarChords['Em7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'EM7':
    case 'Emaj7':
      curPianoChord['composition'] = GuitarChords['Emaj7'];
      curGuitarChord['composition'] = GuitarChords['Emaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'E7':
      curPianoChord['composition'] = GuitarChords['E7'];
      curGuitarChord['composition'] = GuitarChords['E7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // F family
    case 'F':
      curPianoChord['composition'] = GuitarChords['F'];
      curGuitarChord['composition'] = GuitarChords['F'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Fm':
      curPianoChord['composition'] = GuitarChords['Fm'];
      curGuitarChord['composition'] = GuitarChords['Fm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Fm7':
      curPianoChord['composition'] = GuitarChords['Fm7'];
      curGuitarChord['composition'] = GuitarChords['Fm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'FM7':
    case 'Fmaj7':
      curPianoChord['composition'] = GuitarChords['Fmaj7'];
      curGuitarChord['composition'] = GuitarChords['Fmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'F7':
      curPianoChord['composition'] = GuitarChords['F7'];
      curGuitarChord['composition'] = GuitarChords['F7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // #F family
    case '#F':
      curPianoChord['composition'] = GuitarChords['#F'];
      curGuitarChord['composition'] = GuitarChords['#F'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Fm':
      curPianoChord['composition'] = GuitarChords['#Fm'];
      curGuitarChord['composition'] = GuitarChords['#Fm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Fm7':
      curPianoChord['composition'] = GuitarChords['#Fm7'];
      curGuitarChord['composition'] = GuitarChords['#Fm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#FM7':
    case '#Fmaj7':
      curPianoChord['composition'] = GuitarChords['#Fmaj7'];
      curGuitarChord['composition'] = GuitarChords['#Fmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#F7':
      curPianoChord['composition'] = GuitarChords['#F7'];
      curGuitarChord['composition'] = GuitarChords['#F7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // bG family
    case 'bG':
      curPianoChord['composition'] = GuitarChords['bG'];
      curGuitarChord['composition'] = GuitarChords['bG'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bGm':
      curPianoChord['composition'] = GuitarChords['bGm'];
      curGuitarChord['composition'] = GuitarChords['bGm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bGm7':
      curPianoChord['composition'] = GuitarChords['bGm7'];
      curGuitarChord['composition'] = GuitarChords['bGm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bGM7':
    case 'bGmaj7':
      curPianoChord['composition'] = GuitarChords['bGmaj7'];
      curGuitarChord['composition'] = GuitarChords['bGmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bG7':
      curPianoChord['composition'] = GuitarChords['bG7'];
      curGuitarChord['composition'] = GuitarChords['bG7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // G family
    case 'G':
      curPianoChord['composition'] = GuitarChords['G'];
      curGuitarChord['composition'] = GuitarChords['G'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Gm':
      curPianoChord['composition'] = GuitarChords['Gm'];
      curGuitarChord['composition'] = GuitarChords['Gm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Gm7':
      curPianoChord['composition'] = GuitarChords['Gm7'];
      curGuitarChord['composition'] = GuitarChords['Gm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'GM7':
    case 'Gmaj7':
      curPianoChord['composition'] = GuitarChords['Gmaj7'];
      curGuitarChord['composition'] = GuitarChords['Gmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'G7':
      curPianoChord['composition'] = GuitarChords['G7'];
      curGuitarChord['composition'] = GuitarChords['G7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // #G family
    case '#G':
      curPianoChord['composition'] = GuitarChords['#G'];
      curGuitarChord['composition'] = GuitarChords['#G'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Gm':
      curPianoChord['composition'] = GuitarChords['#Gm'];
      curGuitarChord['composition'] = GuitarChords['#Gm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Gm7':
      curPianoChord['composition'] = GuitarChords['#Gm7'];
      curGuitarChord['composition'] = GuitarChords['#Gm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#GM7':
    case '#Gmaj7':
      curPianoChord['composition'] = GuitarChords['#Gmaj7'];
      curGuitarChord['composition'] = GuitarChords['#Gmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#G7':
      curPianoChord['composition'] = GuitarChords['#G7'];
      curGuitarChord['composition'] = GuitarChords['#G7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // bA family
    case 'bA':
      curPianoChord['composition'] = GuitarChords['bA'];
      curGuitarChord['composition'] = GuitarChords['bA'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bAm':
      curPianoChord['composition'] = GuitarChords['bAm'];
      curGuitarChord['composition'] = GuitarChords['bAm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bAm7':
      curPianoChord['composition'] = GuitarChords['bAm7'];
      curGuitarChord['composition'] = GuitarChords['bAm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bAM7':
    case 'bAmaj7':
      curPianoChord['composition'] = GuitarChords['bAmaj7'];
      curGuitarChord['composition'] = GuitarChords['bAmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bA7':
      curPianoChord['composition'] = GuitarChords['bA7'];
      curGuitarChord['composition'] = GuitarChords['bA7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // A family
    case 'A':
      curPianoChord['composition'] = GuitarChords['A'];
      curGuitarChord['composition'] = GuitarChords['A'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Am':
      curPianoChord['composition'] = GuitarChords['Am'];
      curGuitarChord['composition'] = GuitarChords['Am'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Am7':
      curPianoChord['composition'] = GuitarChords['Am7'];
      curGuitarChord['composition'] = GuitarChords['Am7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'AM7':
    case 'Amaj7':
      curPianoChord['composition'] = GuitarChords['Amaj7'];
      curGuitarChord['composition'] = GuitarChords['Amaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'A7':
      curPianoChord['composition'] = GuitarChords['A7'];
      curGuitarChord['composition'] = GuitarChords['A7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // #A family
    case '#A':
      curPianoChord['composition'] = GuitarChords['#A'];
      curGuitarChord['composition'] = GuitarChords['#A'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Am':
      curPianoChord['composition'] = GuitarChords['#Am'];
      curGuitarChord['composition'] = GuitarChords['#Am'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#Am7':
      curPianoChord['composition'] = GuitarChords['#Am7'];
      curGuitarChord['composition'] = GuitarChords['#Am7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#AM7':
    case '#Amaj7':
      curPianoChord['composition'] = GuitarChords['#Amaj7'];
      curGuitarChord['composition'] = GuitarChords['#Amaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case '#A7':
      curPianoChord['composition'] = GuitarChords['#A7'];
      curGuitarChord['composition'] = GuitarChords['#A7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // bB family
    case 'bB':
      curPianoChord['composition'] = GuitarChords['bB'];
      curGuitarChord['composition'] = GuitarChords['bB'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bBm':
      curPianoChord['composition'] = GuitarChords['bBm'];
      curGuitarChord['composition'] = GuitarChords['bBm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bBm7':
      curPianoChord['composition'] = GuitarChords['bBm7'];
      curGuitarChord['composition'] = GuitarChords['bBm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bBM7':
    case 'bBmaj7':
      curPianoChord['composition'] = GuitarChords['bBmaj7'];
      curGuitarChord['composition'] = GuitarChords['bBmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'bB7':
      curPianoChord['composition'] = GuitarChords['bB7'];
      curGuitarChord['composition'] = GuitarChords['bB7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;

    // B family
    case 'B':
      curPianoChord['composition'] = GuitarChords['B'];
      curGuitarChord['composition'] = GuitarChords['B'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Bm':
      curPianoChord['composition'] = GuitarChords['Bm'];
      curGuitarChord['composition'] = GuitarChords['Bm'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'Bm7':
      curPianoChord['composition'] = GuitarChords['Bm7'];
      curGuitarChord['composition'] = GuitarChords['Bm7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'BM7':
    case 'Bmaj7':
      curPianoChord['composition'] = GuitarChords['Bmaj7'];
      curGuitarChord['composition'] = GuitarChords['Bmaj7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
      break;
    case 'B7':
      curPianoChord['composition'] = GuitarChords['B7'];
      curGuitarChord['composition'] = GuitarChords['B7'];

      curPianoChord['name'] = t;
      curGuitarChord['name'] = t;
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

  pianoNoteStr += curPianoChord['composition'] + ' ';
  guitarNoteStr += curGuitarChord['composition'] + ' ';

  pianoTextStr += curPianoChord['name'] + ', ';
  guitarTextStr += curGuitarChord['name'] + ', ';

  curPianoChord['composition'] = '';
  curGuitarChord['composition'] = '';
  curPianoChord['name'] = '';
  curGuitarChord['name'] = '';
}