
type Route = `/${string}`
type Method = 'get' | 'post' | 'patch' | 'put' | 'delete'

type ExceptionResponse = {
    error: {
        type: string
        description: string
    }
}

export const BASE_URL = import.meta.env.VITE_API_URL || '';

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

async function call(route: Route, method: Method, data: unknown) {
    const input: RequestInfo = BASE_URL + route;
    const body: RequestInit['body'] =
        data !== null ? JSON.stringify(data) : null;

    const init: RequestInit = {
        body,
        headers: DEFAULT_HEADERS,
        method,
    };

    try {
        const response = await fetch(input, init);
        const json = await response.json();

        if (!response.ok) {
            throw json as ExceptionResponse;
        }

        return json;
    } catch (error: unknown) {
        if (
            error &&
            typeof error === 'object' &&
            'error' in error
        ) {
            return error as ExceptionResponse;
        }
        return {
            error: {
                type: 'CLIENT_ERROR',
                description:
                    error instanceof Error
                        ? error.message
                        : 'Erro inesperado',
            },
        };
    }
}

export const Request = {
    post: (route: Route, data: unknown) => call(route, 'post', data),
    put: (route: Route, data: unknown) => call(route, 'put', data),
    get: (route: Route) => call(route, 'get', null),
    delete: (route: Route) => call(route, 'delete', null),
};
