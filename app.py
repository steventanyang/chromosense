from os import path
from pathlib import Path

from flask import Flask, render_template
from flask_frozen import Freezer


template_folder = path.abspath('./wiki')

app = Flask(__name__, template_folder=template_folder)
#app.config['FREEZER_BASE_URL'] = environ.get('CI_PAGES_URL')
app.config['FREEZER_DESTINATION'] = 'public'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
freezer = Freezer(app)

@app.cli.command()
def freeze():
    freezer.freeze()

@app.cli.command()
def serve():
    freezer.run()

@app.route('/')
def home():
    return render_template('pages/home.html')

#Project dropdown

@app.route('/description')
def description():
    return render_template('pages/description.html')

@app.route('/contribution')
def contribution():
    return render_template('pages/contribution.html')

@app.route('/engineering')
def engineering():
    return render_template('pages/engineering.html')


#Wet Lab dropdown

@app.route('/experiments')
def experiments():
    return render_template('pages/experiments.html')

@app.route('/notebook')
def notebook():
    return render_template('pages/notebook.html')

@app.route('/results')
def results():
    return render_template('pages/results.html')


#Dry Lab dropdown

@app.route('/model')
def model():
    return render_template('pages/model.html')


#Team dropdown

@app.route('/team')
def team():
    return render_template('pages/team.html')

@app.route('/attributions')
def attributions():
    return render_template('pages/attributions.html')


#Human Practices Dropdown

@app.route('/human-practices')
def humanpractices():
    return render_template('pages/human-practices.html')

@app.route('/inclusivity')
def inclusivity():
    return render_template('pages/inclusivity.html')

@app.route('/education')
def education():
    return render_template('pages/education.html')

@app.route('/safety')
def safety():
    return render_template('pages/safety.html')


@app.route('/<page>')
def pages(page):
    return render_template(str(Path('pages')) + '/' + page.lower() + '.html')

# Main Function, Runs at http://0.0.0.0:8080
if __name__ == "__main__":
    app.run(port=8080)
