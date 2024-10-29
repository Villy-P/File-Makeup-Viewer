<script lang="ts">
    export let disabled: boolean = false;
    export let selected: boolean = false;
    export let value: string = "";
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<option
    aria-selected={selected}
    {disabled}
    {selected}
    {value}
    aria-disabled={disabled}
    role="option"
    class="option"
    {...$$restProps}
>
    <span class="option-content">
        <slot />
    </span>
</option>

<style>
    .option {
        display: inline-flex;
        border-radius: var(--corner-radius, 0);
        border: calc(var(--border-width, 1) * 1px) solid transparent;
        box-sizing: border-box;
        color: var(--vscode-foreground, #ccc);
        cursor: pointer;
        fill: currentColor;
        font-size: var(--vscode-font-size, 13px);
        line-height: var(--type-ramp-base-line-height, normal);
        margin: 0;
        outline: none;
        overflow: hidden;
        padding: 0 calc((var(--design-unit, 4) / 2) * 1px) calc((var(--design-unit, 4) / 4) * 1px);
        user-select: none;
        white-space: nowrap;
    }

    .option:focus-visible {
        border-color: var(--vscode-focusBorder, #007fd4);
        background: var(--vscode-list-activeSelectionBackground, #094771);
        color: var(--vscode-foreground, #ccc);
    }

    .option[aria-selected="true"],
    .option:not([aria-selected="true"]):hover {
        background: var(--vscode-list-activeSelectionBackground, #094771);
        border: calc(var(--border-width, 1) * 1px) solid transparent;
        color: var(--vscode-list-activeSelectionForeground, #fff);
    }

    .option:active,
    .option:not([aria-selected="true"]):active {
        background: var(--vscode-list-activeSelectionBackground, #094771);
        color: var(--vscode-list-activeSelectionForeground, #fff);
    }

    .option[disabled] {
        cursor: not-allowed;
        opacity: var(--disabled-opacity, 0.4);
    }

    .option[disabled]:hover {
        background-color: inherit;
    }

    .option-content {
        grid-column-start: 2;
        justify-self: start;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>