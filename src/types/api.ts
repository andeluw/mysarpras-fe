export type ApiResponse<T> = {
  code: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  links: {
    first: string;
    last: null;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page: number;
    per_page: number;
    from?: number;
    to?: number;
  };
}
