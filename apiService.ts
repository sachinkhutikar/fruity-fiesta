import { PredictionResult, ServerLog } from "./types";
import { runInference } from "./inference";

const LOCAL_SERVER_URL = "http://localhost:5000/api/classify";

export const postInferenceRequest = async (
  base64Image: string, 
  onLog: (log: ServerLog) => void
): Promise<PredictionResult> => {
  const createLog = (message: string, type: ServerLog['type'] = 'info') => {
    onLog({ timestamp: new Date().toLocaleTimeString(), message, type });
  };

  createLog("Request initialized...", "info");

  try {
    // 1. Try to hit the REAL Node.js Server first
    createLog("Attempting to connect to Local Node.js Server...", "info");
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout for server check

    const response = await fetch(LOCAL_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      createLog("Connected to REAL Backend Server successfully!", "success");
      return result;
    }
    
    throw new Error("Server reachable but returned an error status.");

  } catch (error) {
    // 2. Fallback to Browser Simulation if Server is offline
    createLog("Local server offline or unreachable. Falling back to Browser Simulation...", "warning");
    
    try {
      const result = await runInference(base64Image);
      const enrichedResult: PredictionResult = {
        ...result,
        metadata: {
          ...result.metadata,
          connectionMode: 'SIMULATED BROWSER'
        }
      };
      createLog("Simulation successful.", "success");
      return enrichedResult;
    } catch (simError) {
      createLog("Critical Failure: Simulation also failed. Check API Key.", "error");
      throw simError;
    }
  }
};