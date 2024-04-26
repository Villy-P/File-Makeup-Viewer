export interface OptionCheckBox {
    checked?: boolean,
    label: string,
    tooltip: string
}

export interface FileType {
	file: string;
	name: string;
	color: string;
	lang?: boolean;
	groupWith?: string;
}

export interface Directory {
    path: string;
    name: string;
    size: number;
    type: "directory" | "file";
    children?: Directory[];
}