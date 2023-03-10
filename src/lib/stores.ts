import { writable } from "svelte/store";

export const showModal = writable<boolean>(false);

export const authMode = writable<'sign_in' | 'sign_up' | 'forgot'>('sign_in');

export const returnPath = writable<string | null>(null);

export const bumper = writable<number>(1);