import { useCallback, useEffect, useState } from "react";

// Small localStorage-backed store with a subscribe/notify layer so multiple
// components/pages stay in sync. Ready to be swapped for Lovable Cloud tables
// later — every hook returns the same shape.

type Listener = () => void;
const listeners = new Map<string, Set<Listener>>();

function emit(key: string) {
  listeners.get(key)?.forEach((l) => l());
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  emit(key);
}

function useLocal<T>(key: string, fallback: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(fallback);

  // Hydrate after mount to avoid SSR mismatch.
  useEffect(() => {
    setValue(readJSON<T>(key, fallback));
    const l: Listener = () => setValue(readJSON<T>(key, fallback));
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) l();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.get(key)?.delete(l);
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        writeJSON(key, next);
        return next;
      });
    },
    [key],
  );

  return [value, update];
}

// -------- Saved --------
const SAVED_KEY = "cn-saved";
export function useSaved() {
  const [ids, setIds] = useLocal<string[]>(SAVED_KEY, []);
  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  );
  return { ids, isSaved, toggle };
}

// -------- Applications --------
export type AppStatus = "applied" | "interviewing" | "offer" | "rejected";
export type Application = {
  id: string;
  opportunityId: string;
  status: AppStatus;
  appliedAt: string; // ISO
  note?: string;
};
const APPS_KEY = "cn-applications";
export function useApplications() {
  const [apps, setApps] = useLocal<Application[]>(APPS_KEY, []);
  const record = useCallback(
    (opportunityId: string) =>
      setApps((prev) => {
        if (prev.some((a) => a.opportunityId === opportunityId)) return prev;
        return [
          ...prev,
          {
            id: `${opportunityId}-${Date.now()}`,
            opportunityId,
            status: "applied",
            appliedAt: new Date().toISOString(),
          },
        ];
      }),
    [setApps],
  );
  const setStatus = useCallback(
    (id: string, status: AppStatus) =>
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a))),
    [setApps],
  );
  const remove = useCallback(
    (id: string) => setApps((prev) => prev.filter((a) => a.id !== id)),
    [setApps],
  );
  const hasApplied = useCallback(
    (opportunityId: string) => apps.some((a) => a.opportunityId === opportunityId),
    [apps],
  );
  return { apps, record, setStatus, remove, hasApplied };
}

// -------- Profile --------
export type Profile = {
  name: string;
  email: string;
  education: string;
  skills: string;
  experience: string;
  resumeName?: string;
  photoDataUrl?: string;
  location?: string;
};
const PROFILE_KEY = "cn-profile";
const DEFAULT_PROFILE: Profile = {
  name: "Alex Kimani",
  email: "alex@careernova.ai",
  education: "BSc Computer Science",
  skills: "React, Python, SQL",
  experience: "1 internship, freelance projects",
  location: "Nairobi",
};
export function useProfile() {
  return useLocal<Profile>(PROFILE_KEY, DEFAULT_PROFILE);
}

// -------- Settings --------
export type Settings = {
  language: "English" | "French" | "Spanish" | "Swahili";
  notifications: { jobAlerts: boolean; weeklyDigest: boolean; deadlines: boolean };
  privacy: { profilePublic: boolean; analytics: boolean };
};
const SETTINGS_KEY = "cn-settings";
const DEFAULT_SETTINGS: Settings = {
  language: "English",
  notifications: { jobAlerts: true, weeklyDigest: true, deadlines: true },
  privacy: { profilePublic: false, analytics: true },
};
export function useSettings() {
  return useLocal<Settings>(SETTINGS_KEY, DEFAULT_SETTINGS);
}

// -------- Notifications --------
export type Notification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};
const NOTIF_KEY = "cn-notifications";
const SEED_NOTIFS: Notification[] = [
  { id: "n1", title: "Welcome to CareerNova AI ✨", body: "Explore Jobs, Scholarships, and ask the AI Assistant anything.", createdAt: new Date().toISOString(), read: false },
  { id: "n2", title: "New scholarships this week", body: "Chevening and DAAD deadlines are approaching.", createdAt: new Date(Date.now() - 86400000).toISOString(), read: false },
];
export function useNotifications() {
  const [items, setItems] = useLocal<Notification[]>(NOTIF_KEY, SEED_NOTIFS);
  const markAllRead = useCallback(
    () => setItems((prev) => prev.map((n) => ({ ...n, read: true }))),
    [setItems],
  );
  const markRead = useCallback(
    (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
    [setItems],
  );
  const clear = useCallback(() => setItems([]), [setItems]);
  const unread = items.filter((n) => !n.read).length;
  return { items, unread, markRead, markAllRead, clear };
}
