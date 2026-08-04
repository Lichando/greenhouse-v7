export const logger = {
  log: (message: string, data?: unknown) => {
    console.log(`[LOG] ${message}`, data ?? '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ?? '');
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data ?? '');
  },
  info: (message: string, data?: unknown) => {
    console.info(`[INFO] ${message}`, data ?? '');
  },
};
