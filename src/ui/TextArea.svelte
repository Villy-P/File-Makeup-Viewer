<script lang="ts">
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import type { TextAreaResize } from "../types/ui";
	import Tooltip from "./Tooltip.svelte";


    interface Props {
        label: string;
        autofocus?: boolean;
        cols?: number;
        disabled?: boolean;
        form?: string | undefined;
        maxlength?: number | undefined;
        name?: string | undefined;
        placeholder?: string | undefined;
        readonly?: boolean;
        resize?: TextAreaResize;
        rows?: number | undefined;
        value?: string;
        textareaclass?: string;
        tooltiptext?: string;
        [key: string]: any
    }

    let {
        label,
        autofocus = false,
        cols = 20,
        disabled = false,
        form = undefined,
        maxlength = undefined,
        name = undefined,
        placeholder = undefined,
        readonly = false,
        resize = "none",
        rows = 10,
        value = $bindable(),
        textareaclass = "",
        tooltiptext = "",
        ...rest
    }: Props = $props();
</script>

<div class="textarea" aria-label={label} class:disabled class:readonly data-resize={resize} {...rest}>
    {#if label.length > 0}
        <label for="textarea-control" class="textarea-label">
            {label}
            {#if tooltiptext.length > 0}
                <Tooltip tooltipContainerClass="w-40">{ tooltiptext }</Tooltip>
            {/if}
        </label>
    {/if}
    <!-- svelte-ignore a11y_autofocus -->
    <textarea
        class="textarea-control {textareaclass}"
        id="textarea-control"
        aria-label={label}
        onchange={bubble('change')}
        onclick={bubble('click')}
        oncontextmenu={bubble('contextmenu')}
        onfocus={bubble('focus')}
        oninput={bubble('input')}
        onkeydown={bubble('keydown')}
        onkeypress={bubble('keypress')}
        onkeyup={bubble('keyup')}
        onmouseenter={bubble('mouseenter')}
        onmouseleave={bubble('mouseleave')}
        onmouseover={bubble('mouseover')}
        onpaste={bubble('paste')}
        onselect={bubble('select')}
        {autofocus}
        {cols}
        {disabled}
        {form}
        {maxlength}
        {name}
        {placeholder}
        {readonly}
        {rows}
        style="resize: {resize};"
        bind:value={value}
    ></textarea>
</div>

<style>
    .textarea {
        display: inline-block;
        font-family: var(--vscode-font-family, "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol");
        outline: none;
        user-select: none;
    }

    .textarea:focus-within:not(.disabled) .textarea-control {
        border-color: var(--vscode-focusBorder, #007fd4);
    }

    .textarea.disabled {
        opacity: var(--disabled-opacity, 0.4);
    }

    .textarea.disabled .textarea-control {
        border-color: var(--vscode-dropdown-border, #3c3c3c);
    }

    .textarea-control {
        box-sizing: border-box;
        position: relative;
        color: var(--vscode-input-foreground, #ccc);
        background: var(--vscode-input-background, #3c3c3c);
        border-radius: calc(var(--vscode-input-background, 2) * 1px);
        border: calc(var(--border-width, 1) * 1px) solid var(--vscode-dropdown-border, #3c3c3c);
        font: inherit;
        font-size: var(--vscode-font-size, 13px);
        line-height: var(--type-ramp-base-line-height, normal);
        padding: calc(var(--design-unit, 4) * 2px + 2px);
        width: 100%;
        min-width: var(--input-min-width, 100px);
    }

    .textarea-control:hover:enabled {
        background: var(--vscode-input-background, #3c3c3c);
        border-color: var(--vscode-dropdown-border, #3c3c3c);
    }

    .textarea-control:active {
        background: var(--vscode-input-background, #3c3c3c);
        border-color: var(--vscode-focusBorder, #007fd4);
    }

    .textarea-control:hover,
    .textarea-control:focus-visible,
    .textarea-control:disabled,
    .textarea-control:active {
        outline: none;
    }

    .textarea-control::-webkit-scrollbar {
        width: var(--scrollbarWidth, 10px);
        height: var(--scrollbarHeight, 10px);
    }

    .textarea-control::-webkit-scrollbar-corner {
        background: var(--vscode-input-background, #3c3c3c);
    }

    .textarea-control::-webkit-scrollbar-thumb {
        background: var(--vscode-scrollbarSlider-background, #79797966);
    }

    .textarea-control::-webkit-scrollbar-thumb:hover {
        background: var(--vscode-scrollbarSlider-hoverBackground, #646464b3);
    }

    .textarea-control::-webkit-scrollbar-thumb:active {
        background: var(--vscode-scrollbarSlider-activeBackground, #bfbfbf66);
    }

    .textarea-label {
        display: block;
        color: var(--vscode-foreground, #ccc);
        font-size: var(--vscode-font-size, 13px);
        line-height: var(--type-ramp-base-line-height, normal);
        margin-bottom: 2px;
        width: fit-content;
    }

    .textarea.disabled .textarea-label,
    .textarea.readonly .textarea-label,
    .textarea.disabled .textarea-control,
    .textarea.readonly .textarea-control {
        cursor: not-allowed;
    }
</style>