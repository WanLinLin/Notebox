from django.db import models

# Create your models here.

class Song(models.Model):
    upload_user  = models.ForeignKey('auth.User', related_name='song_upload_user')

    title = models.CharField(max_length=200)
    desc = models.TextField(default=None)
    note = models.TextField()    
    time_length = models.IntegerField()
    song_img = ImageField(default=None)
    song_img_url = models.URLField()
    url = models.URLField()

    modify_time = models.DateTimeField(auto_now=True)
    upload_time = models.DateTimeField(auto_now_add=True)

class Member(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField()
    phone = models.CharField(max_length=32, default=None)
    address = models.CharField(max_length=128, default=None)
    member_type = models.CharField(max_length=32, default=None)
    profile_photo = ImageField(default=None)
    modify_time = models.DateTimeField(auto_now=True)
    register_time = models.DateTimeField(auto_now_add=True)