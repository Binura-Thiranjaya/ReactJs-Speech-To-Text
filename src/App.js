import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import React, { useState } from "react";

function App() {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Transcript</h5>
          <div className="card-body">
            <textarea
              value={transcript}
              className="text-area form-control"
              onChange={(event) => setTextToCopy(event.target.value)}
              placeholder="Start Speaking..."
              rows="5"
            />
          </div>
        </div>
        <div className="card-footer">
        <div className="row gx-5 text-center">
              <div className="col">
                <button onClick={setCopied} className="btn btn-info">
                  {isCopied ? "Copied!" : "Copy to clipboard"}
                </button>
              </div>
              <div className="col">
                <button
                  onClick={startListening}
                  className="btn btn-primary"
                >
                  Start Listening
                </button>
              </div>
              <div className="col">
                <button
                  onClick={SpeechRecognition.stopListening}
                  className="btn btn-danger"
                >
                  Stop Listening
                </button>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
