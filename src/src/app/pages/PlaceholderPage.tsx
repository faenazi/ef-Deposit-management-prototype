import { ArrowUpLeft, CheckCircle2, Clock3, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

import { BrandPattern } from '@/components/brand/BrandPattern'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: LucideIcon
  stepNote: string
}

const routeCapabilities: Record<string, readonly string[]> = {
  مهامي: ['قائمة إجراءات حسب الدور', 'ترتيب حسب الأولوية والاستحقاق', 'وصول مباشر إلى ملف المعاملة'],
  'محفظة الودائع': ['متابعة أصل الودائع والعائد', 'قرارات الاستحقاق القادمة', 'تحليل التعرض حسب البنك'],
  'طلبات الاستثمار': ['المسودات وطلبات الاعتماد', 'المرحلة والمسؤول والإجراء التالي', 'الربط بالوديعة بعد التفعيل'],
  'طلب استثمار جديد': ['إنشاء المسودة', 'استكمال الأقسام تدريجيًا', 'التحقق من الجاهزية قبل التقديم'],
  'تفاصيل الوديعة': ['الملخص المالي وشروط الوديعة', 'قرار الاستحقاق والمرفقات', 'الربط بطلب الاستثمار الأصلي'],
  'مساحة عمل طلب الاستثمار': ['سياق المعاملة والمرحلة الحالية', 'أقسام الإعداد والمراجعة', 'الاعتمادات وسجل النشاط'],
  'التقارير والتحليلات': ['موجز المحفظة', 'الاستحقاقات والتعرض البنكي', 'تحليل دورة الطلبات'],
  الإعدادات: ['المستخدمون والأدوار', 'البنوك والبيانات المرجعية', 'قواعد العرض التجريبي'],
}

export function PlaceholderPage({ title, description, icon, stepNote }: PlaceholderPageProps) {
  const capabilities = routeCapabilities[title] ?? []

  return (
    <PageContainer>
      <PageHeader eyebrow="وحدة ضمن خطة التنفيذ" title={title} description={description} />

      <section className="relative overflow-hidden rounded-lg border border-border-default bg-surface">
        <BrandPattern
          asset="pattern-secondary"
          placement="bottom-end"
          opacity="subtle"
          scale="hero"
        />
        <div className="relative grid min-h-[26rem] items-center gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:p-12">
          <div>
            <div className="flex size-12 items-center justify-center rounded-md bg-action-primary text-white">
              <Icon icon={icon} size="lg" />
            </div>
            <Badge variant="primary" className="mt-5" icon={Clock3}>
              مخطط لها
            </Badge>
            <h2 className="mt-4 text-h2 font-bold text-text-primary">
              الهيكل البصري جاهز لاستقبال الوحدة
            </h2>
            <p className="mt-3 max-w-xl text-body-lg text-text-secondary">
              تظهر هذه الصفحة ضمن التنقل والصلاحيات الحالية، وستُفعّل وظائفها التشغيلية في
              مرحلتها المعتمدة دون استباق قواعد العمل.
            </p>
            <p className="mt-3 text-small text-text-muted">{stepNote}</p>
            <Link to="/" className="mt-6 inline-block">
              <Button variant="secondary" trailingIcon={ArrowUpLeft}>
                العودة إلى الصفحة الرئيسية
              </Button>
            </Link>
          </div>

          <div className="rounded-lg border border-border-default bg-surface-raised p-5 md:p-6">
            <p className="text-small font-semibold text-action-primary">ما ستغطيه الوحدة</p>
            <ul className="mt-4 space-y-4">
              {capabilities.map((capability) => (
                <li key={capability} className="flex items-center gap-3 text-body text-text-primary">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-success-bg text-success-text">
                    <Icon icon={CheckCircle2} size="sm" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-border-default pt-4 text-small text-text-secondary">
              لن تُعرض إجراءات أو بيانات غير مكتملة قبل اعتماد وتنفيذ نطاق الصفحة.
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
