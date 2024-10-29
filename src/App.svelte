<script lang="ts">
    import { onMount } from "svelte";

    import type { FileType, OptionCheckBox, Directory } from "./types";

	import Chart from 'chart.js/auto'
	import type { ChartTypeRegistry, ChartEvent, ActiveElement } from 'chart.js'

	import './styles/style.css'
	import "./app.css";
	import Button from "./ui/Button.svelte";
	import TextArea from "./ui/TextArea.svelte";

	let cwd = "";                               // The current working directory the user is in. Is set on runtime.
	let directory: Directory;                   // Current Working Directory the user is in represented in class form
	let fileJSON: FileType[];                   // Data from src/file.json
	let fileData = new Map<string, number>();   // File data shown in the graph. Key is the JSON value found in fileJSON stringified, 
	                                            // and the value is the amount of files or size of the files. 
	
	let ignore: string[] = [];                  // List of items to ignore, found in the text box within the UI      
	let chart: Chart<"pie", any[], any>;        // The chart of items that is visualized.
	let textareavalue: string; 		            // The value for UI Element of the text box for ignore folders
	let isFile: boolean = true;                 // Whether or not the graph shows number of files with extension or size of files
	let fileOfType: string[];                   // List of files that match the clicked element
	
	onMount(() => {
		// Getting data from the VSCode backend, found in src/extension.ts
		window.addEventListener("message", (e) => {
			if (e.data.title === "cwd")
				cwd = e.data.msg;
			if (e.data.title === "file")
				fileJSON = JSON.parse(e.data.msg).files;
			if (e.data.title === "dir") {
				directory = JSON.parse(e.data.msg);
				update();
			}
		});

		// Initialize the graph with blank data
		const ctx: any = document.getElementById('myChart');

		chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    data: [],
                    backgroundColor: [],
                    hoverOffset: 4
                }]
            },
			options: {
				onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart<keyof ChartTypeRegistry>) => {
					fileOfType = [];
					if (!elements)
						return;
					const i = elements[0].index;
					const label = (chart.data.labels![i] as string).slice(0, -5);
					const file = fileJSON.find(f => f.name === label);
					getFileOfExtension(directory.children!, file!.file);
				}
			}
        });
	});

	// Gets the file extension by running through each period value
	// Example: item.ext1.ext2 will check to see if .ext1.ext2 exists,
	// then .ext2
	function getFileExtension(ext: string): FileType | null {
		let e = ext;
		while (e) {
			const extension = fileJSON.find(f => f.file === ('.' + e));
			if (extension)
				return extension;
			e = e.split('.').slice(1).join('.');
		}
		return null;
	}

	// Recursive function to get files of extension
	function getFileOfExtension(files: Directory[], ext: string) {
		for (const dir of files) {
			if ((dir.name.startsWith(".") && !options[0].checked && dir.type == 'directory') || ignore.includes(dir.name))
				continue;
			if (dir.type == 'file' && dir.name.endsWith(ext))
				fileOfType.push("." + dir.path.replace(cwd, ""));
			if (dir.type == "directory")
				getFileOfExtension(dir.children!, ext);
		}
	}

	// Recursive function that reads the current directory and its children to populate the file data
	function readFileAndChildren(files: Directory[]) {
		for (const dir of files) {
			if (dir.name.startsWith(".") && !options[0].checked && dir.type == 'directory')
				continue;
			if (ignore.includes(dir.name))
				continue;
			if (dir.type == 'directory' && dir.children) {
				readFileAndChildren(dir.children);
			} else {
				const ext = dir.name.split(".");
				const extName = ext[ext.length - 1];
				const fileExtension = dir.name.split('.').slice(1).join('.');
				let extension = getFileExtension(fileExtension);
				if (extension && !extension.lang && options[2].checked)
					continue;
				if (extension && extension.groupWith && options[1].checked)
					extension = fileJSON.find((x) => x.file === extension!.groupWith) || null;
				if (!extension) {
					fileJSON.push({file: '.' + extName, name: '.' + extName, color: "#000000"});
					extension = fileJSON[fileJSON.length - 1];
				}
				const data = isFile ? 1 : dir.size;
				fileData.set(JSON.stringify(extension), (fileData.get(JSON.stringify(extension)) || 0) + data);
			}
		}
	}

	// Updates the graph with data
	function update() {
		ignore = textareavalue.split("\n");
		fileData.clear();

		readFileAndChildren(directory.children!);
		const extensionsSort = new Map([...fileData.entries()].sort((a, b) => b[1] - a[1]));
		
		chart.data = {
			labels: Array.from(extensionsSort.keys()).map(e => JSON.parse(e).name + " File"),
			datasets: [{
				label: isFile ? "Files with this extension" : "Collective Size of file (In bytes)",
				data: Array.from(extensionsSort.values()).map(e => e.toString()),
				backgroundColor: Array.from(extensionsSort.keys()).map(e => JSON.parse(e).color),
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
		}, {
			label: "Group Related Files",
			tooltip: "When checked, the chart will group similar files (such as .hpp files with .cpp files and .cjs/.mjs files with .js files)",
			checked: false
		}, {
			label: "Remove non-language files",
			tooltip: "When checked, the chart will not include files that are not direct language files (like .js, .cpp, .java, etc)",
			checked: false
		}
	];
</script>

<main class="flex flex-col justify-center items-start h-full">
	<h1 class="text-2xl font-bold py-2">File Makeup for {cwd}</h1>
	<div class="flex items-center">
        <button class="type type-left" on:click={() => {isFile = true; update()}} class:active={isFile}>File</button>
        <button class="type type-right" on:click={() => {isFile = false; update()}} class:active={!isFile}>Size</button>
        <div class="question tooltip-container">
            <div>?</div>
            <div class="tooltip-text">File will show the amount of files with the extension name, size will show the bytes of data located within these files.</div>
        </div>
    </div>
	<div style="width: 700px; height: 700px;">
        <canvas id="myChart" role="img"></canvas>
    </div>
	{#if fileOfType}
		<b class="pb-[3px]">Files with this extension:</b>
		{#each fileOfType as file}
			<p style="margin: 0;">{ file }</p>
		{/each}
	{/if}
	<div class="flex justify-center text-gray-500 flex-col pt-[10px]">
		{#each options as option}
		<div class="flex items-center">
			<input type="checkbox" id="show-hidden" bind:checked={option.checked} on:change={() => update()}/>
			<label for="show-hidden">{ option.label }</label>
			<div class="question tooltip-container">
				<div>?</div>
				<div class="tooltip-text">{ option.tooltip }</div>
			</div>
		</div>
		{/each}
		<br>
		<!-- <div class="tooltip-text">Each line will ignore a folder with that name. Do not include any slashes -- just use the name itself (like src or lib). Press Update to see changes</div> -->
		<TextArea 
			textareaclass="h-40" 
			placeholder="node_modules, build/, etc." 
			label="Ignore Folders" 
			id="textarea" 
			tooltiptext="Each line will ignore a folder with that name. Do not include any slashes -- just use the name itself (like src or lib). Press Update to see changes"
			bind:value={textareavalue}>
		</TextArea><br>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<Button on:click={() => update()}>Update</Button><br><br>
</main>