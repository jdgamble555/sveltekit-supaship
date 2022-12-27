<script lang="ts">
	import type { GetSinglePostWithCommentResponse } from '$lib/database.types';
	import type { Comment } from '$lib/post.types';
	import { useSession } from '$lib/session-store';
	import { bumper } from '$lib/stores';
	import { supaClient } from '$lib/supa-client';
	import { createForm } from 'svelte-forms-lib';
	import { get } from 'svelte/store';

	export let parent: GetSinglePostWithCommentResponse | Comment;
	export let commenting: boolean = false;

	const session = get(useSession).session;

	const user_id = (session?.user.id as string) || '';

	const { form, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			comment: ''
		},
		onSubmit: (values) => {
			supaClient
				.rpc('create_new_comment', {
					user_id,
					content: values.comment,
					path: `${parent.path}.${parent.id.replaceAll('-', '_')}`
				})
				.then(({ error }) => {
					if (error) {
						console.log(error);
					} else {
						handleReset();
						bumper.update((v) => ++v);
						commenting = false;
					}
				});
		}
	});
</script>

<form
	class="post-detail-create-comment-form"
	data-e2e="create-comment-form"
	on:submit|preventDefault={handleSubmit}
>
	<h3>Add a New Comment</h3>
	<textarea
		name="comment"
		on:change={handleChange}
		bind:value={$form.comment}
		placeholder="Your comment here"
		class="post-detail-create-comment-form-content"
	/>
	<div class="flex gap-2">
		<button
			type="submit"
			class="post-detail-create-comment-form-submit-button"
			disabled={!$form.comment}
		>
			Submit
		</button>
		{#if commenting}
			<button
				type="button"
				class="post-detail-create-comment-form-cancel-button"
				on:click={() => (commenting = !commenting)}
			>
				Cancel
			</button>
		{/if}
	</div>
</form>
