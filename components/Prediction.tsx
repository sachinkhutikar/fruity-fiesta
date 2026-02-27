import React, { useState, useRef, useEffect } from 'react';
import { PredictionResult, ServerLog } from '../types';
import { postInferenceRequest } from '../apiService';

/* ---------------- PROGRESS BAR ---------------- */

const ProgressBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700 font-mono">% {label}</span>
      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 rounded">
        {value?.toFixed(1)}%
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className="h-4 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${Math.min(value || 0, 100)}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

/* ---------------- TERMINAL ---------------- */

const Terminal: React.FC<{ logs: ServerLog[] }> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  return (
    <div className="bg-black text-green-400 font-mono text-[10px] md:text-xs p-4 rounded-lg h-48 overflow-y-auto mt-6 border-t-4 border-gray-800 shadow-2xl">
      <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-1">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="ml-2 text-gray-600">fruit-fiesta-engine ~ logs</span>
      </div>
      {logs.map((log, i) => (
        <div key={i} className="mb-1 leading-tight">
          <span className="text-gray-600">[{log.timestamp}]</span>{' '}
          <span className={
            log.type === 'error' ? 'text-red-500' :
            log.type === 'success' ? 'text-green-400' :
            log.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
          }>
            {log.type.toUpperCase()}:
          </span>{' '}
          {log.message}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export const Prediction: React.FC = () => {

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<ServerLog[]>([]);
  const [cameraOn, setCameraOn] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addLog = (log: ServerLog) => setLogs(prev => [...prev, log]);

  /* ---------------- FILE UPLOAD ---------------- */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setFileName(selectedFile.name);
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2) + " MB");
      setResult(null);
      setError(null);
      setLogs([]);
    };
    reader.readAsDataURL(selectedFile);
  };

  /* ---------------- CAMERA ---------------- */

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch {
      alert("Camera access denied");
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setPreview(imageData);
    setFileName("captured-image.png");
    setFileSize("Live Capture");

    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    setCameraOn(false);
  };

  /* ---------------- PREDICT ---------------- */

  const handlePredict = async () => {
    if (!preview) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setLogs([]);

    try {
      const prediction = await postInferenceRequest(preview, addLog);
      setResult(prediction);
    } catch {
      setError("Prediction failed. Ensure server is running.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Model Prediction</h1>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* LEFT PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col min-h-[600px]">

          <div className="flex-grow">

            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center py-20 text-gray-300">
                <i className="fas fa-microchip text-8xl mb-6 opacity-10"></i>
                <p className="text-xl font-medium">Awaiting Input Data...</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <p className="mt-6 text-gray-500 font-medium">Analyzing Fruit...</p>
              </div>
            )}

            {result && (
              <div className="space-y-8">

                <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                  <div className="text-sm font-bold text-gray-500">FINAL RESULT</div>
                  <div className="text-2xl font-black text-gray-900">
                    {result.qualityLabel} {result.detectedLabel}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Confidence: {result.confidence?.toFixed(1)}%
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Fruit Classification</h3>
                  <ProgressBar label="Apple" value={result.classification.apple} color="#ef4444" />
                  <ProgressBar label="Banana" value={result.classification.banana} color="#facc15" />
                  <ProgressBar label="Orange" value={result.classification.orange} color="#f97316" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Quality Classification</h3>
                  <ProgressBar label="Fresh" value={result.quality.fresh} color="#22c55e" />
                 <ProgressBar label="Rotten" value={result.quality.rotten} color="#64748b" />
                </div>

              </div>
            )}
          </div>

          <Terminal logs={logs} />
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 aspect-video flex items-center justify-center cursor-pointer hover:border-blue-400"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
            ) : (
              <p className="text-gray-500 text-sm">Click to Upload Fruit Image</p>
            )}
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

          {/* File Info */}
          {fileName && (
            <div className="text-xs text-gray-500">
              <div>File: {fileName}</div>
              <div>Size: {fileSize}</div>
            </div>
          )}

          {/* Camera Button */}
          <button
            onClick={startCamera}
            className="w-full py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            📷 Open Camera
          </button>

          {cameraOn && (
            <div>
              <video ref={videoRef} autoPlay className="w-full rounded-xl" />
              <button
                onClick={captureImage}
                className="mt-2 w-full py-2 bg-blue-600 text-white rounded-xl"
              >
                Capture
              </button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          <button
            onClick={handlePredict}
            disabled={!preview || loading}
            className="w-full py-4 rounded-2xl font-bold bg-black text-white hover:scale-[1.02] transition"
          >
            {loading ? "Processing..." : "RUN ANALYTICS"}
          </button>

          {error && <div className="text-red-500 text-sm">{error}</div>}

        </div>
      </div>
    </div>
  );
};