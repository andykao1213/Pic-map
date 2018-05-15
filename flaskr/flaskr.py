# -*- coding: utf-8 -*-
"""
    Flaskr
    ~~~~~~

    A microblog example application written as Flask tutorial with
    Flask and sqlite3.

	<a href="{{ url_for('register')}}">register</a>
    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""

import os
from sqlite3 import dbapi2 as sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
from datetime import datetime


# create our little application :)
app = Flask(__name__)

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    DEBUG=True,
    SECRET_KEY='development key',
    USERNAME=['admin'],
    PASSWORD=['default'],
    ROOMNUM=0
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def init_db():
    """Initializes the database."""
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

    db.execute('insert into account_entries (username, password) values (?, ?)',
               ['admin2', 'default'])
    db.commit()

    db.execute('insert into account_entries (username, password) values (?, ?)', 
            ['haha', 'haha'])
    db.commit()






@app.cli.command('initdb')
def initdb_command():
    """Creates the database tables."""
    init_db()
    print('Initialized the database.')


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
        
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()



@app.route('/add', methods=['POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)

    db = get_db()
    db.execute('insert into entries (title, text, author, room_token) values (?, ?, ?, ?)',
               [request.form['title'], request.form['text'], session['username'], session['room_token']])

    db.commit()
    flash('New entry was successfully posted')
    #MUST Modify
    return redirect('http://140.114.197.41:5000/room/'+session['room_token'])


@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    #if session.get('logged_in')  :
    #    return redirect(url_for('lobby'))
    if session.get('logged_in'):
        session.pop('logged_in', None)
    if session.get('username'):
        session.pop('username', None)
    if session.get('room_token'):
        session.pop('room_token', None)
    if session.get('album_token'):
        session.pop('album_token', None)
    error = None
    db = get_db()
    cur = db.execute('select username, password from account_entries order by id desc')
    entries = cur.fetchall()

    if request.method == 'POST':
        for k,v in entries:
            if k == request.form['username'] and v == request.form['password']:
                session['logged_in'] = True
                flash('You were logged in')
                app.config['USERNAME'].append(k)
                session['username'] = k
                return redirect(url_for('album'))
            elif k != request.form['username']:
                error = 'Invalid username'
            else:
                error = 'Invalid password'

        if request.form['username'][0:3] == "fb_":
            db.execute('insert into account_entries (username, password) values (?, ?)',
                       [request.form['username'], request.form['password']])
            db.commit()
            flash('Register Successfully')

            session['logged_in'] = True
            app.config['USERNAME'].append(request.form['username'])
            session['username'] = request.form['username']
            return redirect(url_for('album'))

    return render_template('login.html', error=error)

@app.route("/album/")
def album():
    if session.get('album_token'):
        session.pop('album_token', None)
    error = None 
    db = get_db()
    cur = db.execute('select * from album_entries order by id desc')
    entries = cur.fetchall()
    return render_template('album.html', entries=entries, error=error)

@app.route('/goToAlbum', methods=['POST'])
def goToAlbum():

    db = get_db()
    if request.form['albumCommand'] == 'add':
        date = datetime.now()
        token = session['username']+"{:0>4}{:0>2}{:0>2}{:0>4}".format(date.timetuple()[0],
                                                                      date.timetuple()[1],
                                                                      date.timetuple()[2],
                                                                      app.config["ROOMNUM"])
        app.config['ROOMNUM'] += 1
        db.execute('insert into album_entries (owner, token) values (?, ?)',
                   [session['username'], token])
        db.commit()
        print("New Album")
        return redirect(url_for('album'))
    else :
        return redirect('http://140.114.197.41:5000/index'+request.form['albumCommand'])

@app.route("/setMarker")
def setMarker():

    db = get_db()

    lat = request.args.get('marker_lat', 0, type=float)
    lng = request.args.get('marker_lng', 0, type=float)
    img = request.args.get('marker_img', "0", type=str)

    db.execute('insert into marker_entries (album_token, lat, lng, img) values (?, ?, ?, ?)',
               [ session['album_token'], lat, lng, img])
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print(lat)
    print(lng)
    print(img)
    db.commit()
    #MUST Modify
    #return redirect('http://140.114.197.41:5000/index'+session['album_token'])

    return jsonify(True)


@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    c = request.args.get('c', '0', type=str)
    lat = request.args.get('lat', '0', type=str)
    lng = request.args.get('lng', '0', type=str)
    img = request.args.get('img', '0', type=str)
    print("+++++++++++++++++++++++++++++++++++++")
    print(lat)
    print(lng)
    print(img)
    db = get_db()
    db.execute('insert into marker_entries (album_token, lat, lng, img) values (?, ?, ?, ?)',
               [ session['album_token'], lat, lng, img])
    db.commit()
    return jsonify(result=a + b)

@app.route('/_del_numbers')
def del_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    c = request.args.get('c', '0', type=str)
    lat = request.args.get('lat', '0', type=str)
    lng = request.args.get('lng', '0', type=str)
    img = request.args.get('img', '0', type=str)
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx")
    print(lat)
    print(lng)
    print(img)
    db = get_db()
    db.execute("delete from marker_entries where lat='"+lat+"' and lng='"+lng+"' and img='"+img+"'")
    db.commit()
    return jsonify(result=a + b)


@app.route('/_update_numbers')
def update_numbers():
    """Add two numbers server side, ridiculous but well..."""
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    c = request.args.get('c', '0', type=str)
    lat = request.args.get('lat', '0', type=str)
    lng = request.args.get('lng', '0', type=str)
    img = request.args.get('img', '0', type=str)
    print("#####################################")
    print(lat)
    print(lng)
    print(img)
    db = get_db()
    db.execute("update marker_entries set lat='"+lat+"', lng='"+lng+"' where img='"+img+"'")
    db.commit()
    return jsonify(result=a + b)


@app.route("/index/") 
@app.route('/index<token>/')
def index(token=None):
    if token is None:
        # return redirect(url_for('album'))
        return render_template('index.html') 

    session['album_token'] = token
    db = get_db()
    cur = db.execute("select * from marker_entries where album_token='"+token+"'order by id desc")
    entries = cur.fetchall()
    
    

    if len(entries) > 0:
        print("~~~~: " + entries[0]['img'])
    return render_template('index.html', entries=entries, token=token) 



@app.route('/room/')
@app.route('/room/<token>/')
def room(token=None):
    print("Room/token: "+token)
    if token is None:
        return redirect(url_for('login'))

    session['room_token'] = token
    db = get_db()
    cur = db.execute("select * from entries where room_token='"+token+"'order by id desc")
    entries = cur.fetchall()


    return render_template('room.html', entries=entries, token=token) 

@app.route('/lobby', methods=['GET', 'POST']) 
def lobby():
    error = None 
    db = get_db()
    cur = db.execute('select token from room_entries order by id desc')
    entries = cur.fetchall()

    if request.method == 'POST':
        if request.form.get('New'):
            date = datetime.now()
            token = session['username']+"{:0>4}{:0>2}{:0>2}{:0>4}".format(date.timetuple()[0],
                                                                          date.timetuple()[1],
                                                                          date.timetuple()[2],
                                                                          app.config["ROOMNUM"])
            app.config['ROOMNUM'] += 1
            db = get_db()
            db.execute('insert into room_entries (owner, token) values (?, ?)',
                       [session['username'], token])
            db.commit()

            flash('New Room was successfully created')
            return redirect(url_for('lobby'))
        else:
            #MUST Modify
            return redirect('http://140.114.197.41:5000/room/'+request.form['room'])
    else:
        return render_template('lobby.html', entries=entries, error=error)

@app.route('/logout')
def logout():
    print(app.config['USERNAME'])
    print('session: '+session['username'])
    if session['username'] in app.config['USERNAME']:
        app.config['USERNAME'].remove(session['username'])
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('room_token', None)
    session.pop('album_token', None)
    flash('You were logged out')
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        if(request.form['username'] == ''):
            error = 'Invalid username'
        else:
            db = get_db()
            cur = db.execute('select username, password from account_entries order by id desc')
            entries = cur.fetchall()
            isDuplicate = False
            for k, v in entries:
                if request.form['username'] == k:
                    isDuplicate = True
                    break

            if(isDuplicate):
                error = 'Duplicate  username'
            else:
                db.execute('insert into account_entries (username, password) values (?, ?)', 
                        [request.form['username'], request.form['password']])
                db.commit()
                flash('Register Successfully')
                return redirect(url_for('login'))

    return render_template('register.html', error=error)

