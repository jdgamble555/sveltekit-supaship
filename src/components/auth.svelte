<script lang="ts">
	import { authMode } from '$lib/stores';
</script>

<h1>{$authMode}</h1>
<br />
<form>
	<fieldset class="grid grid-cols-1 place-items-center gap-4">
		<label for="email" class="text-white text-xl font-display">Email</label>
		<input
			type="email"
			name="email"
			id="email"
			class="text-2xl font-display font-normal rounded border-2 text-green-400 border-green-400 text-center drop-shadow-[0_0_9px_rgba(34,197,94,0.9)] bg-white"
		/>
		<label for="password" class="text-white text-xl font-display">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			class="text-2xl font-display font-normal rounded border-2 text-green-400 border-green-400 text-center drop-shadow-[0_0_9px_rgba(34,197,94,0.9)] bg-white"
		/>
		<button type="submit" class="text-black text-xl font-display bg-green-500 w-full p-2 rounded">
			Submit
		</button>
	</fieldset>
</form>
<br />
