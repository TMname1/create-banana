import fs from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';

/**
 * Read all file contents under the specified directory and return an object.
 */
export default async (dir: string) => {
  // get all files including dotfiles
  const files = await fg('**/*', { cwd: dir, dot: true, onlyFiles: true });

  // sort to ensure snapshot consistency
  files.sort();

  const snapshot: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(dir, file);

    // For binary files (e.g., images), skip content comparison
    if (file.match(/\.(png|jpg|jpeg|gif|ico)$/)) {
      snapshot[file] = '__BINARY_FILE__';
      continue;
    }

    // Read text content
    const content = await fs.readFile(filePath, 'utf-8');

    snapshot[file] = content;
  }

  return snapshot;
};
