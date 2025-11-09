from flask import Flask, render_template
from EmotionDetection.emotion_detection import emotion_detector

app = Flask('Emotion detection application')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/emotion_detector')
def emotion_detector_route():
    text_to_analyze = request.args.get('textToAnalyze')
    response = emotion_detector(text_to_analyze)

    if(response.status_code != 200) return { message: 'Something went wrong' }
    if(response['dominant_emotion'] == None) return { message: 'Invalid Text' }

    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)