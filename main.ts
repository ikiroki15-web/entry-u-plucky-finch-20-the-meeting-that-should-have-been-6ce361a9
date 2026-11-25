// Entry for "The Meeting That Should Have Been an Email".
// Writes one joke line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The agenda had one bullet: read the email out loud, together, for an hour.";

// The gate only accepts 1-200 characters of non-blank, single-line UTF-8
// text, so refuse to write anything that would fail it instead of
// silently shipping an invalid entry.
function checkLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} characters, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  checkLine(JOKE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
}

main();
