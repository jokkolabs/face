#!/usr/bin/env python
# -*- coding: utf-8 -*-
# maintainer: FADIGA

from django.contrib import admin

from models import (Picture, Vote, TextStatic)


class PictureAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',)


class VoteAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',)


class TextStaticAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',)


admin.site.register(Picture, PictureAdmin)
admin.site.register(Vote, VoteAdmin)
admin.site.register(TextStatic, TextStaticAdmin)
