# موقع الدكتور فراس أسود وتطبيق شاشة مواقيت الصلاة

هذه الحزمة تحتوي الموقع الشخصي وصفحة تطبيق الصلاة بعد تحديثها للإصدار 2.5.11+58.

## ما تم تحديثه

- إضافة ملف التطبيق الرسمي مباشرة داخل الموقع:
  `salat/assets/downloads/firas-prayer-display.apk`
- تحديث معلومات الإصدار والحجم وبصمة SHA-256.
- إضافة قسم واضح للجديد في الإصدار 2.5.11.
- إبراز عمل الأذان والتنبيهات في الخلفية وبعد إعادة تشغيل الهاتف.
- إضافة تذكير وضع الهاتف على الصامت وشاشة الأذكار وشريط الأحاديث.
- توضيح صيانة التخزين والتنظيف التلقائي كل 10 أيام.
- تحديث تعليمات التثبيت والتحذير الطبيعي عند تثبيت APK خارج Google Play.
- الإبقاء على ملاحظة أن مواقيت مدينة الموصل هي الإعداد الافتراضي.
- تحسين وصف المشروع في الصفحة الشخصية.

## بيانات ملف APK

- اسم الملف: `firas-prayer-display.apk`
- الحزمة: `com.firas.prayer_displayer`
- الإصدار: `2.5.11`
- رقم البناء: `58`
- الحجم: `39.0 MB` تقريباً
- SHA-256:
  `e98046df229677bf907845f84d1230b634f5a0d1ca12768b517d3d37dd13c3b4`
- التوقيع: APK Signature Scheme v2

## الرفع إلى GitHub Pages

1. استبدل ملفات المستودع بمحتويات مجلد `faswad.github.io`.
2. لا تحذف مجلد `.git` من نسختك المحلية الحالية.
3. نفّذ:

```bash
git add .
git commit -m "Update Salat app website to 2.5.11"
git push origin main
```

4. اختبر:

- `https://faswad.github.io/`
- `https://faswad.github.io/salat/`
- `https://faswad.github.io/salat/assets/downloads/firas-prayer-display.apk`

## عند إصدار نسخة جديدة

استبدل ملف APK بنفس الاسم، ثم حدّث القيم داخل:

`salat/assets/js/config.js`

وأنشئ بصمة جديدة:

```bash
shasum -a 256 salat/assets/downloads/firas-prayer-display.apk
```
