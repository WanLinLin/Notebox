var pianoScore = $('#piano_score');
var guitarScore = $('#guitar_score');

// Key signature of the score
var key = 'C';

// Tempo of the score
var tempo = 'tempo=120';

// Tempo of the score
var time = '4/4';

// Guitar tuning of the score (standard|dropd|eb|E/5,B/4,G/4,D/4,A/3,E/3)
var tuning = 'standard'

// a cool string derive from Jfugue MusicString
// var musicString = '|: Dh Dh | Dh Dh :|';

// tokens in musicString
var token = musicString.split(" ");

// piano vextab string, starts with "notes"
var pianoVexStr = 'notes ';

// guitar vextab string, starts with "notes"
var guitarVexStr = 'notes ';

// current parsing chord for piano
var curPianoChord = '';

// current parsing chord for guitar
var curGuitarChord = '';

function parseBar(t) {
  switch(t) {
    // begin repeat bar
    case '|:':
      pianoVexStr += '=|: ';
      guitarVexStr += '=|: ';
      break;

    // end repeat bar
    case ':|':
      pianoVexStr += '=:| ';
      guitarVexStr += '=:| ';
      break;

    // standard bar
    case '|':
      pianoVexStr += '| ';
      guitarVexStr += '| ';
      break;

    // double bar
    case '||':
      pianoVexStr += '=|| ';
      guitarVexStr += '=|| ';

    default:
      break;
  }
}

