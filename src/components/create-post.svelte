<script lang="ts">
	import { useSession } from '$lib/session-store';
	import { bumper } from '$lib/stores';
	import { supaClient } from '$lib/supa-client';
	import { createForm } from 'svelte-forms-lib';
	import { get } from 'svelte/store';

	const session = get(useSession).session;

	const userId = (session?.user.id as string) || '';

	const { form, handleChange, handleSubmit, handleReset } = createForm({
		initialValues: {
			title: '',
			content: ''
		},
		onSubmit: (values) => {
			supaClient
				.rpc('create_new_post', {
					userId,
					title: values.title,
					content: values.content
				})
				.then(({ error }) => {
					if (error) {
						console.error(error);
					} else {
						bumper.update((v) => ++v);
						handleReset();
					}
				});
		}
	});
</script>

<form class="create-post-form" data-e2e="create-post-form" on:submit|preventDefault={handleSubmit}>
	<h3>Create A New Post</h3>
	<input
		type="text"
		name="title"
		on:change={handleChange}
		bind:value={$form.title}
		class="create-post-title-input"
		placeholder="Your Title Here"
	/>
	<textarea
		name="contents"
		on:change={handleChange}
		bind:value={$form.content}
		placeholder="Your content here"
		class="create-post-content-input"
	/>
	<div>
		<button type="submit" class="create-post-submit-button">Submit</button>
	</div>
</form>
