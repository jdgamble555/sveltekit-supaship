/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GetSinglePostWithCommentResponse } from "./database.types";
import type { Post, PostDetailData } from "./post.types";
import type { SupashipUserInfo } from "./session-store";
import { supaClient } from "./supa-client";

export async function getPostDetails({
    params: { postId },
    userContext,
}: {
    params: { postId: string };
    userContext: SupashipUserInfo;
}): Promise<PostDetailData | undefined> {
    const { data, error } = await supaClient
        .rpc("get_single_post_with_comments", { post_id: postId })
        .select("*");
    if (error || !data || data.length === 0) {
        throw new Error("Post not found");
    }
    const postMap = (data as GetSinglePostWithCommentResponse[]).reduce(
        (acc, post) => {
            acc[post.id] = post;
            return acc;
        },
        {} as Record<string, Post>
    );
    const post = postMap[postId];
    const comments = (data as GetSinglePostWithCommentResponse[]).filter(
        (x) => x.id !== postId
    );
    if (!userContext.session?.user) {
        return { post, comments };
    }
    const { data: votesData } = await supaClient
        .from("post_votes")
        .select("*")
        .eq("user_id", userContext.session?.user.id);
    if (!votesData) {
        return;
    }
    const votes = votesData.reduce((acc, vote) => {
        acc[vote.post_id] = vote.vote_type as any;
        return acc;
    }, {} as Record<string, "up" | "down" | undefined>);
    return { post, comments, myVotes: votes };
}