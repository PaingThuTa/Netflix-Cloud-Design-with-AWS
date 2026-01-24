const STORAGE_KEY = 'auflx_device_id';

const createDeviceId = () => {
  const hex = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const getDeviceId = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const next = createDeviceId();
  localStorage.setItem(STORAGE_KEY, next);
  // Persist once so all API calls can attach a stable deviceId.
  return next;
};
