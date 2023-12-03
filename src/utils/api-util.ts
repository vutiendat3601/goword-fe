interface PageResponse<T> {
  data: T;
  totalPage: number;
}
interface ErrorResponse {
  error: {
    code: string;
    status: string;
    timestamp: string;
    message: string;
  };
  formData?: object;
}

async function parseError(resp: Response) {
  const errJson = await resp.json();
  const err: ErrorResponse = {
    error: errJson,
  };
  return err;
}

export type { PageResponse, ErrorResponse };
export { parseError };
