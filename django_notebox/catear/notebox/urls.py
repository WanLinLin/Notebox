from django.conf.urls import include, url
from django.views.generic.base import RedirectView

from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^overview/', views.overview),
    url(r'^player/(?P<song_id>\d+)', views.player),
    url(r'^account/$', views.account),
    url(r'^account/favorite/$', views.favorite),
    url(r'^account/login/$', views.user_login, name='user_login'),
    url(r'^account/logout/$', views.logout),
    url(r'^upload/$', views.upload),
    url(r'^.*$', RedirectView.as_view(url='/notebox/', permanent=False), name='index'),
]