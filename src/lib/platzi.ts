/**
 * Data layer for the Platzi Fake Store API (FakeAPI Platzi).
 * Docs: https://fakeapi.platzi.com/en/rest/products/ and /users/
 * Base URL: https://api.escuelajs.co/api/v1
 */

export const PLATZI_BASE = "https://api.escuelajs.co/api/v1";

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: "customer" | "admin" | string;
  avatar: string;
}

export interface ProductInput {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${PLATZI_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`FakeAPI ${res.status}: ${body.slice(0, 180) || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/** Some API records carry broken placeholder image URLs; normalise them. */
export function firstImage(images: string[] | undefined, fallback: string): string {
  const raw = images?.[0] ?? "";
  const cleaned = raw.replace(/^\["?|"?\]$/g, "").replace(/^"|"$/g, "").trim();
  if (!cleaned.startsWith("http")) return fallback;
  return cleaned;
}

/* ---------------------------------- products --------------------------------- */

export const listProducts = (limit = 40) =>
  request<Product[]>(`/products?offset=0&limit=${limit}`);

export const listCategories = () => request<Category[]>(`/categories?limit=12`);

export const createProduct = (input: ProductInput) =>
  request<Product>(`/products/`, { method: "POST", body: JSON.stringify(input) });

export const updateProduct = (id: number, input: Partial<ProductInput>) =>
  request<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const deleteProduct = (id: number) =>
  request<boolean>(`/products/${id}`, { method: "DELETE" });

/* ----------------------------------- users ----------------------------------- */

export const listUsers = (limit = 20) => request<User[]>(`/users?limit=${limit}`);

export const createUser = (input: UserInput) =>
  request<User>(`/users/`, { method: "POST", body: JSON.stringify(input) });

export const updateUser = (id: number, input: Partial<UserInput>) =>
  request<User>(`/users/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const deleteUser = (id: number) =>
  request<boolean>(`/users/${id}`, { method: "DELETE" });

/**
 * The public demo dataset is polluted with test records (titles like
 * "title-7d27dc8c-…", placeholder images). Keep only presentable wares.
 */
export function isPresentable(p: Product): boolean {
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
