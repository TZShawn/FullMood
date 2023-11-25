from flask import Flask


@app.route('/')
def index():
    print("hello")