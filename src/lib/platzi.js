/**
 * Data layer for the Platzi Fake Store API (FakeAPI Platzi).
 * Docs: https://fakeapi.platzi.com/en/rest/products/ and /users/
 * Base URL: https://api.escuelajs.co/api/v1
 */
import { http } from "./http";

export const PLATZI_BASE = "https://api.escuelajs.co/api/v1";

async function request(path, { method = "GET", data, headers } = {}) {
  const res = await http.request({
    baseURL: PLATZI_BASE,
    url: path,
    method,
    data,
    headers: { "Content-Type": "application/json", ...(headers ?? {}) },
  });
  if (res.status < 200 || res.status >= 300) {
    const body = typeof res.data === "string" ? res.data : "";
    throw new Error(`FakeAPI ${res.status}: ${body.slice(0, 180) || res.statusText}`);
  }
  if (res.status === 204) return undefined;
  return JSON.parse(res.data);
}

/** Some API records carry broken placeholder image URLs; normalise them. */
export function firstImage(images, fallback) {
  const raw = images?.[0] ?? "";
  const cleaned = raw
    .replace(/^\["?|"?\]$/g, "")
    .replace(/^"|"$/g, "")
    .trim();
  if (!cleaned.startsWith("http")) return fallback;
  return cleaned;
}

/* ---------------------------------- products --------------------------------- */

export const listProducts = (limit = 40) => request(`/products?offset=0&limit=${limit}`);

export const listCategories = () => request(`/categories?limit=12`);

export const createProduct = (input) => request(`/products/`, { method: "POST", data: input });

export const updateProduct = (id, input) => request(`/products/${id}`, { method: "PUT", data: input });

export const deleteProduct = (id) => request(`/products/${id}`, { method: "DELETE" });

/* ----------------------------------- users ----------------------------------- */

export const listUsers = (limit = 20) => request(`/users?limit=${limit}`);

export const createUser = (input) =>
  request(`/users/`, { method: "POST", body: JSON.stringify(input) });

export const updateUser = (id, input) =>
  request(`/users/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const deleteUser = (id) => request(`/users/${id}`, { method: "DELETE" });

/**
 * The public demo dataset is polluted with test records (titles like
 * "title-7d27dc8c-…", placeholder images). Keep only presentable wares.
 */
export function isPresentable(p) {
  const t = (p.title ?? "").trim();
  if (t.length < 3) return false;
  if (/^(title|string|product|new product|test)\b/i.test(t)) return false;
  if (/[0-9a-f]{8}-[0-9a-f]{4}/i.test(t)) return false;
  if (!p.price || p.price <= 0) return false;
  const img = p.images?.[0] ?? "";
  if (!/^\[?"?https?:\/\//.test(img)) return false;
  if (/placeimg|example\.com|placeholder/i.test(img)) return false;
  return true;
}
