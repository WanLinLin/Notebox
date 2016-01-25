from django.db import models

# Create your models here.

class Style(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Song(models.Model):
    upload_user  = models.ForeignKey('auth.User', related_name='song_upload_user')

    title = models.CharField(max_length=200)
    desc = models.TextField(default=None)
    artist = models.CharField(max_length=128)
    note = models.TextField(default=None)
    tab_url = models.URLField(default=None)

    song_style = models.ForeignKey(Style, related_name='song_style')
    level = models.CharField(max_length=16)

    time_length = models.IntegerField(default=None)
    # song_img = ImageField(default=None)
    song_img_url = models.URLField(default=None)
    url = models.URLField(default=None)
    song_yt_id = models.CharField(max_length=256)

    modify_time = models.DateTimeField(auto_now=True)
    upload_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)

class UserInfo(models.Model):
    info_user = models.ForeignKey('auth.User', related_name='info_user')

    name = models.CharField(max_length=128)
    email = models.EmailField()
    phone = models.CharField(max_length=32, default=None)
    address = models.CharField(max_length=128, default=None)

    member_type = models.CharField(max_length=32, default=None)
    # profile_photo = ImageField(default=None)

    liked_songs = models.ManyToManyField(Song, related_name='liked_songs')
    upload_songs = models.ManyToManyField(Song, related_name='upload_songs')

    modify_time = models.DateTimeField(auto_now=True)
    register_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + ', ' + self.email

    class Meta:
        ordering = ('name',)


