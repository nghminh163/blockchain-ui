import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();

export const URL_SERVER = config.BACKEND_URI || "";
export const RATE_UCOIN = 1.5;
export const ROW_PER_PAGE = 10;
