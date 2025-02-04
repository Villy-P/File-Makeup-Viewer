<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<div class="badge" {...rest}>
	<div class="control">
		{@render children?.()}
	</div>
</div>

<style>
	.badge {
		box-sizing: border-box;
		font-family: var(
			--vscode-font-family,
			"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
		);
		font-size: var(--type-ramp-minus1-font-size, 11px);
		line-height: var(--type-ramp-minus1-line-height, 16px);
		text-align: center;
		display: inline-block;
	}

	.control {
		align-items: center;
		background-color: var(--vscode-badge-background, "#4d4d4d");
		border: calc(var(--border-width, 1) * 1px) solid
			var(--vscode-button-border, transparent);
		border-radius: 11px;
		box-sizing: border-box;
		color: var(--vscode-badge-foreground, #fff);
		display: flex;
		height: calc(var(--design-unit, 4) * 4px);
		justify-content: center;
		min-width: calc(var(--design-unit, 4) * 4px + 2px);
		min-height: calc(var(--design-unit, 4) * 4px + 2px);
		padding: 3px 6px;
	}
</style>