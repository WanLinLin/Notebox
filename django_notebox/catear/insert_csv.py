import sys, os
os.environ['DJANGO_SETTINGS_MODULE'] = 'catear.settings'
from django.conf import settings
from notebox.models import Song

print(Song.objects.all())