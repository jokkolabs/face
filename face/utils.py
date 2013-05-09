#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import redis
import pickle

r = redis.Redis(host='localhost', port=6379, db=0, password=None,
                socket_timeout=None)


def rset(key, obj):
    return r.set(key, pickle.dumps(obj))


def rget(key):
    return pickle.loads(r.get(key))
