<script lang="ts">
    import type { TextAreaResize } from "../types/ui";
	import Tooltip from "./Tooltip.svelte";

    export let label: string;
    export let autofocus: boolean = false;
    export let cols: number = 20;
    export let disabled: boolean = false;
    export let form: string | undefined = undefined;
    export let maxlength: number | undefined = undefined;
    export let name: string | undefined = undefined;
    export let placeholder: string | undefined = undefined;
    export let readonly: boolean = false;
    export let resize: TextAreaResize = "none";
    export let rows: number | undefined = undefined;
    export let value: string = "";

    export let textareaclass: string = "";
    export let tooltiptext: string = "";
</script>

<div class="textarea" aria-label={label} class:disabled class:readonly data-resize={resize} {...$$restProps}>
    {#if label.length > 0}
        <label for="textarea-control" class="textarea-label">
            {label}
            {#if tooltiptext.length > 0}
                <Tooltip tooltipContainerClass="w-40">{ tooltiptext }</Tooltip>
            {/if}
        </label>
    {/if}
    <!-- svelte-ignore a11y-autofocus -->
    <textarea
        class="textarea-control {textareaclass}"
        id="textarea-control"
        aria-label={label}
        bind:value
        on:change
        on:click
        on:contextmenu
        on:focus
        on:input
        on:keydown
        on:keypress
        on:keyup
        on:mouseenter
        on:mouseleave
        on:mouseover
        on:paste
        on:select
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
    />
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
        cursor: pointer;
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