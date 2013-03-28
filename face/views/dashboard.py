#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import json

from random import choice

from django.shortcuts import render
from django.http import HttpResponse

from face.models import Picture


def dashboard(request):

    context = {"category": 'dashboard', 'user': request.user}
    pictures = [picture for picture in Picture.objects.all()]
    if pictures:
        picture1 = choice(pictures)
        pictures.pop(pictures.index(picture1))
        picture2 = choice(pictures)
        context.update({"picture1": picture1, "picture2": picture2})

    return render(request, 'dashboard.html', context)


def picturelist(*args, **kwargs):
    pictures = [picture for picture in Picture.objects.all()]
    if pictures:
        picture1 = choice(pictures)
        pictures.pop(pictures.index(picture1))
        picture2 = choice(pictures)
        data = {"picture1": picture1.to_dict(), "picture2": picture2.to_dict()}

    return HttpResponse(json.dumps(data))


def vote(request):
    data = {}
    picture_link = request.form.get('picture_link', None)
    print picture_link
    return HttpResponse(json.dumps(data))
