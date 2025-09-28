/* eslint-disable @typescript-eslint/no-explicit-any */
import { Graphviz } from '@hpcc-js/wasm';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// Pull plain text from a HAST subtree
function getText(node: any): string {
	if (!node) return '';
	if (node.type === 'text') return node.value ?? '';
	if (Array.isArray(node.children)) return node.children.map(getText).join('');
	return '';
}

function getLang(preNode: any, codeEl: any): string {
	const classes = [
		...((preNode?.properties?.className as string[]) ?? []),
		...((codeEl?.properties?.className as string[]) ?? []),
	].map(String);

	const classLang = classes.map((c) => (c.startsWith('language-') ? c.slice(9) : '')).find(Boolean);

	const dataLang =
		codeEl?.properties?.['data-language'] ??
		codeEl?.properties?.dataLanguage ??
		preNode?.properties?.['data-language'] ??
		preNode?.properties?.dataLanguage ??
		'';

	return String(classLang || dataLang || '').toLowerCase();
}

/**
 * Rehype plugin: converts ```dot / ```graphviz / ```gv code fences to inline SVG.
 * Pure WASM – runs in Cloudflare Workers (no Node/DOM).
 */
export const rehypeGraphvizWasm: Plugin = () => {
	let gv: any = null; // Graphviz instance

	return async (tree: any) => {
		const tasks: Promise<void>[] = [];

		visit(tree, 'element', (preNode: any, index?: number, parent?: any) => {
			if (!parent || preNode.tagName !== 'pre') return;

			const codeEl = preNode.children?.[0];
			if (!codeEl || codeEl.tagName !== 'code') return;

			const lang = getLang(preNode, codeEl);
			if (!['dot', 'graphviz', 'gv'].includes(lang)) return;

			const dot = getText(codeEl).trim();
			if (!dot) return;

			const task = (async () => {
				if (!gv) {
					// Optional: Graphviz.wasmFolder('https://your-cdn/path/'); // pin WASM location if desired
					gv = await Graphviz.load(); // returns an instance (cached here)
				}

				const rawSvg = await gv.layout(dot, 'svg', 'dot');

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
