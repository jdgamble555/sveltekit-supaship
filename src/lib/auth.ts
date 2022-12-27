import { page } from "$app/stores";
import { get } from "svelte/store";
import { showModal } from "./stores";
import { supaClient } from "./supa-client";

export const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supaClient.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        console.error(error);
    } else {
        showModal.set(false);
    }
    return { error };
};

export const signUpWithPassword = async (email: string, password: string) => {
    const { error } = await supaClient.auth.signUp({
        email,
        password
    });
    if (error) {
        console.error(error);
    } else {
        showModal.set(false);
    }
    return { error };
};

export const signInWithGoogle = async () => {
    const { error } = await supaClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: get(page).url.origin
        }
    });
    if (error) {
        console.error(error);
    } else {
       showModal.set(false); 
    }
    return { error };
};

export const sendPasswordEmail = async (email: string) => {
    const { error } = await supaClient.auth.resetPasswordForEmail(email, {
        redirectTo: get(page).url.origin
    });
    if (error) {
        console.error(error);
    } else {
        showModal.set(false);
    }
    return { error };
};

export const logout = async () => {
    const { error } = await supaClient.auth.signOut();
    if (error) {
        console.error(error);
    }
};
