<script lang="ts">
	import { goto } from '$app/navigation';
	import { useSession } from '$lib/session-store';
	import { returnPath } from '$lib/stores';
	import { supaClient } from '$lib/supa-client';
	import { createForm } from 'svelte-forms-lib';
	import { get } from 'svelte/store';

	let serverError: string | null;
	$: serverError = null;

	const session = get(useSession).session;

	const user_id = (session?.user.id as string) || '';

	const { form, errors, touched, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			username: ''
		},
		validate: (values) => {
			const errs: { username?: string | undefined } = {};
			const regex = /^[a-zA-Z0-9_]+$/;
			if (Object.hasOwn(values, 'username')) {
				if (values.username === '') {
					errs['username'] = 'Username is required.';
				} else if (values.username.length < 4) {
					errs['username'] = 'Username must be at least 4 characters long.';
				} else if (values.username.length > 14) {
					errs['username'] = 'Username must be less than 15 characters long.';
				} else if (!regex.test(values.username)) {
					errs['username'] = 'Username can only contain letters, numbers, and underscores.';
				}
			}
			return Object.keys(errs).length ? errs : null;
		},
		onSubmit: (values) => {
			supaClient
				.from('user_profiles')
				.insert([
					{
						user_id,
						username: values.username
					}
				])
				.then(({ error }) => {
					if (error) {
						console.error(error);
						serverError = `Username "${values.username}" is already taken`;
					} else {
						const target = $returnPath || '/';
						returnPath.set(null);
						goto(target);
					}
				});
		}
	});
</script>

<h2 class="welcome-header">Welcome to Supaship!!</h2>
<p class="text-center">Let's get started by creating a username:</p>

<form class:valid={$isValid} class="welcome-name-form" on:submit|preventDefault={handleSubmit}>
	<input
		name="username"
		placeholder="Username"
		on:input={handleChange}
		bind:value={$form.username}
		class="welcome-name-input"
	/>
	{#if $touched.username && ($errors.username || serverError)}
		<p class="welcome-form-error-message validation-feedback">
			{$errors.username || serverError}
		</p>
	{/if}
	<p class="text-center">This is the name people will see you as on the Message Board</p>
	<button class="welcome-form-submit-button" type="submit" disabled={!$isValid}>Submit</button>
</form>
