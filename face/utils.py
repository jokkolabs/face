#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import redis
from pymongo import MongoClient
import pickle

r = redis.Redis(host='localhost', port=6379, db=0, password=None,
                socket_timeout=None)

client = MongoClient('localhost', 27017)

db = client["face_db"]

Pictures = db['picturres']
Best_imag = db['best_imag']


def rset(key, obj):
    return r.set(key, pickle.dumps(obj))


def rget(key):
    return pickle.loads(r.get(key))
