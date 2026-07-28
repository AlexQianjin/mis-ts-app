export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
