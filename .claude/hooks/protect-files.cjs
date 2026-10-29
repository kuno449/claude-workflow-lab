let s = '';
process.stdin.on('data', d => (s += d)).on('end', () => {
  const input = JSON.parse(s || '{}');
  // Windowsの区切り文字 \ を / にそろえてから判定する
  const f = (input.tool_input?.file_path || '').replace(/\\/g, '/');
  if (/(^|\/)\.env(\.|$)|package-lock\.json$/.test(f)) {
    console.error(`このファイルは編集禁止です: ${f}`);
    process.exit(2);
  }
  process.exit(0);
});