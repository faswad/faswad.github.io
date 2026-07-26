#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'PY2'
from pathlib import Path
import hashlib
root=Path('.')
idx=(root/'salat/index.html').read_text(encoding='utf-8')
privacy=(root/'salat/privacy.html').read_text(encoding='utf-8')
changelog=(root/'salat/changelog.html').read_text(encoding='utf-8')
config=(root/'salat/assets/js/config.js').read_text(encoding='utf-8')
apk=root/'salat/assets/downloads/firas-prayer-display.apk'
expected='13d5cd4ae9028d0acd464c4878b2a43fa2d77e749548cbee9745e9a96336834d'
assert apk.exists(), 'APK missing'
assert hashlib.sha256(apk.read_bytes()).hexdigest()==expected, 'APK SHA-256 mismatch'
for text in ['Salat_FM 1.0.1','Android 7.0 (API 24)','26 يوليو 2026','بوصلة مدمجة','المشكلات المعروفة','بصمة شهادة التوقيع SHA-256','supportDevice','supportModel','supportAndroid']:
    assert text in idx, f'missing: {text}'
assert 'releaseReady: true' in config
assert expected in config
assert 'Salat_FM 1.0.1' in changelog and 'Salat_FM 1.0.0' in changelog
assert 'البوصلة ومستشعرات الجهاز' in privacy
print('PASS — final Salat_FM 1.0.1 Build 2 website verified')
PY2
for js in salat/assets/js/*.js; do node --check "$js" >/dev/null; done
echo 'PASS — JavaScript syntax'
