#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import json

from flask import render_template
from utils import rget


def gallery():
    context = {"category": 'gallery'}

    star = rget("bestimg")
    picturelist = [picture for picture in rget("pictures")]
    context.update({"picturelist": picturelist,
                    "start": star})
    return render_template('gallery.html', **context)


def picturelist(*args, **kwargs):
    data = {}
    for pict in rget('pictures'):
        data[pict] = rget(pict)
    return json.dumps(data)
