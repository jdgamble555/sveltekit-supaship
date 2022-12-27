import { goto } from "$app/navigation";
import { page } from "$app/stores";
import type { RealtimeChannel, Session } from "@supabase/supabase-js";
import { derived, get, readable } from "svelte/store";
import { returnPath } from "./stores";
import { supaClient } from "./supa-client";

export interface UserProfile {
    username: string;
    avatarUrl?: string;
};

export interface SupashipUserInfo {
    session: Session | null;
    profile: UserProfile | null;
};

// session readable
const auth = readable<Session | null>(null, set => {

    // get current data
    supaClient.auth.getSession().then(({ data: { session: _session } }) => {
        set(_session);
    });

    // subscribe to session changes
    const unsub = supaClient.auth.onAuthStateChange((_event, _session) => {
        set(_session);
    });
    return unsub.data.subscription.unsubscribe;
});

export const useSession = derived<typeof auth, SupashipUserInfo>(auth, (_session, set) => {

    let profile: null | {
        user_id: string
        username: string
    } = null;
    const session = _session;
    const userId = _session?.user.id;

    console.log('session store sub...');

    let channel: RealtimeChannel;

    if (userId) {

        // get profile data
        supaClient
            .from("user_profiles")
            .select("*")
            .filter("user_id", "eq", userId).then(({ data }) => {
                if (data?.[0]) {
                    profile = data[0];
                }
                // set profile data
                set({ session, profile });
                
                if (!profile) {
                    returnPath.set(get(page).url.pathname);
                    goto('/welcome');
                }
            });

        // subscribe to profile data
        channel = supaClient
            .channel(`public:user_profiles`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "user_profiles",
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {

                    // set profile data changes
                    set({ session, profile: payload.new as UserProfile });
                }
            )
            .subscribe();
    } else {
        // set default value
        set({ session, profile });
    }

    return () => channel ? channel.unsubscribe() : null;
});

