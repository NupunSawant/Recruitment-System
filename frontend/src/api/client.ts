import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private clearAuthStorage() {
    sessionStorage.removeItem("hrms_authenticated");
    sessionStorage.removeItem("hrms_user_role");
    sessionStorage.removeItem("hrms_access_token");
    sessionStorage.removeItem("hrms_user");
  }

  private async refreshAccessToken(): Promise<string | null> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.REFRESH}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok || !data?.success || !data?.data?.accessToken) {
          this.clearAuthStorage();
          return null;
        }

        const newAccessToken = data.data.accessToken as string;
        sessionStorage.setItem("hrms_access_token", newAccessToken);
        return newAccessToken;
      } catch {
        this.clearAuthStorage();
        return null;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retry = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const accessToken = sessionStorage.getItem("hrms_access_token");

    const response = await fetch(url, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(options.headers || {}),
      },
    });

    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (response.status === 401 && retry) {
      const newAccessToken = await this.refreshAccessToken();

      if (newAccessToken) {
        return this.request<T>(endpoint, options, false);
      }
    }

    if (!response.ok) {
      throw new Error(responseData?.message || `API Error: ${response.status}`);
    }

    return responseData as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);