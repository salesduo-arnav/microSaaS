const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

type RequestOptions = RequestInit & {
    headers?: Record<string, string>;
};

class ApiClient {
    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${API_URL}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const config: RequestInit = {
            ...options,
            // vital for cookies to be sent/received cross-origin (or even same-origin with specific configs)
            // and identifying the session.
            credentials: 'include',
            headers,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            // Try to parse error message from JSON, fallback to status text
            let errorMessage = response.statusText;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
                // response was not JSON
            }
            throw new Error(errorMessage);
        }

        // Some endpoints might not return content (e.g. 204)
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    get<T>(endpoint: string, options: RequestOptions = {}) {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    post<T>(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    put<T>(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    delete<T>(endpoint: string, options: RequestOptions = {}) {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

export const api = new ApiClient();
