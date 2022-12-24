import { writable } from "svelte/store";

export const showModal = writable<boolean>(false);

export const authMode = writable<'sign_in' | 'sign_up' | 'forgot'>('sign_in');