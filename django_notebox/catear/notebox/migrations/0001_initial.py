# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('desc', models.TextField(default=None)),
                ('artist', models.CharField(max_length=128)),
                ('note', models.TextField(default=None)),
                ('tab_url', models.URLField(default=None)),
                ('level', models.CharField(max_length=16)),
                ('time_length', models.IntegerField(default=None)),
                ('song_img_url', models.URLField(default=None)),
                ('url', models.URLField(default=None)),
                ('song_yt_id', models.CharField(max_length=256)),
                ('modify_time', models.DateTimeField(auto_now=True)),
                ('upload_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='Style',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(default=None, max_length=32)),
                ('address', models.CharField(default=None, max_length=128)),
                ('member_type', models.CharField(default=None, max_length=32)),
                ('modify_time', models.DateTimeField(auto_now=True)),
                ('register_time', models.DateTimeField(auto_now_add=True)),
                ('info_user', models.ForeignKey(related_name='info_user', to=settings.AUTH_USER_MODEL)),
                ('liked_songs', models.ManyToManyField(related_name='liked_songs', to='notebox.Song')),
                ('upload_songs', models.ManyToManyField(related_name='upload_songs', to='notebox.Song')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.AddField(
            model_name='song',
            name='song_style',
            field=models.ForeignKey(related_name='song_style', to='notebox.Style'),
        ),
        migrations.AddField(
            model_name='song',
            name='upload_user',
            field=models.ForeignKey(related_name='song_upload_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
