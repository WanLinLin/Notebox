from django.http import HttpResponseRedirect
from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.contrib.auth import logout as django_logout
from django.contrib import messages
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.core import serializers

from .forms import RegistrationForm, LoginForm, UploadForm
from .models import Song, SongStyle


"""
/*===========================================
=            User authentication            =
===========================================*/
"""
def create_login_signup_form():
    sign_form = RegistrationForm()
    login_form = LoginForm()
    return {'login_form': login_form, 'sign_form': sign_form}

def form_checker(request):
    # Check POST request
    if request.method == 'POST':
        # User wants to register
        if 'register' in request.POST:
            form = RegistrationForm(request.POST)
            if form.is_valid():
                form.save(request)
                return HttpResponseRedirect(reverse('index'))
            
        # User wants to login
        elif 'login' in request.POST:
            form = LoginForm(request.POST)
            if form.is_valid():
                if form.login(request):
                    # Login successful
                    messages.add_message(request, messages.INFO, "登入成功")
                    return HttpResponseRedirect(reverse('index'))
                else:
                    # Show error message
                    messages.add_message(request, messages.INFO, "登入失敗")
                    return HttpResponseRedirect(reverse('index'))

        # elif 'upload' in request.POST:
        #     form = UploadForm(request.POST)
        #     if form.is_valid():
        #         if form.save(request):
        #             # Save successful
        #             return HttpResponseRedirect(request.path)
        #         else:
        #             # Show error message
        #             return HttpResponseRedirect(request.path)

    return False

def logout(request):
    django_logout(request)
    return HttpResponseRedirect('/notebox/')

def user_login(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('index'))
    else:
        # Check form
        form_result = form_checker(request)
        if form_result: return form_result
        else: return HttpResponseRedirect(reverse('index'))

"""
/*=====  End of User authentication  ======*/
"""


def index(request):
    songs = Song.objects.all()
    songs_list = [{'title':i.title, 'desc':i.desc, 'img':i.youtube_img_url, 'song_id':i.id} for i in songs[0:9]]
    # print(songs_list)

    # Different context for different users

    if not request.user.is_authenticated():
        context = create_login_signup_form()
    else:
        context = {}

    context['latest'] = []
    context['popular'] = []

    context['latest'].extend(songs_list) # Latest (test)
    context['popular'].extend([          # Popular (test)
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
    ])

    return render(request, 'notebox/index.html', context)        

def overview(request):
    # Get song data
    songs = Song.objects.all()
    songs_list = [{'title':i.title, 'desc':i.desc, 'img':i.youtube_img_url, 'song_id':i.id} for i in songs]
    songs_list = [songs_list[i: i+4] for i in range(0, len(songs_list), 4)]

    if not request.user.is_authenticated():
        context = create_login_signup_form()
    else:
        context = {}

    context['latest'] = []
    context['popular'] = []

    # Latest (test)
    context['latest'].extend(songs_list)

    # Popular (test)
    context['popular'].extend([
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'song_id': '12345'},
    ])

    return render(request, 'notebox/overview.html', context)

def query_song(request):
    """ Used to query song in the database. This view will be called 
        through AJAX.
    """
    result = {}
    input_keys = request.GET

    # Extract query keys

    level = input_keys.get('level', '-1')
    instructment = input_keys.get('instructment', '')
    chord = input_keys.get('chord', '').split(',')
    keyword = input_keys.get('keyword')

    # QuerySet

    # Full-matched result
    r1 = Song.objects.all()
    if level:
        r1 = r1.filter(song_level__value=int(level)) # Level
    if instructment == 'piano': # Instructment
        r1 = r1.exclude(vex_piano=None)
        r1 = r1.exclude(vex_piano='')
    if instructment == 'guitar': # Instructment
        r1 = r1.exclude(vex_guitar=None)
        r1 = r1.exclude(vex_guitar='')
    if chord: # Chord
        for i in chord:
            r1 = r1.filter(note__icontains=i)
    if keyword:
        r1 = r1.filter(
            Q(title__icontains=keyword)|
            Q(composer__icontains=keyword)|
            Q(artist__icontains=keyword) )

    # Prepare the result

    query_result = []
    for i in r1:
        query_result.append({
            'title': i.title, 
            'youtube_url': i.youtube_url,
            'youtube_img_url': i.youtube_img_url,
            'youtube_id': i.youtube_id })

    result['level'] = level
    result['instructment'] = instructment
    result['chord'] = chord
    result['keyword'] = keyword
    result['result'] = query_result

    return JsonResponse(result)

@login_required(login_url='/notebox/')
def account(request):
    return render(request, 'notebox/account_info.html', {})

@login_required(login_url='/notebox/')
def favorite(request):
    return render(request, 'notebox/account_info_favorite.html', {})    

def player(request, song_id):

    # Get song data by id
    song = Song.objects.get(id=song_id)
    song_info = {
        'title': song.title, 'song_yt_id':song.youtube_id, 'yt_url': song.youtube_url, 
        'desc': song.desc, 'level': song.song_level, 'style': song.song_style,
        'note': song.note, 'artist': song.artist}

    if not request.user.is_authenticated():
        context = create_login_signup_form()
    else:
        context = {}

    # TEST
    context.update(song_info)

    return render(request, 'notebox/player.html', context)

@login_required(login_url='/notebox/')
def upload(request):
    upload_form = UploadForm(auto_id=True)
    step = 0
    cleaned_data = {}

    if request.method == 'POST':
        upload_form = UploadForm(request.POST)
        if upload_form.is_valid():
            step = step + 1
            upload_form.save(request)
            cleaned_data['youtube_url'] = upload_form.cleaned_data['youtube_url']
            cleaned_data['youtube_id'] = upload_form.youtube_id
            cleaned_data['youtube_img_url'] = upload_form.youtube_img_url
            cleaned_data['note'] = upload_form.cleaned_data['note'].split(',')
            cleaned_data['title'] = upload_form.cleaned_data['title']
        else:
            pass
            # print("Form is NOT OK")

    context = {'upload_form': upload_form, 'step': step, 'cleaned_data': cleaned_data}
    return render(request, 'notebox/upload_music.html', context)


