#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import json

from random import choice

from flask import render_template, request
from utils import Pictures, Best_imag


def dashboard():
    context = {"category": 'dashboard'}
    return render_template('dashboard.html', **context)


def choosepict(*args, **kwargs):
    # La liste de tout les images (liste de dict)
    pictures = [picture for picture in Pictures.find()]

    if pictures:
        #choix de 1ere image
        picture1 = choice(pictures)
        # on enleve de la liste
        pictures.pop(pictures.index(picture1))
        # 2ème choix
        picture2 = choice(pictures)
        # récupération de la meilleur image
        id_best = Best_imag.find_one().get('best')
        best = Pictures.find_one({"_id": id_best})

        data = {"picture1": picture1, "picture2": picture2, "star": best,
                "idp1": picture1.get('_id'), "idp2": picture2.get('_id')}

    return json.dumps(data)


def vote(*args, **kwargs):
    data = {}
    id_pict = request.form.get('url', None)
    pict = Pictures.find_one({"_id": id_pict})
    new_value = pict["vote"] + 1
    Pictures.update({"_id": id_pict},
                    {"$set": {"vote": new_value}})
    id_best = Best_imag.find_one().get('best')
    pict_best = Pictures.find_one({"_id": id_best})
    if pict_best.get("vote") < new_value:
        Best_imag.update({"_id": "star"}, {"$set": {"best": id_pict}})

    return json.dumps(data)
