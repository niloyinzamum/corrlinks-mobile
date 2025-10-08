import fs from 'fs';
import path from 'path';

function ensureDirectoryExists(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  export default ensureDirectoryExists;