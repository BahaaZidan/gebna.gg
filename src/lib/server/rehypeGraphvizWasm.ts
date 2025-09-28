/* eslint-disable @typescript-eslint/no-explicit-any */
import { Graphviz } from '@hpcc-js/wasm';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

function getText(node: any): string {
	if (!node) return '';
	if (node.type === 'text') return node.value ?? '';
	if (Array.isArray(node.children)) return node.children.map(getText).join('');
	return '';
}

/**
 * Defaults injected into every diagram.
 * Users can still override any of these inside their own DOT.
 */
const DEFAULTS = `
  bgcolor=transparent;
  rankdir=LR;
  nodesep=0.6;
	graph [dpi=300];
  // let Graphviz break long text and add internal padding
  node [
    shape=rect,
    style="rounded,filled",
    fillcolor="white",
    color="black",
    fontsize=24,
    margin="0.4,0.3",   // left/right , top/bottom padding (in inches)
    wrap=true,
    width=2.3,            // min width so wrap has room
		fontname="Arial, Helvetica, sans-serif",
  ];
  edge [
		color="#facc15",
		penwidth=2,
		arrowsize=0.8,
		fontsize=22,
		fontname="Arial, Helvetica, sans-serif",
	];
`;

function injectDefaults(dot: string): string {
	return dot.replace(/(^\s*(?:strict\s+)?digraph\b[^{]*\{)/m, `$1\n${DEFAULTS}\n`);
}

export const rehypeGraphvizWasm: Plugin = () => {
	let gv: any = null;

	return async (tree: any) => {
		const tasks: Promise<void>[] = [];

		visit(tree, 'element', (preNode: any, index?: number, parent?: any) => {
			if (!parent || preNode.tagName !== 'pre') return;

			const codeEl = preNode.children?.[0];
			const classList: string[] = (codeEl?.properties?.className as string[]) ?? [];
			const isDot =
				codeEl?.tagName === 'code' &&
				(classList.includes('language-dot') ||
					classList.includes('language-graphviz') ||
					classList.includes('language-gv'));

			if (!isDot) return;

			const rawDot = getText(codeEl).trim();
			if (!rawDot) return;

			const task = (async () => {
				if (!gv) gv = await Graphviz.load();

				// prepend defaults so user attributes can override them
				const dotWithDefaults = injectDefaults(rawDot);

				const rawSvg = await gv.layout(dotWithDefaults, 'svg', 'dot');

				const svg = rawSvg.replace(
					'<svg ',
					'<svg role="img" aria-label="graphviz diagram" style="max-width:100%;height:auto;" '
				);

				parent.children.splice(index ?? 0, 1, { type: 'raw', value: svg });
			})();

			tasks.push(task);
		});

		await Promise.all(tasks);
	};
};
