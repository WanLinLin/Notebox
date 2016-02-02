from django.contrib import admin

from notebox.models import *

# Register your models here.
class UserInfoAdmin(admin.ModelAdmin):
    pass

class SongAdmin(admin.ModelAdmin):
    pass

class StyleAdmin(admin.ModelAdmin):
    pass

class LevelAdmin(admin.ModelAdmin):
    pass

admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Song, SongAdmin)
admin.site.register(SongStyle, StyleAdmin)
admin.site.register(SongLevel, LevelAdmin)