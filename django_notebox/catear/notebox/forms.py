from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate as django_auth, login as django_login
from django.core.exceptions import ValidationError
from django.forms import ModelChoiceField
from .models import Style

def check_username(username):
    if User.objects.filter(username=username).exists():
        raise ValidationError('User exists: %s' % username)

class RegistrationForm(forms.Form):
    name = forms.CharField(label='Your Name', max_length=100, required=True)
    email = forms.EmailField(label='E-mail', required=True, validators=[check_username])
    password = forms.CharField(widget=forms.PasswordInput, max_length=200, label='Password', required=True)

    def save(self, request):
        user = User.objects.create_user(
            username=self.cleaned_data['email'], 
            email=self.cleaned_data['email'],
            password=self.cleaned_data['password'])
        user.save()

        # Log user in
        user = django_auth(username=self.cleaned_data['email'], password=self.cleaned_data['password'])
        django_login(request, user)

class LoginForm(forms.Form):
    email = forms.EmailField(label='E-mail', required=True)
    password = forms.CharField(widget=forms.PasswordInput, max_length=200, label='Password', required=True)

    def login(self, request):
        user = django_auth(username=self.cleaned_data['email'], password=self.cleaned_data['password'])
        if user is not None:
            if user.is_active:
                django_login(request, user)
                return True
            else:
                return False
        return False

class UploadForm(forms.Form):
    styles = [ (i.name , i.name ) for i in Style.objects.all() ]

    title = forms.CharField(label='title', max_length=100, required=True)
    artist = forms.CharField(label='artist', max_length=100, required=True)
    youtube_url = forms.URLField(label='youtube_url', required=True)
    time_length = forms.IntegerField(label='time_length', required=True)
    song_img_url = forms.URLField(label='song_img_url', required=False)
    tab_url = forms.URLField(label='tab_url', required=False)
    song_style = forms.ChoiceField(label="song_style", widget=forms.Select, choices=styles, required=True)
    level = forms.CharField(label='level', max_length=100, required=True)
    desc = forms.CharField(label='desc', widget=forms.Textarea(attrs={'class': 'materialize-textarea'}), max_length=300, required=False)
    note = forms.CharField(label='note', widget=forms.Textarea(attrs={'class': 'materialize-textarea'}), max_length=100, required=False)

    # def save(self, request):
    #     song = Song.objects.create(
    #         title=self.cleaned_data['title'], 
    #         artist=self.cleaned_data['artist'],
    #         youtube_url=self.cleaned_data['artist'],
    #         time_length=self.cleaned_data['time_length'],
    #         song_img_url=self.cleaned_data['song_img_url'],
    #         tab_url=self.cleaned_data['tab_url'],
    #         song_style=self.cleaned_data['song_style'],
    #         level=self.cleaned_data['level'],
    #         desc=self.cleaned_data['desc'],
    #         note=self.cleaned_data['note'])
    #     song.save()