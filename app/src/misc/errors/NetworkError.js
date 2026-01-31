class NetworkError extends Error {
  constructor(type, message, options = {}) {
    super(message);
    this.type = type;
    this.stack = options?.stack;
    this.status = options?.status;
    this.originalError = options?.originalError;
  }
}

function toNetworkError(error) {
  if(!error)
    return new NetworkError(
      'UNKNOWN',
      'Undefined network error'
    );

  if(!error.response) {
    if(navigator.onLine) {
      return new NetworkError(
        'NETWORK_OFFLINE',
        'You appear to be offline',
        { originalError: error }
      );
    }

    if (error.code === 'ECONNABORTED') {
      return new NetworkError(
        'NETWORK_TIMEOUT',
        'Request timed out',
        { originalError: error }
      );
    }

    return new NetworkError(
      'NETWORK_ERROR',
      'Network error occured',
      { originalError: error }
    );
  }

  const status = error.status;

  switch (status) {
    case 401:
      return new NetworkError(
        'UNAUTHORIZED',
        'Authentication required',
        { status, originalError: error }
      )

    case 403:
      return new NetworkError(
        'FORBIDDEN',
        'You are not allowed to perform this action',
        { status, originalError: error }
      )

    case 404:
      return new NetworkError(
        'NOT_FOUND',
        'Requested resource not found' + (error?.requestedURL ? `: ${error.requestedURL}` : ''),
        { status, originalError: error, }
      )

    case 422:
      return new NetworkError(
        'VALIDATION_ERROR',
        'Validation failed',
        { status, originalError: error }
      )

    default:
      if (status >= 500) {
        return new NetworkError(
          'SERVER_ERROR',
          'Server error occurred',
          { status, originalError: error }
        )
      }

      return new NetworkError(
        'UNKNOWN_ERROR',
        'Unexpected error occurred',
        { status, originalError: error }
      )
  }
}

export default toNetworkError;