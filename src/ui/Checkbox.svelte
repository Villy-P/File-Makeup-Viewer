<script lang="ts">
    export let label: string | undefined = undefined;

    export let checked: boolean = false;
    export let required: boolean = false;
    export let disabled: boolean = false;
    export let readonly: boolean = false;

    export let indeterminate: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="checkbox"
    class:disabled
    class:readonly
    class:checked
    class:indeterminate
    role="checkbox"
    aria-checked={checked}
    aria-required={required}
    aria-disabled={disabled}
    tabindex="0"
    aria-label={label}
    on:click={() => {
        if (!disabled && !readonly) {
            indeterminate = false;
            checked = !checked;
        }
    }}
    on:keyup
    on:keydown
    on:keypress
    on:focus
    on:blur
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:paste
    on:change
    {...$$restProps}
>
    <div class="check-control">
        {#if indeterminate}
            <div part="indeterminate-indicator" class="indeterminate-indicator"></div>
        {:else}
            <svg
                class="checked-indicator"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
                />
            </svg>
        {/if}
    </div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    {#if label}
        <label class="check-label"> Label </label>
    {/if}
</div>

<style>
    .checkbox {
        display: inline-flex;
        align-items: center;
        outline: none;
        margin: calc(var(--design-unit, 4px)) 0;
        user-select: none;
        font-size: var(--vscode-font-size, 13px);
        line-height: var(--type-ramp-base-line-height, normal);
    }

    .checkbox:not(.disabled) .check-control:hover {
        background: var(--vscode-checkbox-background, #3c3c3c);
        border-color: var(--vscode-checkbox-border, #3c3c3c);
    }

    .checkbox:not(.disabled) .check-control:active {
        background: var(--vscode-checkbox-background, #3c3c3c);
        border-color: var(--vscode-focusBorder, #007fd4);
    }

    .checkbox:focus-visible .check-control {
        border: calc(var(--border-width, 1px)) solid var(--vscode-focusBorder, #007fd4);
    }

    .checkbox.disabled {
        opacity: var(--disabled-opacity, 0.4);
    }

    .check-control {
        position: relative;
        width: calc(var(--design-unit, 4) * 4px + 2px);
        height: calc(var(--design-unit, 4) * 4px + 2px);
        box-sizing: border-box;
        border-radius: calc(var(--checkbox-corner-radius, 3px));
        border: calc(var(--border-width, 1px)) solid var(--vscode-checkbox-border, #3c3c3c);
        background: var(--vscode-checkbox-background, #3c3c3c);
        outline: none;
        cursor: pointer;
    }

    .check-label {
        font-family: var(--vscode-font-family, "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol");
        color: var(--vscode-foreground, #ccc);
        padding-inline-start: calc(var(--design-unit, 4) * 2px + 2px);
        margin-inline-end: calc(var(--design-unit, 4) * 2px + 2px);
        cursor: pointer;
    }

    .checked-indicator {
        width: 100%;
        height: 100%;
        min-width: calc(var(--design-unit, 4) * 4px);
        min-height: calc(var(--design-unit, 4) * 4px);
        display: block;
        fill: var(--vscode-foreground, #ccc);
        opacity: 0;
        pointer-events: none;
    }

    .indeterminate-indicator {
        border-radius: 2px;
        background: var(--vscode-foreground, #ccc);
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
    }

    .checkbox.disabled .check-label,
    .checkbox.readonly .check-label,
    .checkbox.disabled .check-control,
    .checkbox.readonly .check-control {
        cursor: not-allowed;
    }

    .checkbox.checked:not(.indeterminate) .checked-indicator,
    .checkbox.indeterminate .indeterminate-indicator {
        opacity: 1;
    }
</style>