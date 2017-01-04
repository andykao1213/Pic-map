from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/") 
def login():
    return render_template('login.html')
@app.route("/index/") 
def index():
    return render_template('index.html')

#@app.route('/success/')
#def ok():
 #   return render_template('success.html')

#Default value of name is None (null)
if __name__ == '__main__':
    app.run(host='0.0.0', debug=True, port=5000)
