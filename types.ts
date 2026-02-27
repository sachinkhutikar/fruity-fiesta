export interface FruitClassification {
  apple: number;
  banana: number;
  orange: number;
}

export interface QualityAnalysis {
  fresh: number;
  rotten: number;
}

export interface PredictionResult {
  classification: FruitClassification;
  quality: QualityAnalysis;
  detectedLabel: string;
  qualityLabel: string;
  metadata: {
    processingTimeMs: number;
    serverId: string;
    timestamp: string;
    connectionMode: 'LOCAL SERVER' | 'SIMULATED BROWSER';
  };
}

export interface ServerLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}
export type ViewState = 'login' | 'home' | 'about' | 'prediction';