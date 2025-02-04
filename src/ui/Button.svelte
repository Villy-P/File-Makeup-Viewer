<script lang="ts">
    type formenctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | null | undefined;
    type formmethodtype = "dialog" | "get" | "post" | "DIALOG" | "GET" | "POST" | null | undefined;

    import type { ButtonAppearance, ButtonType } from "../types/ui";

    export let appearance: ButtonAppearance = "primary";
    export let ariaLabel: string | undefined = undefined;

    export let autofocus: boolean = false;
    export let disabled: boolean = false;
    export let start: boolean = false;

    export let form: string | undefined = undefined;
    export let formaction: string | undefined = undefined;
    export let formenctype: formenctype = undefined;
    export let formmethod: formmethodtype = undefined;
    export let formnovalidate: boolean | undefined = undefined;
    export let formtarget: string | undefined = undefined;
    export let name: string | undefined = undefined;
    export let type: ButtonType | undefined = undefined;
    export let value: string | undefined = undefined;

    export let btnControlClass = "";
</script>

<div
    class="button"
    data-appearance={appearance}
    data-disabled={disabled}
    aria-label={ariaLabel}
    {...$$restProps}
>
    <!-- svelte-ignore a11y-autofocus -->
    <button
        class="btn-control {btnControlClass}"
        {autofocus}
        {form}
        {formaction}
        {formenctype}
        {formmethod}
        {formnovalidate}
        {formtarget}
        {name}
        {type}
        {value}
        on:click
        on:change
        on:keydown
        on:keyup
        on:touchstart|passive
        on:touchend
        on:touchcancel
        on:mouseenter
        on:mouseleave
    >
        {#if start}
            <span class="btn-start">
                <slot name="start" />
            </span>
        {/if}
        <div class="btn-content">
            <slot />
        </div>
    </button>
</div>

<style>
    .button {
        display: inline-flex;
        outline: none;
        font-family: var(--vscode-font-family, "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol");
        font-size: var(--type-ramp-minus1-font-size, 11px);
        line-height: var(--type-ramp-minus1-line-height, 16px);
        color: var(--vscode-button-foreground, #fff);
        background: var(--vscode-button-background, #0e639c);
        border-radius: calc(var(--corner-radius-round, 2) * 1px);
        fill: currentColor;
        cursor: pointer;
    }

    .button:hover {
        background: var(--vscode-button-hoverBackground, #1177bb);
    }

    .button:active {
        background: var(--vscode-button-background, #0e639c);
    }

    .button[data-disabled="true"] {
        opacity: var(--disabled-opacity, 0.4);
        background: var(--vscode-button-background, #0e639c);
        cursor: not-allowed;
    }

    .button[data-appearance="primary"] {
        background: var(--vscode-button-background, #0e639c);
        color: var(--vscode-button-foreground, #fff);
    }

    .button[data-appearance="primary"]:hover {
        background: var(--vscode-button-hoverBackground, #1177bb);
    }

    .button[data-appearance="primary"]:active .btn-control:active {
        background: var(--vscode-button-background, #0e639c);
    }

    .button[data-appearance="primary"] .btn-control:focus-visible {
        outline: calc(var(--border-width, 1) * 1px) solid var(--vscode-focusBorder, #007fd4);
        outline-offset: calc(var(--border-width, 1px) * 2px);
    }

    .button[data-appearance="primary"][data-disabled="true"] {
        background: var(--vscode-button-background, #0e639c);
    }

    .button[data-appearance="secondary"] {
        background: var(--vscode-button-secondaryBackground, #3a3d41);
        color: var(--vscode-button-secondaryForeground, #fff);
    }

    .button[data-appearance="secondary"]:hover {
        background: var(--vscode-button-secondaryHoverBackground, #45494e);
    }

    .button[data-appearance="secondary"]:active .btn-control:active {
        background: var(--vscode-button-secondaryBackground, #3a3d41);
    }

    .button[data-appearance="secondary"] .btn-control:focus-visible {
        outline: calc(var(--border-width, 1) * 1px) solid var(--vscode-focusBorder, #007fd4);
        outline-offset: calc(var(--border-width, 1) * 2px);
    }

    .button[data-appearance="secondary"][data-disabled="true"] {
        background: var(--vscode-button-secondaryBackground, #3a3d41);
    }

    .button[data-appearance="icon"] {
        background: var(--button-icon-background, transparent);
        border-radius: var(--button-icon-corner-radius, 5px);
        color: var(--vscode-foreground, #cccccc);
        aspect-ratio: 1 / 1;
    }

    .button[data-appearance="icon"]:hover {
        background: var(--button-icon-hover-background, rgba(90, 93, 94, 0.31));
    }

    .button[data-appearance="icon"]:active .btn-control:active {
        background: var(--button-icon-hover-background, rgba(90, 93, 94, 0.31));
    }

    .button[data-appearance="icon"] .btn-control {
        padding: var(--button-icon-padding, 3px);
        border: none;
    }

    .button[data-appearance="icon"] .btn-control:focus-visible {
        outline: calc(var(--border-width, 1) * 1px) solid var(--vscode-focusBorder, #007fd4);
        outline-offset: calc(var(--border-width, 1) * 2px);
    }

    .button[data-appearance="icon"][data-disabled="true"] {
        background: var(--button-icon-background, transparent);
    }

    .btn-control {
        background: transparent;
        height: inherit;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: var(--button-padding-vertical, 4px) var(--button-padding-horizontal, 11px);
        white-space: wrap;
        outline: none;
        text-decoration: none;
        border: calc(var(--border-width, 1) * 1px) solid var(--vscode-button-border, transparent);
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-family: inherit;
    }

    .btn-control:focus-visible {
        outline: calc(var(--border-width, 1) * 1px) solid var(--vscode-focusBorder, #007fd4);
        outline-offset: calc(var(--border-width, 1px) * 2px);
    }

    .btn-control::-moz-focus-inner {
        border: 0;
    }

    .btn-content {
        display: flex;
    }

    .btn-start {
        display: flex;
        margin-inline-end: 8px;
    }

    .btn-start span {
        width: calc(var(--design-unit, 4) * 4px);
        height: calc(var(--design-unit, 4) * 4px);
    }
</style>