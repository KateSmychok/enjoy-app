class HttpStatusError extends Error {
  name = 'HttpStatusError';

  constructor(
    public status: number,
    public statusText: string,
    public endpoint: string,
  ) {
    super();
  }

  toString() {
    return `Received status code ${this.status} from ${this.endpoint} with message ${this.statusText}`;
  }
}

function isHttpStatusError(error: Error): error is HttpStatusError {
  return error && error.name === 'HttpStatusError';
}

class FetchError extends Error {
  name = 'FetchError';

  constructor(public innerError: Error) {
    super();
  }

  toString() {
    return `Fetch failed with error ${this.innerError.toString()}`;
  }
}

function isFetchError(error: Error): error is FetchError {
  return error && error.name === 'FetchError';
}

class RequestCancelledError extends Error {
  name = 'RequestCancelledError';
}

function isModuleLoadError(error: Error): boolean {
  return error && error.name === 'ChunkLoadError';
}

function isRequestCancelledError(error: Error): boolean {
  return error && error.name === 'RosterRequestCancelledError';
}

function isRetryableError(error: Error) {
  return isFetchError(error) || isModuleLoadError(error);
}

export {
  HttpStatusError,
  isHttpStatusError,
  FetchError,
  isFetchError,
  isModuleLoadError,
  RequestCancelledError,
  isRequestCancelledError,
  isRetryableError,
};
