#!/usr/bin/env python

import sys
import os
# import pickle
# import redis

from flask import Flask

from views.dashboard import dashboard, vote, choosepict
from views.gallery import gallery, picturelist

abs_path = os.path.abspath(__file__)
ROOT_DIR = os.path.dirname(abs_path)
MEDIA_ROOT = os.path.join(ROOT_DIR, 'media')

app = Flask('face_server', static_folder=MEDIA_ROOT)
app.debug = True


app.route('/')(dashboard)
app.route('/choosepict')(choosepict)
app.route('/vote', methods=['POST'])(vote)
app.route('/gallery')(gallery)
app.route('/picturelist')(picturelist)

if __name__ == '__main__':
    try:
        http_port = int(sys.argv[1])
    except:
        http_port = 5000
    app.run(debug=True, port=http_port)