function parseChord(t) {
  switch(t) {
    // C family
    case 'C':
      curPianoChord = GuitarChords['C'];
      curGuitarChord = GuitarChords['C'];
      break;
    case 'Cm':
      curPianoChord = GuitarChords['Cm'];
      curGuitarChord = GuitarChords['Cm'];
      break;
    case 'Cm7':
      curPianoChord = GuitarChords['Cm7'];
      curGuitarChord = GuitarChords['Cm7'];
      break;
    case 'Cmaj7':
      curPianoChord = GuitarChords['Cmaj7'];
      curGuitarChord = GuitarChords['Cmaj7'];
      break;
    case 'C7':
      curPianoChord = GuitarChords['C7'];
      curGuitarChord = GuitarChords['C7'];
      break;

    // #C family
    case '#C':
      curPianoChord = GuitarChords['#C'];
      curGuitarChord = GuitarChords['#C'];
      break;
    case '#Cm':
      curPianoChord = GuitarChords['#Cm'];
      curGuitarChord = GuitarChords['#Cm'];
      break;
    case '#Cm7':
      curPianoChord = GuitarChords['#Cm7'];
      curGuitarChord = GuitarChords['#Cm7'];
      break;
    case '#Cmaj7':
      curPianoChord = GuitarChords['#Cmaj7'];
      curGuitarChord = GuitarChords['#Cmaj7'];
      break;
    case '#C7':
      curPianoChord = GuitarChords['#C7'];
      curGuitarChord = GuitarChords['#C7'];
      break;

    // bD family
    case 'bD':
      curPianoChord = GuitarChords['bD'];
      curGuitarChord = GuitarChords['bD'];
      break;
    case 'bDm':
      curPianoChord = GuitarChords['bDm'];
      curGuitarChord = GuitarChords['bDm'];
      break;
    case 'bDm7':
      curPianoChord = GuitarChords['bDm7'];
      curGuitarChord = GuitarChords['bDm7'];
      break;
    case 'bDmaj7':
      curPianoChord = GuitarChords['bDmaj7'];
      curGuitarChord = GuitarChords['bDmaj7'];
      break;
    case 'bD7':
      curPianoChord = GuitarChords['bD7'];
      curGuitarChord = GuitarChords['bD7'];
      break;

    // D family
    case 'D':
      curPianoChord = GuitarChords['D'];
      curGuitarChord = GuitarChords['D'];
      break;
    case 'Dm':
      curPianoChord = GuitarChords['Dm'];
      curGuitarChord = GuitarChords['Dm'];
      break;
    case 'Dm7':
      curPianoChord = GuitarChords['Dm7'];
      curGuitarChord = GuitarChords['Dm7'];
      break;
    case 'Dmaj7':
      curPianoChord = GuitarChords['Dmaj7'];
      curGuitarChord = GuitarChords['Dmaj7'];
      break;
    case 'D7':
      curPianoChord = GuitarChords['D7'];
      curGuitarChord = GuitarChords['D7'];
      break;

    // #D family
    case '#D':
      curPianoChord = GuitarChords['#D'];
      curGuitarChord = GuitarChords['#D'];
      break;
    case '#Dm':
      curPianoChord = GuitarChords['#Dm'];
      curGuitarChord = GuitarChords['#Dm'];
      break;
    case '#Dm7':
      curPianoChord = GuitarChords['#Dm7'];
      curGuitarChord = GuitarChords['#Dm7'];
      break;
    case '#Dmaj7':
      curPianoChord = GuitarChords['#Dmaj7'];
      curGuitarChord = GuitarChords['#Dmaj7'];
      break;
    case '#D7':
      curPianoChord = GuitarChords['#D7'];
      curGuitarChord = GuitarChords['#D7'];
      break;

    // bE family
    case 'bE':
      curPianoChord = GuitarChords['bE'];
      curGuitarChord = GuitarChords['bE'];
      break;
    case 'bEm':
      curPianoChord = GuitarChords['bEm'];
      curGuitarChord = GuitarChords['bEm'];
      break;
    case 'bEm7':
      curPianoChord = GuitarChords['bEm7'];
      curGuitarChord = GuitarChords['bEm7'];
      break;
    case 'bEmaj7':
      curPianoChord = GuitarChords['bEmaj7'];
      curGuitarChord = GuitarChords['bEmaj7'];
      break;
    case 'bE7':
      curPianoChord = GuitarChords['bE7'];
      curGuitarChord = GuitarChords['bE7'];
      break;

    // E family
    case 'E':
      curPianoChord = GuitarChords['E'];
      curGuitarChord = GuitarChords['E'];
      break;
    case 'Em':
      curPianoChord = GuitarChords['Em'];
      curGuitarChord = GuitarChords['Em'];
      break;
    case 'Em7':
      curPianoChord = GuitarChords['Em7'];
      curGuitarChord = GuitarChords['Em7'];
      break;
    case 'Emaj7':
      curPianoChord = GuitarChords['Emaj7'];
      curGuitarChord = GuitarChords['Emaj7'];
      break;
    case 'E7':
      curPianoChord = GuitarChords['E7'];
      curGuitarChord = GuitarChords['E7'];
      break;

    // F family
    case 'F':
      curPianoChord = GuitarChords['F'];
      curGuitarChord = GuitarChords['F'];
      break;
    case 'Fm':
      curPianoChord = GuitarChords['Fm'];
      curGuitarChord = GuitarChords['Fm'];
      break;
    case 'Fm7':
      curPianoChord = GuitarChords['Fm7'];
      curGuitarChord = GuitarChords['Fm7'];
      break;
    case 'Fmaj7':
      curPianoChord = GuitarChords['Fmaj7'];
      curGuitarChord = GuitarChords['Fmaj7'];
      break;
    case 'F7':
      curPianoChord = GuitarChords['F7'];
      curGuitarChord = GuitarChords['F7'];
      break;

    // #F family
    case '#F':
      curPianoChord = GuitarChords['#F'];
      curGuitarChord = GuitarChords['#F'];
      break;
    case '#Fm':
      curPianoChord = GuitarChords['#Fm'];
      curGuitarChord = GuitarChords['#Fm'];
      break;
    case '#Fm7':
      curPianoChord = GuitarChords['#Fm7'];
      curGuitarChord = GuitarChords['#Fm7'];
      break;
    case '#Fmaj7':
      curPianoChord = GuitarChords['#Fmaj7'];
      curGuitarChord = GuitarChords['#Fmaj7'];
      break;
    case '#F7':
      curPianoChord = GuitarChords['#F7'];
      curGuitarChord = GuitarChords['#F7'];
      break;

    // bG family
    case 'bG':
      curPianoChord = GuitarChords['bG'];
      curGuitarChord = GuitarChords['bG'];
      break;
    case 'bGm':
      curPianoChord = GuitarChords['bGm'];
      curGuitarChord = GuitarChords['bGm'];
      break;
    case 'bGm7':
      curPianoChord = GuitarChords['bGm7'];
      curGuitarChord = GuitarChords['bGm7'];
      break;
    case 'bGmaj7':
      curPianoChord = GuitarChords['bGmaj7'];
      curGuitarChord = GuitarChords['bGmaj7'];
      break;
    case 'bG7':
      curPianoChord = GuitarChords['bG7'];
      curGuitarChord = GuitarChords['bG7'];
      break;

    // G family
    case 'G':
      curPianoChord = GuitarChords['G'];
      curGuitarChord = GuitarChords['G'];
      break;
    case 'Gm':
      curPianoChord = GuitarChords['Gm'];
      curGuitarChord = GuitarChords['Gm'];
      break;
    case 'Gm7':
      curPianoChord = GuitarChords['Gm7'];
      curGuitarChord = GuitarChords['Gm7'];
      break;
    case 'Gmaj7':
      curPianoChord = GuitarChords['Gmaj7'];
      curGuitarChord = GuitarChords['Gmaj7'];
      break;
    case 'G7':
      curPianoChord = GuitarChords['G7'];
      curGuitarChord = GuitarChords['G7'];
      break;

    // #G family
    case '#G':
      curPianoChord = GuitarChords['#G'];
      curGuitarChord = GuitarChords['#G'];
      break;
    case '#Gm':
      curPianoChord = GuitarChords['#Gm'];
      curGuitarChord = GuitarChords['#Gm'];
      break;
    case '#Gm7':
      curPianoChord = GuitarChords['#Gm7'];
      curGuitarChord = GuitarChords['#Gm7'];
      break;
    case '#Gmaj7':
      curPianoChord = GuitarChords['#Gmaj7'];
      curGuitarChord = GuitarChords['#Gmaj7'];
      break;
    case '#G7':
      curPianoChord = GuitarChords['#G7'];
      curGuitarChord = GuitarChords['#G7'];
      break;

    // bA family
    case 'bA':
      curPianoChord = GuitarChords['bA'];
      curGuitarChord = GuitarChords['bA'];
      break;
    case 'bAm':
      curPianoChord = GuitarChords['bAm'];
      curGuitarChord = GuitarChords['bAm'];
      break;
    case 'bAm7':
      curPianoChord = GuitarChords['bAm7'];
      curGuitarChord = GuitarChords['bAm7'];
      break;
    case 'bAmaj7':
      curPianoChord = GuitarChords['bAmaj7'];
      curGuitarChord = GuitarChords['bAmaj7'];
      break;
    case 'bA7':
      curPianoChord = GuitarChords['bA7'];
      curGuitarChord = GuitarChords['bA7'];
      break;

    // A family
    case 'A':
      curPianoChord = GuitarChords['A'];
      curGuitarChord = GuitarChords['A'];
      break;
    case 'Am':
      curPianoChord = GuitarChords['Am'];
      curGuitarChord = GuitarChords['Am'];
      break;
    case 'Am7':
      curPianoChord = GuitarChords['Am7'];
      curGuitarChord = GuitarChords['Am7'];
      break;
    case 'Amaj7':
      curPianoChord = GuitarChords['Amaj7'];
      curGuitarChord = GuitarChords['Amaj7'];
      break;
    case 'A7':
      curPianoChord = GuitarChords['A7'];
      curGuitarChord = GuitarChords['A7'];
      break;

    // #A family
    case '#A':
      curPianoChord = GuitarChords['#A'];
      curGuitarChord = GuitarChords['#A'];
      break;
    case '#Am':
      curPianoChord = GuitarChords['#Am'];
      curGuitarChord = GuitarChords['#Am'];
      break;
    case '#Am7':
      curPianoChord = GuitarChords['#Am7'];
      curGuitarChord = GuitarChords['#Am7'];
      break;
    case '#Amaj7':
      curPianoChord = GuitarChords['#Amaj7'];
      curGuitarChord = GuitarChords['#Amaj7'];
      break;
    case '#A7':
      curPianoChord = GuitarChords['#A7'];
      curGuitarChord = GuitarChords['#A7'];
      break;

    // bB family
    case 'bB':
      curPianoChord = GuitarChords['bB'];
      curGuitarChord = GuitarChords['bB'];
      break;
    case 'bBm':
      curPianoChord = GuitarChords['bBm'];
      curGuitarChord = GuitarChords['bBm'];
      break;
    case 'bBm7':
      curPianoChord = GuitarChords['bBm7'];
      curGuitarChord = GuitarChords['bBm7'];
      break;
    case 'bBmaj7':
      curPianoChord = GuitarChords['bBmaj7'];
      curGuitarChord = GuitarChords['bBmaj7'];
      break;
    case 'bB7':
      curPianoChord = GuitarChords['bB7'];
      curGuitarChord = GuitarChords['bB7'];
      break;

    // B family
    case 'B':
      curPianoChord = GuitarChords['B'];
      curGuitarChord = GuitarChords['B'];
      break;
    case 'Bm':
      curPianoChord = GuitarChords['Bm'];
      curGuitarChord = GuitarChords['Bm'];
      break;
    case 'Bm7':
      curPianoChord = GuitarChords['Bm7'];
      curGuitarChord = GuitarChords['Bm7'];
      break;
    case 'Bmaj7':
      curPianoChord = GuitarChords['Bmaj7'];
      curGuitarChord = GuitarChords['Bmaj7'];
      break;
    case 'B7':
      curPianoChord = GuitarChords['B7'];
      curGuitarChord = GuitarChords['B7'];
      break;

    default:
      break;
  }
}

