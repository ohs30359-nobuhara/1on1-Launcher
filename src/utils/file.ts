import fs from 'fs';
import path from 'path';

/**
 * ファイルの書き込み
 * @param buffer
 * @param fileName
 * @param distPath
 */
export function write(buffer: string, fileName: string, distPath: string) {
  const targetPath = path.join(__dirname, distPath);

// ディレクトリが存在しない場合は作成
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  const writePath: string = path.join(targetPath, fileName);
  fs.writeFileSync(writePath, buffer, 'utf-8');
}

/**
 * ファイルの読み込み
 * @param readPath
 */
export function read(readPath: string): string {
  const targetPath = path.join(__dirname, readPath);
  return fs.readFileSync(targetPath, 'utf-8');
}

/**
 * 指定したディレクトリ配下のファイル一覧を取得する
 * @param directoryPath
 */
export async function getFilesInDirectory(directoryPath: string): Promise<string[]> {
  try {
    const targetPath: string = path.join(__dirname, directoryPath);
    return await fs.promises.readdir(targetPath);
  } catch (err) {
    console.error('ディレクトリ読み込みエラー:', err);
    return [];
  }
}
