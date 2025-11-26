import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(value: number | string | null | undefined) {
  const v = Number(value ?? 0);
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(date?: string | Date | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("pt-BR");
}

export function slugify(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function randomId(prefix = "") {
  return `${prefix}${Math.random().toString(36).substring(2, 10)}`;
}

export const isBrowser = typeof window !== "undefined";

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function safeJSON<T = any>(value?: string | null): T | null {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number
) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<F extends (...args: any[]) => void>(
  func: F,
  limit: number
) {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

export function maskCPF(cpf: string) {
  return cpf
    ?.replace(/\D/g, "")
    ?.replace(/(\d{3})(\d)/, "$1.$2")
    ?.replace(/(\d{3})(\d)/, "$1.$2")
    ?.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(phone: string) {
  phone = phone.replace(/\D/g, "");
  if (phone.length <= 10)
    return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}
