import sys, os
from django.core.wsgi import get_wsgi_application
os.environ['DJANGO_SETTINGS_MODULE'] = 'catear.settings'
application = get_wsgi_application()

from django.conf import settings
from django.contrib.auth import authenticate as django_auth
from notebox.models import *
import numpy as np

import csv

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('[usage] '+sys.argv[0]+' <data.csv>')
        sys.exit(1)

    # Load data
    filename = sys.argv[1]
    with open(filename, 'r') as fin:
        rows = [i for i in csv.reader(fin)]

    # Pop out the header
    print(rows.pop(0))

    # Conver to Numpy array
    nrows = np.array(rows)

    # Insert Levels
    level = {"初級", "中級", "高級", "其他"}
    cur_level = [i.name for i in SongLevel.objects.all()]
    for l in level:
        if l not in cur_level:
            new_level = SongLevel(name=l)
            new_level.save()

    # Insert style
    styles = set(nrows[:,3])
    cur_styles = [i.name for i in SongStyle.objects.all()]
    for s in styles:
        if s not in cur_styles:
            new_style = SongStyle(name=s)
            new_style.save()

    # Get test user
    user = django_auth(username='test@test.com', password='testfortest')

    # Insert songs
    cur_songs = [i.title for i in Song.objects.all()]
    for s in rows:
        title = s[0]
        artist   = s[1]
        composer = s[2]
        style = s[3]
        level = s[4]
        chord = s[5]
        yt_url = s[6]
        note_url = s[7]

        yt_id = yt_url.split('v=')[-1]

        if level == '1': level = SongLevel.objects.get(name='初級')
        elif level == '2': level = SongLevel.objects.get(name='中級')
        elif level == '3': level = SongLevel.objects.get(name='高級')
        else: level = SongLevel.objects.get(name='其他')


        style_obj = SongStyle.objects.get(name=style)

        if title not in cur_songs:
            new_song = Song(
                title=title,
                artist=artist,
                composer=composer,
                note=chord,
                url=yt_url,
                song_yt_id=yt_id, 
                song_img_url='http://img.youtube.com/vi/{id}/0.jpg'.format(id=yt_id),
                level=level, desc='test', tab_url=note_url, time_length=0, song_style=style_obj, upload_user=user)
            new_song.save()





