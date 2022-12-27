<script lang="ts">
	import { castVote } from '$lib/cast-vote';
	import type { Session } from '@supabase/supabase-js';

	export let direction: 'up' | 'down' = 'up';
	export let filled = false;
	export let enabled = true;
	export let session: Session | null;
	export let postId: string;

	const classes = () => {
		const temp = [];
		if (direction === 'down') {
			temp.push('origin-center rotate-180');
		}
		if (filled) {
			temp.push(direction === 'up' ? 'fill-green-400' : 'fill-red-400');
			temp.push('glow');
		} else {
			temp.push('fill-white');
		}
		if (!enabled) {
			temp.push('opacity-50');
		}
		return temp.join(' ');
	};

	const vote = () => {
		if (session) {
			castVote({ postId, userId: session.user.id, voteType: direction });
		}
	};
</script>

<button disabled={!enabled} on:click={vote} data-e2e={`${direction}vote`} data-filled={filled}>
	<svg
		class={classes()}
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"
		/>
	</svg>
</button>
