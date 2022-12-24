import type { PageLoad } from './$types';

export const load = (({ params }) => {
    return {
        pageNumber: params.pageNumber
    };
}) satisfies PageLoad;