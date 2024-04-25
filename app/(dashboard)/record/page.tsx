"use client";

import { useEffect, useState } from "react";

export default function RecordPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [title, setTitle] = useState("Record your voice note");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  async function startRecording() {
    setIsRunning(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    let audioChunks: any = [];

    recorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);

      setAudioUrl(url);
    };
    setMediaRecorder(recorder as any);
    recorder.start();
  }

  function stopRecording() {
    // @ts-ignore
    mediaRecorder.stop();
    setIsRunning(false);
  }

  const handleRecordClick = () => {
    if (title === "Record your voice note") {
      setTitle("Recording...");
      startRecording();
    } else if (title === "Recording...") {
      setTitle("Processing...");
      stopRecording();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {title}
      {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
      <button onClick={handleRecordClick}>
        {!isRunning ? "Start Recording" : "Stop Recording"}
      </button>
      {formatTime(Math.floor(totalSeconds / 60))}:
      {formatTime(totalSeconds % 60)}
    </div>
  );
}
