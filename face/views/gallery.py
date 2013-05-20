#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import json
import pymongo

from flask import render_template
from utils import Pictures, Best_imag


def gallery():
    context = {"category": 'gallery'}

    id_best = Best_imag.find_one().get('best')
    best = Pictures.find_one({"_id": id_best})
    context.update({"star": best})
    return render_template('gallery.html', **context)


def picturelist(*args, **kwargs):
    data = {}
    for pict in Pictures.find().sort([['favorable', pymongo.DESCENDING]]):
        data[pict.get('_id')] = pict
    return json.dumps(data)
