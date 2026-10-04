#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

python3 - <<'PY'
from pathlib import Path
import re, sys

root = Path('.')
errors = []

skill = root / 'SKILL.md'
if not skill.exists():
    errors.append('SKILL.md is missing')
else:
    text = skill.read_text(encoding='utf-8')
    if not text.startswith('---\n'):
        errors.append('SKILL.md is missing YAML frontmatter')
    else:
        end = text.find('\n---\n', 4)
        if end == -1:
            errors.append('SKILL.md frontmatter is not closed')
        else:
            fm = text[4:end]
            if not re.search(r'^name:\s*[^\s]+\s*$', fm, re.M):
                errors.append('SKILL.md frontmatter missing name')
            if not re.search(r'^description:\s*.+$', fm, re.M):
                errors.append('SKILL.md frontmatter missing description')
            if len(text.split()) > 900:
                errors.append(f'SKILL.md is too large ({len(text.split())} words); keep routing instructions concise and move detail to references')

for path in re.findall(r'`(references/[^`]+\.md)`', skill.read_text(encoding='utf-8')):
    if not (root / path).exists():
        errors.append(f'missing referenced file: {path}')
for path in re.findall(r'`(checklists/[^`]+\.md)`', skill.read_text(encoding='utf-8')):
    if not (root / path).exists():
        errors.append(f'missing referenced checklist: {path}')

for md in root.rglob('*.md'):
    if md.parts[0] == '.git':
        continue
    text = md.read_text(encoding='utf-8', errors='replace')
    if '\x00' in text:
        errors.append(f'binary/NUL content in markdown: {md}')

if errors:
    print('VALIDATION FAILED')
    for e in errors:
        print(f'- {e}')
    sys.exit(1)

print('VALIDATION PASSED')
print(f'- SKILL.md words: {len(skill.read_text(encoding="utf-8").split())}')
print(f'- references: {len(list((root / "references").glob("*.md")))}')
print(f'- checklists: {len(list((root / "checklists").glob("*.md")))}')
print(f'- scenarios: {len(list((root / "tests/scenarios").glob("*.md")))-1}')
PY
