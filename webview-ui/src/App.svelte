<script lang="ts">
	import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
    import { onMount } from "svelte";

    import type { FileType, OptionCheckBox } from "./types";

	import { Chart } from 'chart.js/auto'

	import './styles/style.css'

	provideVSCodeDesignSystem().register(vsCodeButton());

	let cwd = "";
	let fileJSON: FileType[];

	onMount(() => {
		window.addEventListener("message", (e) => {
			const msg = e.data;

			if (e.data.title === "cwd")
				cwd = e.data.msg;
			if (e.data.title === "file")
				fileJSON = JSON.parse(e.data.msg).files;
		});

		const ctx: any = document.getElementById('myChart');

		new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    "data_labels"
                ],
                datasets: [{
                    label: 'Files with this extension',
                    data: ["data_values"],
                    backgroundColor: ["data_colors"],
                    hoverOffset: 4
                }]
            }
        });
	});

	const options: OptionCheckBox[] = [
		{
			label: "Show Hidden Directories",
			tooltip: "When unchecked, the chart will not include files located in hidden directories (those that start with '.')"
		},
		{
			label: "Group Related Files",
			tooltip: "When checked, the chart will group similar files (such as .hpp files with .cpp files and .cjs/.mjs files with .js files)"
		},
		{
			label: "Remove non-language files",
			tooltip: "When checked, the chart will not include files that are not direct language files (like .js, .cpp, .java, etc)"
		}
	];
</script>

<main>
	<h1>File Makeup for {cwd}</h1>
	<div style="display: flex; align-items: center;">
        <button class="type active type-left">File</button>
        <button class="type type-right">Size</button>
        <div class="question tooltip-container">
            <div>?</div>
            <div class="tooltip-text">File will show the amount of files with the extension name, size will show the bytes of data located within these files.</div>
        </div>
    </div>
	<div style="width: 700px; height: 700px;">
        <canvas id="myChart" role="img"></canvas>
    </div>
	<div style="display: flex; justify-content: center; color: gray; flex-direction: column;">
		{#each options as option}
		<div style="display: flex; align-items: center;">
			<input type="checkbox" id="show-hidden" bind:checked={option.checked}/>
			<label for="show-hidden">{ option.label }</label>
			<div class="question tooltip-container">
				<div>?</div>
				<div class="tooltip-text">{ option.tooltip }</div>
			</div>
		</div>
		{/each}
		<br>
		<div style="display: flex; align-items: center;">
			<h2>Ignore Folders</h2>
			<div class="question tooltip-container">
				<div>?</div>
				<div class="tooltip-text">Each line will ignore a folder with that name. Do not include any slashes -- just use the name itself (like src or lib). Press Update to see changes</div>
			</div>
		</div>
		<textarea id="textarea"></textarea><br>
	</div>
	<vscode-button>Update</vscode-button><br><br>
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
