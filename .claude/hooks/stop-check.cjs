const { execSync } = require('child_process');
const fs = require('fs');
let s = '';
process.stdin.on('data', d => (s += d)).on('end', () => {
  const input = JSON.parse(s || '{}');
  // 2回目の停止では止めない（無限ループを防ぐ）
  if (input.stop_hook_active) process.exit(0);
  // ドライブ文字が小文字 (c:\) だと Vitest が二重に読み込まれて失敗するため、実際の表記にそろえる
  const cwd = fs.realpathSync.native(process.env.CLAUDE_PROJECT_DIR || process.cwd());
  for (const cmd of ['npm run lint', 'npm test']) {
    try {
      execSync(cmd, { cwd, stdio: 'pipe' });
    } catch (e) {
      const out = `${e.stdout || ''}${e.stderr || ''}`.split('\n').slice(-40).join('\n');
      console.error(`「${cmd}」が失敗しています。修正してから終了してください。\n${out}`);
      process.exit(2);
    }
  }
  process.exit(0);
});