import { writable } from "svelte/store";
import { supaClient } from "./supa-client";

export const usePostScore = (postId: string, initialScore: number | undefined) => {
    return writable<number | undefined>(initialScore, set => {
        const channel = supaClient
            .channel(`post_${postId}_score`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "post_score",
                    filter: `post_id=eq.${postId}`,
                },
                (payload) => {
                    set((payload.new as { score: number }).score);
                }
            )
            .subscribe()
        return channel.unsubscribe;
    });
};
