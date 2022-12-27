import type { GetSinglePostWithCommentResponse } from "./database.types";
import type { Comment } from "./post.types";

export function unsortedCommentsToNested(
    comments: GetSinglePostWithCommentResponse[]
): Comment[] {
    const commentMap = comments.reduce((acc, comment) => {
        acc[comment.id] = {
            ...comment,
            comments: [],
        };
        return acc;
    }, {} as Record<string, Comment>);
    const result: Comment[] = [];
    const sortedByDepthThenCreationTime = [...Object.values(commentMap)].sort(
        (a, b) => {
            const aDepth = getDepth(a.path);
            const bDepth = getDepth(b.path);
            return aDepth > bDepth
                ? 1
                : aDepth < bDepth
                    ? -1
                    : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
    );
    for (const post of sortedByDepthThenCreationTime) {
        if (getDepth(post.path) === 1) {
            result.push(post);
        } else {
            const parentNode = getParent(commentMap, post.path);
            parentNode.comments.push(post);
        }
    }
    return result;
}

export function getParent(map: Record<string, Comment>, path: string): Comment {
    const parentId = path.replace("root.", "").split(".").slice(-1)[0];
    const parent = map[convertToUuid(parentId)];
    if (!parent) {
        throw new Error(`Parent not found at ${parentId}`);
    }
    return parent;
}

export function convertToUuid(path: string): string {
    return path.replaceAll("_", "-");
}

export function getDepth(path: string): number {
    const rootless = path.replace(".", "");
    return rootless.split(".").filter((x) => !!x).length;
}