function parseDuration(t) {
  switch(t) {
    case 'w':
      pianoVexStr += ':w ';
      guitarVexStr += ':w ';
      break;
    case 'h':
      pianoVexStr += ':h ';
      guitarVexStr += ':h ';
      break;
    case 'q':
      pianoVexStr += ':q ';
      guitarVexStr += ':q ';
      break;
    case '8':
      pianoVexStr += ':8 ';
      guitarVexStr += ':8 ';
      break;
    case '16':
      pianoVexStr += ':16 ';
      guitarVexStr += ':16 ';
      break;
    case '32':
      pianoVexStr += ':32 ';
      guitarVexStr += ':32 ';
      break;
  }

  pianoVexStr += curPianoChord;
  guitarVexStr += curGuitarChord;
  curPianoChord = '';
  curGuitarChord = '';
}

// main parse function
for(var i = 0; i < token.length; i++) {
  var t = token[i];

  // parse bar
  if(t.indexOf('|') > -1) {
    parseBar(t);
  }

  // parse chord
  if(t.indexOf('C') > -1 ||
    t.indexOf('D') > -1 ||
    t.indexOf('E') > -1 ||
    t.indexOf('F') > -1 ||
    t.indexOf('G') > -1 ||
    t.indexOf('A') > -1 ||
    t.indexOf('B') > -1)
  {
    parseChord(t.substring(0, t.length - 1));
    t = t.substring(t.length - 1, t.length);
  }

  // parse duration
  if(t.indexOf('w') > -1 ||
    t.indexOf('h') > -1 ||
    t.indexOf('q') > -1 ||
    t.indexOf('8') > -1 ||
    t.indexOf('16') > -1 ||
    t.indexOf('32') > -1)
  {
    parseDuration(t);
  }
}

pianoVexStr += '\n';
guitarVexStr += '\n';
// alert(pianoVexStr);

pianoScore.append('options space=0 width=600 scale=1.0 player=true\n');
pianoScore.append('stave\n');
pianoScore.append('key=' + key + ' time=' + time + '\n');
pianoScore.append(pianoVexStr);

guitarScore.append('options space=0 width=600 scale=1.0 tab-stems=true player=true\n');
guitarScore.append('tabstave\n');
guitarScore.append('key=' + key + ' time=' + time + '\n');
guitarScore.append(guitarVexStr);