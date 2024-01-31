import path from "path";
import fs from 'fs'
import type { FileType, OptionCheckBox } from "../types";

function getFileExtension(ext: string, files: FileType[], options: OptionCheckBox[]): FileType | null {
	let e = ext;
	while (e) {
		const extension = files.find(f => f.file === ('.' + e));
		if (options[2].checked && !extension?.lang) {
			e = e.split('.').slice(1).join('.');
			continue;
		}
		if (extension)
			return extension;
		e = e.split('.').slice(1).join('.');
	}
	return null;
}

function getFileNameExtension(files: string[], fileTypes: FileType[], options: OptionCheckBox[]): Map<string, number> {
	const map = new Map<string, number>();
	for (const file of files) {
		const path = file.split("\\");
		const fileName = path[path.length - 1];
		let fileExtension = fileName.split('.').slice(1).join('.');
		let extension = getFileExtension(fileExtension, fileTypes, options);
		let extensionName = extension?.name;
		if (extension === null)
			extensionName = '.' + fileExtension;
		if (!extensionName || extensionName === '.')
			continue;
		if (options[2].checked && !extension?.lang)
			continue;
		if (options[1].checked && extension?.groupWith) {
			extensionName = fileTypes.find(f => f.file === extension!.groupWith)!.name;
		}
		map.set(extensionName, (map.get(extensionName) || 0) + 1);
	}
	return map;
}

function traverseDir(dir: string, files: string[], options: OptionCheckBox[], ignore: string[]): string[] {
	if (path.basename(dir).startsWith(".") && !options[0].checked)
		return files;
	if (ignore.includes(path.basename(dir)))
		return files;
	fs.readdirSync(dir).forEach(file => {
		let fullPath = path.join(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			return traverseDir(fullPath, files, options, ignore);
		} else {
			files.push(fullPath);
		}  
	});
	return files;
}