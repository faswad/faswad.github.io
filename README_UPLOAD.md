# رفع الموقع إلى GitHub Pages

هذه الحزمة تحتوي الموقع الشخصي وصفحة تطبيق **Salat_FM 2.6.5** بعد إعادة التصميم.

## قبل الرفع

لم يُرفق APK جديد مع تحديث الموقع. ملف APK الموجود داخل الحزمة هو الملف الذي كان موجوداً في الموقع القديم. عند توفر APK النهائي الموقّع، حدّثه بالأمر:

```bash
python3 tools/update_apk_metadata.py /المسار/إلى/firas-prayer-display.apk
```

سيتم تحديث الملف والحجم وبصمة SHA-256 تلقائياً.

## الرفع

انسخ محتويات هذا المجلد إلى جذر مستودع `faswad.github.io` ثم نفّذ:

```bash
git add .
git commit -m "Redesign Salat_FM 2.6.5 website"
git push origin main
```

## روابط الفحص بعد الرفع

- `https://faswad.github.io/`
- `https://faswad.github.io/salat/`
- `https://faswad.github.io/salat/assets/downloads/firas-prayer-display.apk`

## الملفات الأساسية

- صفحة التطبيق: `salat/index.html`
- التصميم: `salat/assets/css/style-wide.css`
- إعدادات النسخة وAPK: `salat/assets/js/config.js`
- ملف التطبيق: `salat/assets/downloads/firas-prayer-display.apk`
- تحديث APK آلياً: `tools/update_apk_metadata.py`
