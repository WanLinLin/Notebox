from django.contrib import admin

from notebox.models import Member, Song

# Register your models here.
class MemberAdmin(admin.ModelAdmin):
    pass

class SongAdmin(admin.ModelAdmin):
    pass

admin.site.register(Member, MemberAdmin)
admin.site.register(Song, SongAdmin)