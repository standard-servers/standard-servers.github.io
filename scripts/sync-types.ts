// Syncs each package's `src/index.ts` from standard-servers/proposals into the
// `<!-- types: <package> -->` ... `<!-- /types -->` sections of `public/index.html`.
//
// Usage:
//   node scripts/sync-types.ts                 # fetch from GitHub (main)
//   node scripts/sync-types.ts ../proposals    # read from a local checkout
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const upstream = "https://raw.githubusercontent.com/standard-servers/proposals/main";
const localDir = process.argv[2];

const htmlURL = new URL("../public/index.html", import.meta.url);
const html = await readFile(htmlURL, "utf8");

async function readTypes(name: string): Promise<string> {
	const path = `packages/${name}/src/index.ts`;
	if (localDir) {
		return readFile(resolve(localDir, path), "utf8");
	}
	const res = await fetch(`${upstream}/${path}`);
	if (!res.ok) {
		throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
	}
	return res.text();
}

const escapeHTML = (str: string) =>
	str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const section = /^([ \t]*)<!-- types: ([\w-]+) -->\n[\s\S]*?<!-- \/types -->/gm;

const names = [...html.matchAll(section)].map((match) => match[2]!);
if (names.length === 0) {
	throw new Error("No `<!-- types: <package> -->` sections found in public/index.html");
}

const types = new Map<string, string>();
for (const name of names) {
	types.set(name, (await readTypes(name)).trim());
}

const updated = html.replace(
	section,
	(_, indent: string, name: string) =>
		`${indent}<!-- types: ${name} -->\n` +
		`${indent}<pre><code data-lang="ts">${escapeHTML(types.get(name)!)}</code></pre>\n` +
		`${indent}<!-- /types -->`,
);

if (updated === html) {
	console.log("public/index.html types are up to date");
} else {
	await writeFile(htmlURL, updated);
	console.log(`Updated public/index.html types: ${names.join(", ")}`);
}
