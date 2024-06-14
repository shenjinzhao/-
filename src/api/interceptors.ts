import type { AxiosInstance, AxiosResponse } from "sdzm-axios";
export const enum ErrNo {
  Success,
  LoginFailed = 1003,
  NoAuth,
  NoDalleAuth = 10000801,
}
export const serviceInterceptors = (service: AxiosInstance) => {
  service.interceptors.request.use((config) => {
    switch (config.method) {
      case "get":
        config.params = { ...config.params };
        break;
      case "post":
        config.data = { ...config.data };
    }
    return config;
  });
  service.interceptors.response.use(errorHandle, (error) => {
    const message =
      error?.response?.statusText ?? ~error?.message?.search("timeout")
        ? "请求超时，请检查网络状况或重试"
        : "请求失败，请检查网络状况或重试";
    // 手动取消
    if (error.code !== "ERR_CANCELED") {
      // ElMessage.error({ message, grouping: true })
    }
    throw new Error(message);
  });
};

function errorHandle(response: AxiosResponse) {
  const data = response?.data;
  const message = data?.errMsg ?? "请求错误！";
  switch (data.errNo) {
    case ErrNo.Success:
      return data.data;
    case ErrNo.LoginFailed:
      window.location.href = data.data.loginUrl;
      return new Promise(() => {});
    case ErrNo.NoAuth:
      return response;
    case ErrNo.NoDalleAuth:
    default:
      throw new Error(message);
  }
}

export interface ResponseData<T = any> {
  data: T;
  errNo: string;
  errMsg: string;
}
