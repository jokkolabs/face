#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import json

from random import choice

from flask import render_template, request
from utils import rset, rget


def dashboard():
    return render_template('dashboard.html')


def choosepict(*args, **kwargs):
    pictures = [picture for picture in rget("pictures")]
    if pictures:
        picture1 = choice(pictures)
        pictures.pop(pictures.index(picture1))
        picture2 = choice(pictures)
        star = rget("bestimg")
        data = {"picture1": rget(picture1), "picture2": rget(picture2),
                "star": rget(star), "idp1": picture1, "idp2": picture2}

    return json.dumps(data)


def vote(*args, **kwargs):
    data = {}
    picture_link = request.form.get('plink', None)
    pict = rget(picture_link)
    pict["favorable"] += 1
    rset(picture_link, pict)

    star = rget("bestimg")
    if rget(star)["favorable"] < pict["favorable"]:
        rset("bestimg", picture_link)

    return json.dumps(data)
