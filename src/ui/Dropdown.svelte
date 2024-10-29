<script lang="ts">
    import { onMount } from "svelte";
    import type { DropdownPosition } from "../types/ui";

    export let disabled: boolean = false;
    export let open: boolean = false;
    export let position: DropdownPosition = "below";
    export let id: string = "";

    export let value: string = "";

    let listbox: HTMLDivElement;

    onMount(() => {
        // TODO: Refactor
        if (listbox.children.length == 0) return;
        value = listbox.children[0].children[0].innerHTML;
        (listbox.children[0] as HTMLOptionElement).ariaSelected = "true";
        (listbox.children[0] as HTMLOptionElement).selected = true;
        for (const child of Array.from(listbox.children)) {
            child.addEventListener("click", () => {
                value = child.children[0].innerHTML;
                for (const child of Array.from(listbox.children)) {
                    (child as HTMLOptionElement).ariaSelected = "false";
                    (child as HTMLOptionElement).selected = false;
                }
                (child as HTMLOptionElement).ariaSelected = "true";
                (child as HTMLOptionElement).selected = true;
            });
        }
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    {id}
    class="dropdown {position}"
    aria-disabled={disabled}
    aria-expanded={open}
    aria-haspopup="listbox"
    on:click={() => {
        if (!disabled) open = !open;
    }}
    on:change
    on:contextmenu
    on:input
    {...$$restProps}
>
    <div class="dropdown-control">
        <div class="selected-value">{value}</div>
        <div aria-hidden="true" class="indicator">
            <slot name="indicator">
                <svg
                    class="select-indicator"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
                    />
                </svg>
            </slot>
        </div>
    </div>
    <div
        bind:this={listbox}
        class="listbox {open ? 'open' : 'closed'}"
        id="listbox-0"
        data-hidden={!open}
    >
        <slot />
    </div>
</div>

<style>
    .dropdown {
        display: inline-flex;
        background: var(--vscode-dropdown-background, #3c3c3c);
        box-sizing: border-box;
        color: var(--vscode-foreground, #ccc);
        font-family: var(--vscode-font-family, "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol");
        height: calc(var(--input-height, 26) * 1px);
        position: relative;
        user-select: none;
        min-width: var(--input-min-width, 100px);
        outline: none;
        vertical-align: top;
    }

    .dropdown:not([aria-disabled="true"]):hover .dropdown-control {
        background: var(--vscode-dropdown-background, #3c3c3c);
        border-color: var(--vscode-dropdown-border, #3c3c3c);
    }

    .dropdown:focus-visible ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
        background: var(--vscode-list-activeSelectionBackground, #094771);
        border: calc(var(--border-width, 1) * 1px) solid transparent;
        color: var(--vscode-list-activeSelectionForeground, #fff);
    }

    .dropdown[aria-disabled="true"] {
        cursor: not-allowed;
        opacity: var(--disabled-opacity, 0.4);
    }

    .dropdown[aria-disabled="true"] .dropdown-control {
        cursor: not-allowed;
        user-select: none;
    }

    .dropdown[aria-disabled="true"]:hover {
        background: var(--vscode-dropdown-background, #3c3c3c);
        color: var(--vscode-foreground, #ccc);
        fill: currentColor;
    }

    .dropdown.above[aria-expanded="true"] .listbox {
        display: flex;
        position: absolute;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        bottom: calc(var(--input-height, 26) * 1px);
    }

    .dropdown.below[aria-expanded="true"] .listbox {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        top: calc(var(--input-height, 26) * 1px);
    }

    .dropdown:empty .listbox {
        display: none;
    }

    .dropdown-control {
        align-items: center;
        box-sizing: border-box;
        border: calc(var(--border-width, 1) * 1px) solid var(--vscode-dropdown-border, #3c3c3c);
        border-radius: calc(var(--corner-radius-round, 2) * 1px);
        cursor: pointer;
        display: flex;
        font-family: inherit;
        font-size: var(--vscode-font-size, 13px);
        line-height: var(--type-ramp-base-line-height, normal);
        min-height: 100%;
        padding: 2px 6px 2px 8px;
        width: 100%;
    }

    .listbox {
        background: var(--vscode-dropdown-background, #3c3c3c);
        border: calc(var(--border-width, 1) * 1px) solid var(--vscode-focusBorder, #007fd4);
        border-radius: calc(var(--corner-radius-round, 2) * 1px);
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: column;
        left: 0;
        max-height: var(--dropdown-list-max-height, 200px);
        padding: 0;
        overflow-y: auto;
        position: absolute;
        width: 100%;
        z-index: 1;
    }

    .listbox[data-hidden="true"] {
        display: none;
    }

    .listbox > * {
        flex: 0 0 auto;
    }

    .dropdown:focus-visible .dropdown-control,
    .dropdown:not([aria-disabled="true"]) .dropdown-control:active,
    .dropdown[aria-expanded="true"] .dropdown-control {
        border-color: var(--vscode-focusBorder, #007fd4);
    }

    .selected-value {
        flex: 1 1 auto;
        font-family: inherit;
        overflow: hidden;
        text-align: start;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .indicator {
        flex: 0 0 auto;
        margin-inline-start: 1em;
    }

    .indicator,
    .select-indicator,
    ::slotted(svg),
    ::slotted(span) {
        fill: currentcolor;
        height: 1em;
        min-width: calc(var(--design-unit, 4) * 4px);
        min-height: calc(var(--design-unit, 4) * 4px);
        width: 1em;
    }
</style>