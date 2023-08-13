import fs from 'fs';
import path from 'path';

/**
 * ファイルの書き込み
 * @param buffer
 * @param fileName
 * @param distPath
 */
export function write(buffer: string, fileName: string, distPath: string) {
  const outputDirectory = path.join(__dirname, distPath); // プロジェクトディレクトリ/output

// ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  const writePath: string = path.join(outputDirectory, fileName);
  fs.writeFileSync(writePath, buffer, 'utf-8');
}

/**
 * ファイルの読み込み
 * @param readPath
 */
export function read(readPath: string): string {
  return fs.readFileSync(readPath, 'utf-8');
}

/**
 * 指定したディレクトリ配下のファイル一覧を取得する
 * @param directoryPath
 */
async function getFilesInDirectory(directoryPath: string) {
  try {
    return await fs.promises.readdir(directoryPath);
  } catch (err) {
    console.error('ディレクトリ読み込みエラー:', err);
    return [];
  }
}
