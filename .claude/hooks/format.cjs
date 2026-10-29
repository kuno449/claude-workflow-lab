const { execSync } = require('child_process');
let s = '';
process.stdin.on('data', d => (s += d)).on('end', () => {
  const f = JSON.parse(s || '{}').tool_input?.file_path || '';
  if (/\.(tsx?|jsx?|css|md|json)$/.test(f)) {
    try { execSync(`npx prettier --write "${f}"`, { stdio: 'ignore' }); } catch {}
  }
  process.exit(0);
});