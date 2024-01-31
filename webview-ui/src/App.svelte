<script lang="ts">
	import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
	import { vscode } from "./utilities/vscode";
    import { onMount } from "svelte";

	import { Chart } from 'chart.js/auto'

	import './styles/style.css'

	provideVSCodeDesignSystem().register(vsCodeButton());

	let cwd = "";

	onMount(() => {
		window.addEventListener("message", (e) => {
			const msg = e.data;

			if (e.data.title === "cwd")
				cwd = e.data.msg;
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
	<vscode-button>Update</vscode-button>
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
