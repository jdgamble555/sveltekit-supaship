import type { PageLoad } from './$types';

export const load = (({ params }) => {
    return {
        postId: params.postId
    };
}) satisfies PageLoad;