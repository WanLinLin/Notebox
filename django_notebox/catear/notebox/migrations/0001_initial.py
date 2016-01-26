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
            name='Member',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=32, default=None)),
                ('address', models.CharField(max_length=128, default=None)),
                ('member_type', models.CharField(max_length=32, default=None)),
                ('modify_time', models.DateTimeField(auto_now=True)),
                ('register_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('desc', models.TextField(default=None)),
                ('note', models.TextField()),
                ('time_length', models.IntegerField()),
                ('song_img_url', models.URLField()),
                ('url', models.URLField()),
                ('modify_time', models.DateTimeField(auto_now=True)),
                ('upload_time', models.DateTimeField(auto_now_add=True)),
                ('upload_user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='song_upload_user')),
            ],
            options={
                'ordering': ('title',),
            },
        ),
        migrations.AddField(
            model_name='member',
            name='liked_songs',
            field=models.ManyToManyField(to='notebox.Song', related_name='liked_songs'),
        ),
        migrations.AddField(
            model_name='member',
            name='upload_songs',
            field=models.ManyToManyField(to='notebox.Song', related_name='upload_songs'),
        ),
    ]
