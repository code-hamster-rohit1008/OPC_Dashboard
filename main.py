from flask import Flask, render_template, request, redirect

app = Flask(__name__)

def check_tokens_availability():
    if not request.cookies.get('accessToken') or not request.cookies.get('refreshToken'):
        return False
    return True

@app.route('/')
def index():
    if check_tokens_availability():
        return render_template('index.html')
    else:
        return redirect('https://www.theowncollab.com/index.html')

@app.route('/dashboard')
def dashboard():
    if check_tokens_availability():
        return render_template('dashboard.html')
    else:
        return redirect('https://www.theowncollab.com/index.html')