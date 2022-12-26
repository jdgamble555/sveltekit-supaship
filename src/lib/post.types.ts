import type { GetSinglePostWithCommentResponse } from "./database.types";

export interface Post {
    id: string;
    author_name: string;
    title: string;
    content: string;
    score: number;
    created_at: string;
    path: string;
};

export interface Comment {
    id: string;
    author_name: string;
    content: string;
    score: number;
    created_at: string;
    path: string;
    comments: Comment[];
};

export interface PostDetailData {
    post: GetSinglePostWithCommentResponse | null;
    comments: GetSinglePostWithCommentResponse[];
    myVotes?: Record<string, "up" | "down" | undefined>;
};