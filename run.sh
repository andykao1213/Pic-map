#!/bin/bash

export FLASK_APP=flaskr
export FLASK_DEBUG=1

flask initdb
flask run --host=0.0.0.0 --port=5000
