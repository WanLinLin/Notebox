from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate as django_auth, login as django_login
from django.core.exceptions import ValidationError
from django.forms import ModelChoiceField
from .models import SongStyle, SongLevel

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
    # Provided by user
    title        = forms.CharField(label='*樂曲名稱', max_length=100, required=True)
    desc         = forms.CharField(label='樂曲故事/簡介', 
                        widget=forms.Textarea(attrs={'class': 'materialize-textarea'}), max_length=300, required=False)
    artist       = forms.CharField(label='演奏者/歌手', max_length=100, required=False)
    composer     = forms.CharField(label='作曲者', max_length=100, required=False)
    youtube_url  = forms.URLField(label='*YouTube 網址', required=True)
    song_style   = forms.ModelChoiceField(label="*風格", 
                        queryset=SongStyle.objects.all(), empty_label=None, required=True)
    song_level   = forms.ModelChoiceField(label='*難度', 
                        queryset=SongLevel.objects.all(), empty_label=None, required=True)

    tab_url      = forms.URLField(label='外連譜網址', required=False)
    # 和弦譜
    note         = forms.CharField(label='*和弦', max_length=100, required=True)

    # Vex tab note
    vex_piano    = None
    vex_guitar   = None

    # Auto generated
    time_length     = None
    youtube_img_url = None
    youtube_id      = None
    upload_user     = None

    def setVexTab(self, tabstr):
        self.vex_guitar = tabstr
        self.vex_piano  = tabstr

    def save(self, request):
        # Generate not-user-provided data
        self.upload_user  = request.user
        self.youtube_id   = youtube_url.split('v=')[-1]
        self.time_length  = None
        self.youtube_img_url = 'http://img.youtube.com/vi/{id}/0.jpg'.format(id=youtube_id)

        # New Song object
        new_song = Song(
            # from form
            title=self.cleaned_data['title'],
            desc=self.cleaned_data['desc'],
            composer=self.cleaned_data['composer'],
            artist=self.cleaned_data['artist'],
            note=self.cleaned_data['note'],
            tab_url=self.cleaned_data['tab_url'],
            song_style=self.cleaned_data['song_style'],
            song_level=self.cleaned_data['song_level'],
            youtube_url=self.cleaned_data['youtube_url'],

            vex_piano=self.vex_piano,
            vex_guitar=self.vex_guitar,

            # not from form
            youtube_img_url=self.youtube_img_url,
            youtube_id=self.youtube_id,
            upload_user=self.upload_user,
            time_length=self.time_length
        )

        new_song.save()
