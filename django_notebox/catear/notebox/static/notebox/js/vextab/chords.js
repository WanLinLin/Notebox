/**
 * GuitarChords and PianoChords is currently the same, but basic piano chord composition 
 * is different from basic guitar chord, so the VexStrs should be different in the future.
 */

/*============================================================================================
=            Guitar Chords Reference -> http://www.8notes.com/guitar_chord_chart/            =
============================================================================================*/
var GuitarChords = {
  'bC': '(2/1.4/2.4/3.4/4.2/5)',
  'bCm': '(2/1.3/2.4/3.4/4.2/5)',
  'bCm7': '(2/1.3/2.2/3.4/4.2/5)',
  'bCmaj7': '(2/1.4/2.3/3.4/4.2/5)',
  'bC7': '(2/1.4/2.2/3.4/4.2/5)',

  'C': '(0/1.1/2.0/3.2/4.3/5)',
  'Cm': '(3/1.4/2.5/3.5/4.3/5)',
  'Cm7': '(3/1.4/2.3/3.5/4.3/5)',
  'Cmaj7': '(0/1.0/2.0/3.2/4.3/5)',
  'C7': '(0/1.1/2.3/3.2/4.3/5)',

  '#C': '(4/1.6/2.6/3.6/4.4/5)',
  '#Cm': '(4/1.5/2.6/3.6/4.4/5)',
  '#Cm7': '(4/1.5/2.4/3.6/4.4/5)',
  '#Cmaj7': '(4/1.5/2.4/3.6/4.4/5)',
  '#C7': '(4/1.6/2.4/3.6/4.4/5)',

  'bD': '(4/1.6/2.6/3.6/4.4/5)',
  'bDm': '(4/1.5/2.6/3.6/4.4/5)',
  'bDm7': '(4/1.5/2.4/3.6/4.4/5)',
  'bDmaj7': '(4/1.6/2.5/3.6/4.4/5)',
  'bD7': '(4/1.6/2.4/3.6/4.4/5)',

  'D': '(2/1.3/2.2/3.0/4)',
  'Dm': '(1/1.3/2.2/3.0/4)',
  'Dm7': '(1/1.1/2.2/3.0/4)',
  'Dmaj7': '(2/1.2/2.2/3.0/4)',
  'D7': '(2/1.1/2.2/3.0/4)',

  '#D': '(6/1.8/2.8/3.8/4.6/5)',
  '#Dm': '(6/1.7/2.8/3.8/4.6/5)',
  '#Dm7': '(6/1.7/2.6/3.8/4.6/5)',
  '#Dmaj7': '(6/1.8/2.7/3.8/4.6/5)',
  '#D7': '(6/1.8/2.6/3.8/4.6/5)',

  'bE': '(6/1.8/2.8/3.8/4.6/5)',
  'bEm': '(6/1.7/2.8/3.8/4.6/5)',
  'bEm7': '(6/1.7/2.6/3.8/4.6/5)',
  'bEmaj7': '(6/1.8/2.7/3.8/4.6/5)',
  'bE7': '(6/1.8/2.6/3.8/4.6/5)',

  'E': '(0/1.0/2.1/3.2/4.2/5.0/6)',
  'Em': '(0/1.0/2.0/3.2/4.2/5.0/6)',
  'Em7': '(0/1.3/2.0/3.2/4.2/5.0/6)',
  'Emaj7': '(0/1.0/2.1/3.1/4.2/5.0/6)',
  'E7': '(0/1.0/2.1/3.0/4.2/5.0/6)',

  'F': '(1/1.1/2.2/3.3/4)',
  'Fm': '(1/1.1/2.1/3.3/4.3/5.1/6)',
  'Fm7': '(1/1.1/2.1/3.1/4.3/5.1/6)',
  'Fmaj7': '(0/1.1/2.2/3.3/4)',
  'F7': '(1/1.1/2.2/3.1/4.3/5.1/6)',

  '#F': '(2/1.2/2.3/3.4/4.4/5.2/6)',
  '#Fm': '(2/1.2/2.2/3.4/4.4/5.2/6)',
  '#Fm7': '(2/1.2/2.3/3.4/4.4/5.2/6)',
  '#Fmaj7': '(2/2.2/3.2/4.2/6)',
  '#F7': '(0/1.2/2.3/3.4/4)',

  'bG': '(2/1.2/2.3/3.4/4.4/5.2/6)',
  'bGm': '(2/1.2/2.2/3.4/4.4/5.2/6)',
  'bGm7': '(2/1.2/2.3/3.4/4.4/5.2/6)',
  'bGmaj7': '(2/2.2/3.2/4.2/6)',
  'bG7': '(0/1.2/2.3/3.4/4)',

  'G': '(3/1.0/2.0/3.0/4.2/5.3/6)',
  'Gm': '(3/1.3/2.3/3.5/4.5/5.3/6)',
  'Gm7': '(3/1.3/2.3/3.3/4.5/5.3/6)',
  'Gmaj7': '(2/1.0/2.0/3.0/4.2/5.3/6)',
  'G7': '(1/1.0/2.0/3.0/4.2/5.3/6)',

  '#G': '(4/1.4/2.5/3.6/4.6/5.4/6)',
  '#Gm': '(4/1.4/2.5/3.6/4.6/5.4/6)',
  '#Gm7': '(4/1.7/2.4/3.4/4.6/5.4/6)',
  '#Gmaj7': '(4/1.1/2.1/3.1/4)',
  '#G7': '(2/1.1/2.1/3.1/4)',

  'bA': '(4/1.4/2.5/3.6/4.6/5.4/6)',
  'bAm': '(4/1.4/2.5/3.6/4.6/5.4/6)',
  'bAm7': '(4/1.7/2.4/3.4/4.6/5.4/6)',
  'bAmaj7': '(4/1.1/2.1/3.1/4)',
  'bA7': '(2/1.1/2.1/3.1/4)',

  'A': '(0/1.2/2.2/3.2/4.0/5)',
  'Am': '(0/1.1/2.2/3.2/4.0/5)',
  'Am7': '(0/1.1/2.0/3.2/4.0/5)',
  'Amaj7': '(0/1.2/2.1/3.2/4.0/5)',
  'A7': '(0/1.2/2.0/3.2/4.0/5)',

  '#A': '(1/1.3/2.3/3.3/4.1/5)',
  '#Am': '(1/1.2/2.3/3.3/4.1/5)',
  '#Am7': '(1/1.2/2.1/3.3/4.1/5)',
  '#Amaj7': '(1/1.3/2.2/3.3/4.1/5)',
  '#A7': '(1/1.3/2.1/3.3/4.1/5)',

  'bB': '(1/1.3/2.3/3.3/4.1/5)',
  'bBm': '(1/1.2/2.3/3.3/4.1/5)',
  'bBm7': '(1/1.2/2.1/3.3/4.1/5)',
  'bBmaj7': '(1/1.3/2.2/3.3/4.1/5)',
  'bB7': '(1/1.3/2.1/3.3/4.1/5)',

  'B': '(2/1.4/2.4/3.4/4.2/5)',
  'Bm': '(2/1.3/2.4/3.4/4.2/5)',
  'Bm7': '(2/1.3/2.2/3.4/4.2/5)',
  'Bmaj7': '(2/1.4/2.3/3.4/4.2/5)',
  'B7': '(2/1.4/2.2/3.4/4.2/5)'
};