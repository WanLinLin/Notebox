var pianoScore = $('#piano_score');
var guitarScore = $('#guitar_score');

var key = 'C';
var temple = 'temple=120';
var time = '4/4';

var musicString = '|: Fmajh Emh | Dm7h Ch :|';
var token = musicString.split(" ");
var vextabString = 'notes ';
var curChord = '';

function parseBar(t) {
	switch(t) {
		case '|:':
			vextabString += '=|: ';
			break;
		case ':|':
			vextabString += '=:| ';
			break;
		case '|':
			vextabString += '| ';
			break;
	}
}

function parseChord(t) {
	switch(t) {
		case 'Fmaj':
			curChord = '(0/1.1/2.2/3.3/4) ';
			break;
		case 'Em':
			curChord = '(0/1.0/2.0/3.2/4.2/5.0/6) ';
			break;
		case 'Dm7':
			curChord = '(1/1.1/2.2/3.0/4) ';
			break;
		case 'C':
			curChord = '(0/1.1/2.0/3.2/4.3/5) ';
			break;
	}
}

function parseDuration(t) {
	switch(t) {
		case 'h':
			vextabString += ':h ';
			break;
	}

	vextabString += curChord;
	curChord = '';
}

for(var i = 0; i < token.length; i++) {
	var t = token[i];

	if(t.indexOf('|') > -1) {
		parseBar(t);
	}

	if(t.indexOf('C') > -1) {
		parseChord(t.substring(0, t.length - 1));
		t = t.substring(t.length - 1, t.length);
	}
	if(t.indexOf('D') > -1) {
		parseChord(t.substring(0, t.length - 1));
		t = t.substring(t.length - 1, t.length);
	}
	if(t.indexOf('E') > -1) {
		parseChord(t.substring(0, t.length - 1));
		t = t.substring(t.length - 1, t.length);
	}
	if(t.indexOf('F') > -1) {
		parseChord(t.substring(0, t.length - 1));
		t = t.substring(t.length - 1, t.length);
	}

	if(t.indexOf('h') > -1) {
		parseDuration(t);
	}
}

vextabString += '\n';
// alert(vextabString);

pianoScore.append('options space=0\n');
pianoScore.append('stave\n');
pianoScore.append('key=' + key + ' time=' + time + '\n');
pianoScore.append(vextabString);

guitarScore.append('options space=0\n');
guitarScore.append('tabstave\n');
guitarScore.append('notation=true\n');
guitarScore.append('key=' + key + ' time=' + time + '\n');
guitarScore.append(vextabString);