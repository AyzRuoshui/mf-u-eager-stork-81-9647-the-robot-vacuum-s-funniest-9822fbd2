import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * 参赛作品单行文本（终稿）：
 * 明确说明漏扫原因，以传感器三段式读数反转制造机器认栽式幽默，并自然融入地毯、宠物毛发、灰尘、吸力与充电座意象。
 */
export const EXCUSE =
  "I missed that rug spot: sensors read 90% pet hair, 10% dust, and 0% suction left to give. Back on my charging dock.";

const MAX_CODE_POINTS = 120;
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";
const CONTROL_CHAR_RE = /[\u0000-\u001F\u007F]/;

export interface ValidatedEntry {
  text: string;
  codePoints: number;
  bytes: number;
}

/**
 * 校验参赛文本是否满足赛道门控要求：
 * 1. 不含换行或 ASCII 控制字符；
 * 2. 非空、非纯空白且无首尾多余空白；
 * 3. Unicode 码点长度在 1 到 120 之间。
 */
export function validateExcuse(text: string): ValidatedEntry {
  if (CONTROL_CHAR_RE.test(text)) {
    throw new Error("Entry must be a single line without control characters.");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be empty or whitespace-only.");
  }
  if (text !== text.trim()) {
    throw new Error("Entry must not contain leading or trailing whitespace.");
  }
  const codePoints = Array.from(text).length;
  if (codePoints < 1 || codePoints > MAX_CODE_POINTS) {
    throw new Error(
      `Entry length ${codePoints} exceeds allowed range 1..${MAX_CODE_POINTS}.`,
    );
  }
  const bytes = Buffer.byteLength(text, "utf8");
  return { text, codePoints, bytes };
}

/**
 * 将校验通过的单行借口写入目标路径（默认 /output/entry.txt）。
 */
export function writeEntry(outputPath: string = DEFAULT_OUTPUT_PATH): ValidatedEntry {
  const validated = validateExcuse(EXCUSE);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, validated.text, "utf8");
  return validated;
}

const isMainModule =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isMainModule) {
  const envPath = process.env.ENTRY_OUTPUT_PATH?.trim();
  const targetPath = envPath && envPath.length > 0 ? envPath : DEFAULT_OUTPUT_PATH;
  writeEntry(targetPath);
}
