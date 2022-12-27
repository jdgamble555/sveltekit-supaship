<script lang="ts">
	import {
		sendPasswordEmail,
		signInWithGoogle,
		signInWithPassword,
		signUpWithPassword
	} from '$lib/auth';

	import { authMode } from '$lib/stores';
	import Google from './google.svelte';

	$: serverError = '';

	const toggleAuth = () => authMode.set($authMode === 'sign_in' ? 'sign_up' : 'sign_in');

	const submitForm = (e: Event) => {
		const form = new FormData(e.target as HTMLFormElement);
		const { email, password } = Object.fromEntries(form);

		switch ($authMode) {
			case 'sign_up':
				signUpWithPassword(email as string, password as string).then(({ error }) => {
					if (error) {
						serverError = error.message;
					}
				});
				break;

			case 'sign_in':
				signInWithPassword(email as string, password as string).then(({ error }) => {
					if (error) {
						serverError = error.message;
					}
				});
				break;

			case 'forgot':
				sendPasswordEmail(email as string).then(({ error }) => {
					if (error) {
						serverError = error.message;
					}
				});
		}
	};
</script>

<form on:submit|preventDefault={submitForm}>
	<Google on:click={signInWithGoogle} />
	<hr class="mb-8" />

	<fieldset class="grid grid-cols-1 place-items-center gap-4">
		<label for="email" class="uppercase text-white text-xl font-display font-extrabold">
			Email Address
		</label>
		<input
			type="email"
			name="email"
			id="email"
			class="w-full text-2xl font-display font-normal rounded border-2 text-green-400 border-green-400 text-center drop-shadow-[0_0_9px_rgba(34,197,94,0.9)] bg-white"
		/>
		{#if $authMode !== 'forgot'}
			<label for="password" class="uppercase text-white text-xl font-display font-extrabold">
				{$authMode === 'sign_in' ? 'Your' : 'Create a'} Password
			</label>
			<input
				type="password"
				id="password"
				name="password"
				class="w-full text-2xl font-display font-normal rounded border-2 text-green-400 border-green-400 text-center drop-shadow-[0_0_9px_rgba(34,197,94,0.9)] bg-white"
			/>
			{#if serverError}
				<p class="welcome-form-error-message validation-feedback">
					{serverError}
				</p>
			{/if}
		{/if}
		<div class="my-1" />
		<button
			type="submit"
			class="text-black text-lg font-display bg-green-500 w-full p-2 rounded font-extrabold"
		>
			{$authMode === 'sign_in'
				? 'Sign In'
				: $authMode === 'sign_up'
				? 'Sign Up'
				: 'Send Reset Password Instructions'}
		</button>
	</fieldset>
	{#if $authMode === 'sign_in'}
		<div
			class="mt-5 cursor-pointer underline text-center"
			on:keypress={() => authMode.set('forgot')}
			on:click={() => authMode.set('forgot')}
		>
			Forgot your password?
		</div>
	{/if}
	<div
		class="mt-5 cursor-pointer underline text-center"
		on:keypress={toggleAuth}
		on:click={toggleAuth}
	>
		{#if $authMode === 'sign_in'}
			Don't have an account? Sign up
		{:else}
			Already have an account? Sign in
		{/if}
	</div>
</form>
<br />
