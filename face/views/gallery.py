#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import json

from random import choice

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from face.models import Picture


def gallery(request):
    context = {"category": 'gallery', 'user': request.user}

    picturelist = Picture.objects.order_by("-favorable")
    print picturelist
    context.update({"picturelist": picturelist})

    return render(request, 'gallery.html', context)


def picturelist(*args, **kwargs):
    pictures = [picture for picture in Picture.objects.all()]
    if pictures:
        picture1 = choice(pictures)
        pictures.pop(pictures.index(picture1))
        picture2 = choice(pictures)
        data = {"picture1": picture1.to_dict(), "picture2": picture2.to_dict()}

    return HttpResponse(json.dumps(data))


@require_POST
@csrf_exempt
def vote(request):
    data = {}
    picture_link = request.POST.get('link', None)
    p = Picture.objects.get(link=picture_link)
    p.favorable += 1
    p.save()
    return HttpResponse(json.dumps(data))
