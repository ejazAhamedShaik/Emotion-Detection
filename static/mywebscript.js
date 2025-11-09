// let RunSentimentAnalysis = ()=>{
//     textToAnalyze = document.getElementById("textToAnalyze").value;

//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("system_response").innerHTML = xhttp.responseText;
//         }
//     };
//     xhttp.open("GET", "emotionDetector?textToAnalyze"+"="+textToAnalyze, true);
//     xhttp.send();
// }

async function RunSentimentAnalysis() {
  const inputEl = document.getElementById('textToAnalyze');
  const outputEl = document.getElementById('system_response');
  const text = (inputEl.value || '').trim();

  // Clear previous result
  outputEl.textContent = '';

  if (!text) {
    outputEl.textContent = 'Please enter some text to analyze.';
    return;
  }

  try {
    const url = `/emotion_detector?textToAnalyze=${encodeURIComponent(text)}`;
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      outputEl.textContent = err.error || `Request failed with status ${res.status}`;
      return;
    }

    const data = await res.json();

    // If the server included display_text, prefer to show that
    if (data.display_text) {
      outputEl.textContent = data.display_text;
      return;
    }

    // Fallback: format it here if display_text wasn't sent
    const formatted = `For the given statement, the system response is 'anger': ${data.anger}, ` +
                      `'disgust': ${data.disgust}, 'fear': ${data.fear}, ` +
                      `'joy': ${data.joy} and 'sadness': ${data.sadness}. ` +
                      `The dominant emotion is ${data.dominant_emotion}.`;
    outputEl.textContent = formatted;

  } catch (e) {
    outputEl.textContent = `Something went wrong: ${e}`;
  }
}
