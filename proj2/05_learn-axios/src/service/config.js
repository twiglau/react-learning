const devBaseUrl = "https://httpbin.org"
const prodBaseUrl = "https://production.org"


export const BASE_URL = process.env.NODE_ENV === 'development'? devBaseUrl:prodBaseUrl;
export const TIMEOUT = 5000;