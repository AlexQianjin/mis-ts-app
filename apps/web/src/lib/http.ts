import { ApiClient } from '@repo/api-client';

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim() || '/api';

export const api = new ApiClient(apiBaseUrl);
