# تنفيذ المرحلة 01: تأسيس مشروع الواجهة داخل `/src`

## الهدف
إنشاء الأساس التقني لتطبيق React عالي الجودة داخل مجلد `/src` فقط، دون تنفيذ صفحات الأعمال في هذه المرحلة.

## اقرأ قبل التنفيذ
1. `CLAUDE.md`
2. `docs/09-ai-governance/02-ai-coding-standards.md`
3. `docs/09-ai-governance/04-ai-definition-of-done.md`
4. `docs/07-brand-experience/00-brand-source-of-truth.md`
5. `docs/07-brand-experience/04-typography.md`
6. `docs/07-brand-experience/09-responsive-strategy.md`

## نطاق التنفيذ
أنشئ مشروع الواجهة كاملًا تحت `/src` باستخدام:

- React
- TypeScript strict
- Vite
- Tailwind CSS
- React Router
- ESLint
- Prettier عند الحاجة

يجب أن يعمل المشروع من خلال:

```bash
cd src
npm install
npm run dev
```

## الهيكل المطلوب
استخدم بنية واضحة وقابلة للتوسع، مثال:

```text
src/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── public/
│   └── brand/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── domain/
│   ├── services/
│   ├── mock-data/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   └── main.tsx
```

يمكن تحسين الهيكل إذا كان أكثر وضوحًا، لكن لا تضع التطبيق في ملف واحد ولا تنشئ تعقيدًا معماريًا غير ضروري.

## المتطلبات الأساسية
- ضبط `lang="ar"` و`dir="rtl"` على مستوى المستند.
- إنشاء نقطة دخول نظيفة للتطبيق.
- إعداد Tailwind وCSS variables دون اختراع نظام تصميم نهائي في هذه المرحلة.
- إعداد alias واضح مثل `@/`.
- إنشاء صفحة مؤقتة بسيطة جدًا تؤكد أن المشروع يعمل، دون Dashboard وهمي أو تصميم نهائي.
- إعداد scripts على الأقل: `dev`, `build`, `lint`, `typecheck`, `preview`.
- منع استخدام `any` إلا لسبب موثق ومحدود جدًا.
- عدم إضافة backend أو API أو authentication أو deployment أو GitHub Actions.
- عدم وضع أي ملف Frontend configuration في جذر الريبو.

## الأصول البصرية
- افحص الأصول الرسمية المتاحة في الريبو.
- انسخ فقط الأصول اللازمة للتشغيل إلى `src/public/brand/` بأسماء واضحة.
- لا ترفع ملفات الخطوط المرخصة.
- لا تعيد رسم الشعار أو تغيّر ألوانه.

## معايير القبول
- ينجح `npm run typecheck`.
- ينجح `npm run lint`.
- ينجح `npm run build`.
- يعمل التطبيق RTL دون overflow أفقي.
- لا توجد صفحات أعمال أو بيانات تجريبية مبكرة خارج النطاق.
- جميع ملفات الواجهة موجودة داخل `/src` فقط.

## تقرير الإنجاز
في النهاية اذكر باختصار:
- الملفات الرئيسية التي أُنشئت.
- القرارات التقنية المتخذة.
- أوامر التحقق ونتائجها.
- أي نقطة تحتاج قرارًا لاحقًا دون تخمين.