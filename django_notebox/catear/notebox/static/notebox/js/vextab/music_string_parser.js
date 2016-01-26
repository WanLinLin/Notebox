var pianoScore = $('#piano_score');
var guitarScore = $('#guitar_score');

var key = 'C';
var time = '4/4';

pianoScore.append('options space=0\n');
pianoScore.append('stave\n');
pianoScore.append('key=' + key + ' time=' + time + '\n');
pianoScore.append('notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |\n');

// options space=0

// stave
// key=C time=4/4

// notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
// notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4

// stave
// notes :q (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
// notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4 =:|