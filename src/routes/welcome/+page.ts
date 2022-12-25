import { useSession } from '$lib/session-store';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (() => {

    const { session, profile } = get(useSession);

    // make sure logged in
    if (!session) {
        throw redirect(301, '/login');
    }

    // makes sure no username exists
    if (profile?.username) {
        throw redirect(301, '/');
    }

}) satisfies PageLoad;