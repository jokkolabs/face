#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

from random import choice

from django.shortcuts import render
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
