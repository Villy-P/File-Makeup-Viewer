<script lang="ts">
	import { TextArea, provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";
    import { onMount } from "svelte";

    import type { FileType, OptionCheckBox, Directory } from "./types";

	import { Chart } from 'chart.js/auto'

	import './styles/style.css'
    import { dir } from "console";

	let cwd = "";
	let directory: Directory;
	let fileJSON: FileType[];
	let fileData: Map<FileType, number> = new Map<FileType, number>();
	
	let ignore: string[] = [];
	let chart: Chart<"pie", string[], string> | undefined;
	let textarea: HTMLTextAreaElement;
	
	onMount(() => {
		provideVSCodeDesignSystem().register(vsCodeButton());
		window.addEventListener("message", (e) => {
			const msg = e.data;

			if (e.data.title === "cwd")
				cwd = e.data.msg;
			if (e.data.title === "file")
				fileJSON = JSON.parse(e.data.msg).files;
			if (e.data.title === "dir") {
				directory = JSON.parse(e.data.msg);
				update();
			}
		});

		const ctx: any = document.getElementById('myChart');

		chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    label: 'Files with this extension',
                    data: [],
                    backgroundColor: [],
                    hoverOffset: 4
                }]
            }
        });
	});

	function readFileAndChildren(files: Directory[]) {
		for (const dir of files) {
			if (dir.name.startsWith(".") && !options[0].checked)
				continue;
			if (ignore.includes(dir.name))
				continue;
			if (dir.children) {
				readFileAndChildren(dir.children);
			} else {
				const ext = dir.name.split(".");
				const extName = ext[ext.length - 1];
				let extension = fileJSON.find((x) => x.file === '.' + extName);
				if (extension && extension.groupWith && options[1].checked)
					extension = fileJSON.find((x) => x.file === extension.groupWith);
				if (!extension) {
					fileJSON.push({file: '.' + extName, name: extName, color: "#000000"});
					extension = fileJSON[fileJSON.length - 1];
				}
				fileData.set(extension, (fileData.get(extension) || 0) + 1);
			}
		}
	}

	function update() {
		ignore = textarea.value.split("\n");
		fileData.clear();
		
		readFileAndChildren(directory.children);
		const extensionsSort = new Map([...fileData.entries()].sort((a, b) => b[1] - a[1]));

		chart.data = {
			labels: Array.from(extensionsSort.keys()).map((x) => x.name),
			datasets: [{
				label: "Files with this extension",
				data: Array.from(extensionsSort.values()).map(e => e.toString()),
				hoverOffset: 4
			}]
		}
		chart.update();
	}

	const options: OptionCheckBox[] = [
		{
			label: "Show Hidden Directories",
			tooltip: "When unchecked, the chart will not include files located in hidden directories (those that start with '.')",
			checked: false
		},
		{
			label: "Group Related Files",
			tooltip: "When checked, the chart will group similar files (such as .hpp files with .cpp files and .cjs/.mjs files with .js files)",
			checked: false
		},
		{
			label: "Remove non-language files",
			tooltip: "When checked, the chart will not include files that are not direct language files (like .js, .cpp, .java, etc)",
			checked: false
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
			<input type="checkbox" id="show-hidden" bind:checked={option.checked} on:change={() => update()}/>
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
		<textarea id="textarea" bind:this={textarea}></textarea><br>
	</div>
	<vscode-button on:click={() => update()}>Update</vscode-button><br><br>
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
