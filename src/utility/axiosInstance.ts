type JsonResponse<T = unknown> = {
  ok?: boolean;
  json: <R = T>() => Promise<R>;
};

type BxUiHttpClient = {
  post: (url: string, options?: Record<string, unknown>) => JsonResponse;
};

let client: BxUiHttpClient | null = null;

export const configureBxUiHttpClient = (nextClient: BxUiHttpClient) => {
  client = nextClient;
};

export const pfNestInstance: BxUiHttpClient = {
  post(url, options) {
    if (!client) {
      throw new Error(
        "bx-ui-components: configureBxUiHttpClient must be called before using API-backed components."
      );
    }

    return client.post(url, options);
  }
};
