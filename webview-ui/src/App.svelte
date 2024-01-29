<script lang="ts">
	import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
	import { vscode } from "./utilities/vscode";
    import { onMount } from "svelte";

	provideVSCodeDesignSystem().register(vsCodeButton());

	let cwd = "";

	onMount(() => {
		window.addEventListener("message", (e) => {
			const msg = e.data;

			if (e.data.title === "cwd")
				cwd = e.data.msg;
		});
	});
</script>

<main>
	<h1>File Makeup for {cwd}</h1>
	<!-- <vscode-button on:click={handleHowdyClick}>Howdy!</vscode-button> -->
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		height: 100%;
	}
</style>
