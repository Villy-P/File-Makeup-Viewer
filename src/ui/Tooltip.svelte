<script lang="ts">
    import { onMount } from "svelte";

    let tooltip: HTMLDivElement | undefined = $state(undefined);

    interface Props {
        tooltipContainerClass?: string;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { tooltipContainerClass = "", children, ...rest }: Props = $props();

    onMount(() => {
        if (!tooltip) return;
        const hoverElement = tooltip.parentElement;
        if (!hoverElement) return;

        hoverElement.classList.add('tooltip-wrapper');
        hoverElement.style.position = "relative";

        tooltip.style.marginLeft = `-${tooltip.clientWidth / 2}px`;

        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (tooltipRect.left < 0) {
            tooltip.style.marginLeft = `-10px`;
            tooltip.style.setProperty('--arrow-left', '10px');
        } else if (tooltipRect.right > viewportWidth) {
            tooltip.style.marginLeft = `-${tooltip.clientWidth - 10}px`;
            tooltip.style.setProperty('--arrow-left', `${tooltip.clientWidth - 10}px`);
        } else {
            tooltip.style.setProperty('--arrow-left', '50%');
        }
    });
</script>

<div class="tooltip" bind:this={tooltip} {...rest}>
    <div class="tooltip-content {tooltipContainerClass}">
        {@render children?.()}
    </div>
</div>

<style>
    .tooltip {
        visibility: hidden;
        position: absolute;
        bottom: 150%;
        opacity: 0;
        transition: opacity .1s ease-in-out;
        left: 50%;
        width: fit-content;
    }

    .tooltip::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: var(--arrow-left, 50%);
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--vscode-editorHoverWidget-background, #252526) transparent transparent transparent;
    }

    :global(.tooltip-wrapper:hover .tooltip) {
        visibility: visible;
        opacity: 1;
    }

    .tooltip-content {
        background: var(--vscode-editorHoverWidget-background, #252526);
        border: 1px solid var(--vscode-editorHoverWidget-border, #454545);
        border-radius: 3px;
        box-shadow: 0 2px 8px var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));
        color: var(--vscode-editorHoverWidget-foreground, #cccccc);
        max-width: 700px;
        overflow: hidden;
        padding: 2px 8px;
        position: relative;
        z-index: 400;
        max-width: 400px;
        white-space: normal;
        overflow-wrap: break-word;
    }
</style>