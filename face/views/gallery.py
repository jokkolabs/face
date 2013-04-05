#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

from django.shortcuts import render

from face.models import Picture


def gallery(request):
    context = {"category": 'gallery', 'user': request.user}

    picturelist = Picture.objects.order_by("-favorable")
    start = Picture.objects.order_by("-favorable")[0]
    context.update({"picturelist": picturelist,
                    "start": start})

    return render(request, 'gallery.html', context)
