class NetworkError extends Error {
  constructor(type, message, options = {}) {
    super(message);
    this.type = type;
    this.stack = options?.stack;
    this.status = options?.status;
    this.redirectToNotFound = options?.redirectToNotFound;
    this.originalError = options?.originalError;
  }
}

function toNetworkError(error) {

  const options = { originalError: error };

  if(!error)
    return new NetworkError(
      'UNKNOWN',
      'Undefined network error'
    );

  if(!error.response) {
    if(!navigator.onLine) {
      return new NetworkError(
        'NETWORK_OFFLINE',
        'You appear to be offline',
        options
      );
    }

    if (error.code === 'ECONNABORTED') {
      return new NetworkError(
        'NETWORK_TIMEOUT',
        'Request timed out',
        options
      );
    }

    return new NetworkError(
      'NETWORK_ERROR',
      'Network error occured',
      options
    );
  }

  const status   = error.status;
  options.status = error.status;

  switch (status) {
    case 401:
      return new NetworkError(
        'UNAUTHORIZED',
        'Authentication required',
        options
      )

    case 403:
      return new NetworkError(
        'FORBIDDEN',
        'You are not allowed to perform this action',
        options
      )

    case 404:
      options.redirectToNotFound = error.redirectToNotFound ?? false;

      return new NetworkError(
        'NOT_FOUND',
        'Requested resource not found' + (error?.requestedURL ? `: ${error.requestedURL}` : ''),
        options
      );

    case 422:
      return new NetworkError(
        'VALIDATION_ERROR',
        'Validation failed',
        options
      )
    
    case 500:
      return new NetworkError(
        'SERVER_ERROR',
        'Server error! Please try again later.',
        options
      )

    default:
      if (status >= 500) {
        return new NetworkError(
          'SERVER_ERROR',
          'Server error occurred',
          options
        )
      }

      return new NetworkError(
        'UNKNOWN_ERROR',
        'Unexpected error occurred',
        options
      )
  }
}

export default toNetworkError;