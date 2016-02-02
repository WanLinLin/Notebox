from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate as django_auth

# Create your models here.

class SongStyle(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class SongLevel(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Song(models.Model):
    # Provided by user
    title        = models.CharField(max_length=200)
    desc         = models.TextField(default=None, null=True)
    composer     = models.CharField(max_length=128, default=None, null=True)
    artist       = models.CharField(max_length=128, default=None, null=True)
    # 和弦
    note         = models.TextField(default=None, null=True)
    # 範例譜網址
    tab_url      = models.URLField(default=None, null=True)
    song_style   = models.ForeignKey(SongStyle, related_name='song_style')
    song_level   = models.ForeignKey(SongLevel, related_name='song_level')
    # youtube 網址
    youtube_url  = models.URLField(default=None, null=True)

    # vex tab note
    vex_piano    = models.TextField(default=None, null=True)
    vex_guitar   = models.TextField(default=None, null=True)


    # Not user editable
    upload_user  = models.ForeignKey(User, related_name='song_upload_user')
    time_length = models.IntegerField(default=None, null=True)
    # youtube 縮圖 網址
    youtube_img_url = models.URLField(default=None)
    youtube_id = models.CharField(max_length=256)
    modify_time = models.DateTimeField(auto_now=True)
    upload_time = models.DateTimeField(auto_now_add=True)    
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)

class UserInfo(models.Model):
    info_user = models.ForeignKey(User, related_name='info_user')
    name = models.CharField(max_length=128)
    email = models.EmailField(default=None)
    phone = models.CharField(max_length=32, default=None)
    address = models.CharField(max_length=128, default=None)
    country = models.CharField(max_length=128, default=None)
    city = models.CharField(max_length=128, default=None)

    # member_type = models.CharField(max_length=32, default=None)
    # profile_photo = ImageField(default=None)

    liked_songs = models.ManyToManyField(Song, related_name='liked_songs')
    upload_songs = models.ManyToManyField(Song, related_name='upload_songs')

    modify_time = models.DateTimeField(auto_now=True)
    register_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + ', ' + self.email

    class Meta:
        ordering = ('name',)


