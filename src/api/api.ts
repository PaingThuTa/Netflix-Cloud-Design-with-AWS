import { API_BASE_URL } from '../config.js';
import { getDeviceId } from '../utils/device.js';

const buildUrl = (path, query) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
};

const request = async (path, { method = 'GET', query, body } = {}) => {
  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) return null;
  return response.json();
};

export const getCatalog = async () => request('/api/catalog');

export const getCatalogItem = async (id) => request(`/api/catalog/${id}`);

export const saveHistory = async ({ videoId, progressSeconds }) =>
  request('/api/user/history', {
    method: 'POST',
    body: {
      deviceId: getDeviceId(),
      videoId,
      progressSeconds,
    },
  });

export const getHistory = async () =>
  request('/api/user/history', {
    query: {
      deviceId: getDeviceId(),
    },
  });
