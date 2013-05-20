#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client["face_db"]

Pictures = db['picturres']
Best_imag = db['best_imag']
