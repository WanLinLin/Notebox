from django.http import Http404
from django.shortcuts import render
from django.contrib.staticfiles.templatetags.staticfiles import static

# Create your views here.

def index(request):
    return render(request, 'notebox/index.html', {})

def overview(request):
    # Generate data
    context = {'latest': [], 'popular': []}
    # Latest (test)
    context['latest'].extend([
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg1.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg1.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg1.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg1.jpg'), 'playerid': '12345'},
    ])
    # Popular (test)
    context['popular'].extend([
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
        {'title': 'D小調第九號交響曲', 'desc': '作曲家: 貝多芬/1770/1827\n演奏者: 阿姆斯壯 女高音 雷諾茲 次女高音 雪利—奎克 男低音 提爾 男高音 朱里尼 指揮 倫敦交響', 'img': static('notebox/images/main-bg2.jpg'), 'playerid': '12345'},
    ])
    return render(request, 'notebox/overview.html', context)

def account(request):
    return render(request, 'notebox/account_info.html', {})

def player(request):
    return render(request, 'notebox/player.html', {})