import { CircleCheck } from 'lucide-react'

/*
 * Temporary technical verification screen for Step 04 only.
 * It confirms that the toolchain works and is replaced by the real
 * application shell in Step 05. It is not a business page.
 */

const verifiedItems = [
  'React مع TypeScript بالوضع الصارم',
  'أداة البناء Vite',
  'أنماط Tailwind CSS مع متغيرات ألوان الهوية الرسمية',
  'التوجيه عبر React Router',
  'الاستيراد عبر الاسم المستعار ‎@/‎',
  'أيقونات Lucide',
  'اللغة العربية واتجاه RTL على مستوى المستند',
]

export function SetupVerificationScreen() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-lg border border-ef-brown/30 bg-ef-white p-8">
        <p className="text-sm text-ef-brown">صندوق البيئة</p>
        <h1 className="mt-1 text-2xl font-bold text-ef-primary-blue">
          منصة إدارة الودائع الاستثمارية
        </h1>
        <p className="mt-3 text-sm leading-6">
          شاشة تحقق تقني مؤقتة للمرحلة الرابعة (تأسيس مشروع الواجهة). تؤكد هذه
          الشاشة جاهزية البيئة التقنية فقط، وستُستبدل بواجهة التطبيق الفعلية في
          المراحل التالية.
        </p>
        <ul className="mt-6 space-y-2">
          {verifiedItems.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <CircleCheck
                aria-hidden="true"
                className="size-4 shrink-0 text-ef-secondary-blue"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-ef-warm-grey pt-4 text-xs text-ef-navy/70">
          الأصول الرسمية للهوية البصرية لم تُرفع بعد (B-01)، لذلك لا يظهر الشعار
          في هذه الشاشة.
        </p>
      </section>
    </main>
  )
}
