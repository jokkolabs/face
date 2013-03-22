#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

from random import choice

from django.shortcuts import render
from face.models import Picture


def dashboard(request):

    context = {"category": 'dashboard', 'user': request.user}
    links = [picture.link for picture in Picture.objects.all()]
    if links:
        choice1 = choice(links)
        links.pop(links.index(choice1))
        choice2 = choice(links)
        context.update({"choice1": choice1, "choice2": choice2})

    return render(request, 'dashboard.html', context)
