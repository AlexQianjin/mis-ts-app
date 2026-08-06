import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import type { ApiError, CurrentUserResponse, HealthResponse } from '@repo/shared-types';

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError | undefined,
    message?: string
  ) {
    super(body?.message ?? message ?? `API request failed with status ${status}`);
    this.name = 'ApiClientError';
  }
}

export class ApiClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl = '/api', client?: AxiosInstance) {
    this.client =
      client ??
      axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  health(): Promise<HealthResponse> {
    return this.request<HealthResponse>({
      method: 'GET',
      url: '/health'
    });
  }

  me(): Promise<CurrentUserResponse> {
    return this.request<CurrentUserResponse>({
      method: 'GET',
      url: '/me'
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        throw new ApiClientError(error.response?.status ?? 0, error.response?.data, error.message);
      }

      throw error;
    }
  }
}
