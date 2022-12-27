import { bumper } from "./stores";
import { supaClient } from "./supa-client";

export async function castVote({
    postId,
    userId,
    voteType
}: {
    postId: string;
    userId: string;
    voteType: "up" | "down"
}) {
    await supaClient.from("post_votes").upsert(
        {
            post_id: postId,
            user_id: userId,
            vote_type: voteType,
        },
        { onConflict: "post_id,user_id" }
    );
    bumper.update(v => ++v);
}