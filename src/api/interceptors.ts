import type { AxiosInstance, AxiosResponse } from "sdzm-axios";
export const enum ErrNo {
  Success = 0,
  Fail = 1000,
  TokenError = 1001
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
    // config.headers['Content-Type'] = 'multipart/form-data';
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
  const message = data?.msg ?? "请求错误！";
  switch (data.code) {
    case ErrNo.Success:
      return data;
    case ErrNo.TokenError:
      throw new Error(message);
    case ErrNo.Fail:
      throw new Error(message);
    default:
      throw new Error(message);
  }
}

export interface ResponseData<T = any> {
  data: T;
  code: number;
  msg: string;
}
