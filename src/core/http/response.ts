import { isAppError } from '@/src/core/errors';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message: string | null;
  errors?: string[];
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || null,
  };
}

export function createdResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || 'Resource created successfully',
  };
}

export function errorResponse(
  message: string,
  errors?: string[]
): ApiResponse {
  return {
    success: false,
    data: null,
    message,
    errors,
  };
}

export function handleApiError(error: unknown): {
  response: ApiResponse;
  statusCode: number;
} {
  if (isAppError(error)) {
    return {
      response: errorResponse(error.message, error.errors),
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      response: errorResponse(error.message),
      statusCode: 500,
    };
  }

  return {
    response: errorResponse('An unexpected error occurred'),
    statusCode: 500,
  };
}
