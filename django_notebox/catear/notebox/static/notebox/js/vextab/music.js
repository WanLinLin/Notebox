const musicalAlphabets = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const musicalDurations = ['w', 'h', 'q', 'i', 's', 't'];

/**
 *
 * return true if the string has musical alphabets
 *
 */
function hasMusialAlphabes(t) {
  for (var i = 0; i < musicalAlphabets.length; i++) {
    if(t.indexOf(musicalAlphabets[i]) > -1) {
      return true;
    }
  }
  return false;
}

/**
 *
 * return true if the string has musical durations
 *
 */
function hasDurations(t) {
  for (var i = 0; i < musicalDurations.length; i++) {
    if(t.indexOf(musicalDurations[i]) > -1) {
      return true;
    }
  }
  return false;
}