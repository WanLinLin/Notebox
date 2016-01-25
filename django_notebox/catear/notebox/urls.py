from django.conf.urls import include, url
from django.views.generic.base import RedirectView

from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^overview/', views.overview),
    url(r'^player/', views.player),
    url(r'^.*$', RedirectView.as_view(url='/notebox/', permanent=False), name='index'),
]