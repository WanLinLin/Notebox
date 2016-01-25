from django.contrib import admin

from notebox.models import UserInfo, Song, Style

# Register your models here.
class UserInfoAdmin(admin.ModelAdmin):
    pass

class SongAdmin(admin.ModelAdmin):
    pass

class StyleAdmin(admin.ModelAdmin):
    pass

admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Song, SongAdmin)
admin.site.register(Style, StyleAdmin)