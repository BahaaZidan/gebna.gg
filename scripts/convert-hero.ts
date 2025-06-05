/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

/**
 * Recursively finds all files named 'hero.jpg' or 'hero.png'.
 */
function findHeroImageFiles(dir: string, results: string[] = []): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			findHeroImageFiles(fullPath, results);
		} else if (
			entry.isFile() &&
			(entry.name.toLowerCase() === 'hero.jpg' || entry.name.toLowerCase() === 'hero.png')
		) {
			results.push(fullPath);
		}
	}

	return results;
}

/**
 * Converts image to WEBP and renames the original file.
 */
async function convertAndRename(inputPath: string): Promise<void> {
	const ext = path.extname(inputPath).toLowerCase(); // .jpg or .png
	const dir = path.dirname(inputPath);
	const base = path.basename(inputPath, ext); // "hero"
	const webpPath = path.join(dir, `${base}.webp`);
	const ogPath = path.join(dir, `og${ext}`);

	try {
		// Convert to WEBP
		await sharp(inputPath).webp({ quality: 80 }).toFile(webpPath);
		console.log(`Converted: ${inputPath} → ${webpPath}`);

		// Rename original to og.jpg or og.png
		fs.renameSync(inputPath, ogPath);
		console.log(`Renamed: ${inputPath} → ${ogPath}`);
	} catch (err) {
		console.error(`Failed to process ${inputPath}:`, err);
	}
}

/**
 * Main function to process all matching images.
 */
async function main() {
	const startDir = process.cwd();
	const heroImages = findHeroImageFiles(startDir);

	for (const file of heroImages) {
		await convertAndRename(file);
	}
}

main().catch((err) => {
	console.error('Error during processing:', err);
});
