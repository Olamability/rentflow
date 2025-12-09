import { useAuthToken } from '@/contexts/AuthContext';

interface ApiRequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with timeout
 */
const fetchWithTimeout = (url: string, options: RequestInit, timeout: number): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ]);
};

/**
 * Make an API request with automatic retry logic and error handling
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    timeout = DEFAULT_TIMEOUT,
    headers = {},
    ...fetchOptions
  } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Get auth token
  let token: string | null = null;
  try {
    const stored = localStorage.getItem('rentflow_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      token = parsed.token;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          ...fetchOptions,
          headers: requestHeaders,
        },
        timeout
      );

      // Handle response
      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');

      let data: any;
      if (isJson) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        // Handle HTTP errors
        const errorMessage = data?.error?.message || data?.message || response.statusText;
        throw new ApiError(
          errorMessage,
          response.status,
          data?.error?.code,
          data?.error?.details
        );
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx) except 408, 429
      if (error instanceof ApiError) {
        const shouldRetry = 
          error.statusCode === 408 || // Request Timeout
          error.statusCode === 429 || // Too Many Requests
          (error.statusCode && error.statusCode >= 500); // Server errors

        if (!shouldRetry || attempt === retries) {
          return {
            success: false,
            error: {
              message: error.message,
              code: error.code,
              details: error.details,
            },
          };
        }
      }

      // Check if we should retry
      if (attempt < retries) {
        // Exponential backoff
        const delay = retryDelay * Math.pow(2, attempt);
        console.log(`Retrying request (${attempt + 1}/${retries}) after ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  // All retries failed
  return {
    success: false,
    error: {
      message: lastError?.message || 'Request failed after multiple retries',
      code: 'NETWORK_ERROR',
    },
  };
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T = any>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  patch: <T = any>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),

  upload: async <T = any>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
    options?: ApiRequestOptions
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      });
    }

    const { headers = {}, ...restOptions } = options || {};
    // Don't set Content-Type for FormData, browser will set it with boundary
    delete (headers as any)['Content-Type'];

    return apiRequest<T>(endpoint, {
      ...restOptions,
      method: 'POST',
      headers,
      body: formData,
    });
  },
};

/**
 * Hook for making API requests with React Query integration
 */
export const useApi = () => {
  const token = useAuthToken();

  return {
    get: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
      api.get<T>(endpoint, options),
    post: <T = any>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
      api.post<T>(endpoint, data, options),
    put: <T = any>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
      api.put<T>(endpoint, data, options),
    patch: <T = any>(endpoint: string, data?: any, options?: ApiRequestOptions) =>
      api.patch<T>(endpoint, data, options),
    delete: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
      api.delete<T>(endpoint, options),
    upload: <T = any>(
      endpoint: string,
      file: File,
      additionalData?: Record<string, any>,
      options?: ApiRequestOptions
    ) => api.upload<T>(endpoint, file, additionalData, options),
  };
};

export { ApiError };
export type { ApiResponse, ApiRequestOptions };
