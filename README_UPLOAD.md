# موقع الدكتور فراس أسود وتطبيق Salat_FM

هذه الحزمة تحتوي الموقع الشخصي وصفحة Salat_FM بعد تحديث ملف Android الرسمي، مع الإبقاء على الإصدار `1.0.1` ورقم البناء `2`.

## ما تم تحديثه

- استبدال APK السابق بالنسخة الحديثة من مشروع `Salat_FM_1.0.1_Boot`.
- تحديث الحجم وبصمة SHA-256 في الموقع وملفات التحقق.
- إبراز تحسينات تشغيل شاشة المسجد بعد إعادة التشغيل.
- جعل GitHub Releases مسار التنزيل الأساسي حتى يظهر عدد التنزيلات الحقيقي المسجل لملفات Release assets.
- إبقاء نسخة APK مطابقة داخل `salat/assets/downloads/` كرابط احتياطي.
- إضافة GitHub Actions workflow ينشر `firas-prayer-display.apk` كـ Release asset جديد عند تحديث ملف APK على `main`، من دون تغيير versionName أو versionCode.

## بيانات APK

- الحزمة: `com.firas.prayer_displayer`
- الإصدار: `1.0.1`
- رقم البناء: `2`
- الحجم: `30.3 MB`
- SHA-256: `13d5cd4ae9028d0acd464c4878b2a43fa2d77e749548cbee9745e9a96336834d`

## الرفع إلى GitHub

المجلد يحتوي `.git` والفرع `main`. بعد فك الضغط:

```bash
git status
git push origin main
```

الـ commit الخاص بهذا التحديث موجود داخل الحزمة. بعد الـ push سيعمل Workflow تلقائيًا عندما يلاحظ تغيير ملف APK، وسيُنشئ GitHub Release يحمل نفس إصدار التطبيق وبناءه مع معرف نشر مشتق من commit فقط للحفاظ على سجل تنزيلات كل Asset.

بعد اكتمال Pages وActions اختبر:

- `https://faswad.github.io/salat/`
- زر التنزيل الأساسي عبر GitHub Releases.
- عداد إجمالي التنزيلات.
- رابط التنزيل الاحتياطي من الموقع.

لا ترفع مفاتيح توقيع التطبيق أو `key.properties` إلى مستودع الموقع.
