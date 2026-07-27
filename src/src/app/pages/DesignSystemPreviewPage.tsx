import { useState } from 'react'
import {
  CalendarClock,
  CircleCheckBig,
  Download,
  Plus,
  ScanSearch,
  Send,
  Trash2,
  Undo2,
} from 'lucide-react'

import { AttachmentItem } from '@/components/ui/AttachmentItem'
import { Badge, CountIndicator } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Checkbox, Radio } from '@/components/ui/Checkbox'
import { Dialog } from '@/components/ui/Dialog'
import { Drawer } from '@/components/ui/Drawer'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { FilterBar, FilterChip, SearchField } from '@/components/ui/FilterBar'
import { FinancialKpi } from '@/components/ui/FinancialKpi'
import { FinancialValue } from '@/components/ui/FinancialValue'
import { FormField } from '@/components/ui/FormField'
import { IconButton } from '@/components/ui/IconButton'
import { AmountInput, Input, Select, Textarea } from '@/components/ui/Input'
import { CompletionIndicator } from '@/components/ui/Progress'
import { Skeleton, TableSkeleton } from '@/components/ui/Skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/ui/Table'
import { Tabs } from '@/components/ui/Tabs'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { useToast } from '@/components/ui/toast-context'
import { PageContainer } from '@/layouts/PageContainer'
import { PageHeader } from '@/layouts/PageHeader'

/**
 * TEMPORARY design-system review page (Step 05 only, not part of the main
 * navigation). It exists so the repository owner can visually review the
 * shared components with realistic Arabic treasury content before the real
 * pages are built in Steps 08–14. Deleted once the review is complete.
 */
export function DesignSystemPreviewPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { showToast } = useToast()

  return (
    <PageContainer>
      <PageHeader
        eyebrow="صفحة مراجعة مؤقتة — ليست جزءًا من التنقل الرئيسي"
        title="نظام التصميم"
        description="مراجعة بصرية للمكونات المشتركة وحالاتها قبل بناء صفحات الأعمال."
        primaryAction={
          <Button leadingIcon={Plus} onClick={() => showToast({ tone: 'success', title: 'تم حفظ المسودة', description: 'حُفظت التغييرات محليًا في النموذج التجريبي.' })}>
            إجراء أساسي
          </Button>
        }
        secondaryActions={<Button variant="secondary">إجراء ثانوي</Button>}
      />

      <div className="space-y-6">
        <Card>
          <SectionHeading title="الأزرار" description="الحالات: افتراضي، تحويم، تركيز، تعطيل، تحميل." />
          <div className="flex flex-wrap items-center gap-3">
            <Button>أساسي</Button>
            <Button variant="secondary">ثانوي</Button>
            <Button variant="ghost">خفيف</Button>
            <Button variant="danger" leadingIcon={Trash2}>حذف</Button>
            <Button disabled>معطل</Button>
            <Button loading>جارٍ الإرسال</Button>
            <IconButton icon={Download} label="تنزيل المرفق" variant="outline" />
          </div>
        </Card>

        <Card>
          <SectionHeading
            title="شارات الحالة"
            description="الوصفات البصرية التسع؛ يُستكمل ربطها برموز الحالات القانونية في الخطوة 07."
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral-outline">مسودة</Badge>
            <Badge variant="info-soft">مُقدَّم</Badge>
            <Badge variant="secondary-blue" icon={ScanSearch}>قيد المراجعة</Badge>
            <Badge variant="warning">بانتظار الاعتماد</Badge>
            <Badge variant="warning" icon={Undo2}>معاد للاستكمال</Badge>
            <Badge variant="success-restrained" icon={CircleCheckBig}>معتمد</Badge>
            <Badge variant="danger">مرفوض</Badge>
            <Badge variant="primary">وديعة نشطة</Badge>
            <Badge variant="neutral-dark">مستحقة</Badge>
            <Badge variant="neutral">مغلقة</Badge>
            <CountIndicator count={5} label="مهام معلقة" />
          </div>
        </Card>

        <Card>
          <SectionHeading title="مؤشرات مالية" description="أرقام لاتينية، فواصل آلاف ثابتة، أرقام جدولية (DEC-021)." />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <FinancialKpi
              label="إجمالي المحفظة"
              value={<FinancialValue value={2_450_000_000} kind="currency-compact" />}
              context="عبر 25 وديعة نشطة"
            />
            <FinancialKpi
              label="متوسط العائد"
              value={<FinancialValue value={5.42} kind="percent" />}
              context="على أساس 360 يومًا"
            />
            <FinancialKpi
              label="استحقاقات خلال 14 يومًا"
              value={<FinancialValue value={3} kind="number" />}
              context="تتطلب قرار إعادة استثمار"
            />
            <FinancialKpi
              label="أقرب استحقاق"
              value={<FinancialValue value="2026-08-09" kind="date" />}
              context="وديعة DEP-2026-0012"
            />
          </div>
          <div className="mt-6 max-w-sm">
            <CompletionIndicator percent={67} label="اكتمال إعداد الطلب" />
          </div>
        </Card>

        <Card padding="none">
          <div className="p-6 pb-0">
            <SectionHeading title="جدول مالي" description="رأس ثابت، أرقام جدولية، محاذاة متسقة، تفاعل صف." />
            <FilterBar className="mb-4">
              <SearchField label="بحث برقم الطلب أو البنك" value={search} onChange={setSearch} />
              <FilterChip label="الحالة: قيد المراجعة" onRemove={() => undefined} />
              <Button variant="ghost" size="sm">مسح عوامل التصفية</Button>
            </FilterBar>
          </div>
          <TableContainer className="rounded-none border-x-0 border-b-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>رقم الطلب</TableHeaderCell>
                  <TableHeaderCell>البنك</TableHeaderCell>
                  <TableHeaderCell numeric>المبلغ</TableHeaderCell>
                  <TableHeaderCell numeric>العائد</TableHeaderCell>
                  <TableHeaderCell>تاريخ الاستحقاق</TableHeaderCell>
                  <TableHeaderCell>الحالة</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow interactive>
                  <TableCell className="font-semibold"><bdi>IR-2026-0004</bdi></TableCell>
                  <TableCell>مصرف الراجحي</TableCell>
                  <TableCell numeric><FinancialValue value={85_000_000} /></TableCell>
                  <TableCell numeric><FinancialValue value={5.35} kind="percent" /></TableCell>
                  <TableCell><FinancialValue value="2026-12-31" kind="date" /></TableCell>
                  <TableCell><Badge variant="secondary-blue">قيد المراجعة</Badge></TableCell>
                </TableRow>
                <TableRow interactive>
                  <TableCell className="font-semibold"><bdi>IR-2026-0006</bdi></TableCell>
                  <TableCell>البنك الأهلي السعودي</TableCell>
                  <TableCell numeric><FinancialValue value={150_000_000} /></TableCell>
                  <TableCell numeric><FinancialValue value={5.6} kind="percent" /></TableCell>
                  <TableCell><FinancialValue value="2027-01-15" kind="date" /></TableCell>
                  <TableCell><Badge variant="warning">بانتظار الاعتماد</Badge></TableCell>
                </TableRow>
                <TableRow interactive>
                  <TableCell className="font-semibold"><bdi>IR-2026-0009</bdi></TableCell>
                  <TableCell>بنك الرياض</TableCell>
                  <TableCell numeric><FinancialValue value={45_500_000} /></TableCell>
                  <TableCell numeric><FinancialValue value={5.18} kind="percent" /></TableCell>
                  <TableCell><FinancialValue value="2026-10-20" kind="date" /></TableCell>
                  <TableCell><Badge variant="success-restrained">معتمد</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <SectionHeading title="نموذج إدخال" description="تسميات ظاهرة، تحقق فوري، حقول مالية." />
            <div className="space-y-4">
              <FormField label="مبلغ الاستثمار" required helper="الحد الأدنى للطلب 10,000,000 ر.س">
                <AmountInput placeholder="0" defaultValue="85,000,000" />
              </FormField>
              <FormField label="البنك" required>
                <Select defaultValue="">
                  <option value="" disabled>اختر البنك</option>
                  <option>مصرف الراجحي</option>
                  <option>البنك الأهلي السعودي</option>
                  <option>بنك الرياض</option>
                </Select>
              </FormField>
              <FormField label="مدة الوديعة" error="مدة الوديعة مطلوبة لحساب العائد المتوقع">
                <Input placeholder="12 شهرًا" />
              </FormField>
              <FormField label="ملاحظات التقييم">
                <Textarea placeholder="أدخل ملاحظات مقارنة العروض" />
              </FormField>
              <div className="flex flex-wrap gap-6">
                <Checkbox label="تضمين المرفقات في التقرير" defaultChecked />
                <Radio name="preview-tenor" label="6 أشهر" />
                <Radio name="preview-tenor" label="12 شهرًا" defaultChecked />
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeading title="سجل النشاط" description="أساسيات الخط الزمني: المنفذ، الوقت، النتيجة." />
            <Timeline>
              <TimelineItem
                icon={Send}
                title="تقديم طلب الاستثمار"
                meta="نورة العتيبي — 21 يوليو 2026"
              />
              <TimelineItem
                icon={ScanSearch}
                tone="warning"
                title="إعادة الطلب لاستكمال بيانات السيولة"
                meta="خالد القحطاني — 22 يوليو 2026"
              >
                سبب الإعادة: إرفاق تحديث رصيد الحساب الاستثماري قبل إعادة التقديم.
              </TimelineItem>
              <TimelineItem
                icon={CircleCheckBig}
                tone="success"
                title="اعتماد مدير عام الخزينة"
                meta="خالد القحطاني — 24 يوليو 2026"
                isLast
              />
            </Timeline>
            <SectionHeading title="المرفقات" className="mt-6" />
            <div className="space-y-2">
              <AttachmentItem
                name="تقرير-السيولة-يوليو-2026.pdf"
                meta="PDF · 1.4 م.ب · رُفع في 20 يوليو 2026"
                actions={<IconButton icon={Download} label="تنزيل المرفق" iconSize="sm" />}
              />
              <AttachmentItem
                name="عرض-مصرف-الراجحي-IR-2026-0004.pdf"
                meta="PDF · 820 ك.ب · رُفع في 21 يوليو 2026"
                actions={<IconButton icon={Download} label="تنزيل المرفق" iconSize="sm" />}
              />
            </div>
          </Card>
        </div>

        <Card>
          <SectionHeading title="تبويبات وحالات العرض" />
          <Tabs
            items={[
              {
                key: 'empty',
                label: 'حالة فارغة',
                content: (
                  <EmptyState
                    icon={CalendarClock}
                    title="لا توجد استحقاقات قادمة"
                    description="لا توجد ودائع تستحق خلال الأيام الأربعة عشر القادمة. تظهر الاستحقاقات هنا فور اقترابها."
                    action={<Button variant="secondary" size="sm">عرض محفظة الودائع</Button>}
                  />
                ),
              },
              {
                key: 'loading',
                label: 'حالة تحميل',
                content: (
                  <div>
                    <div className="mb-4 flex gap-4">
                      <Skeleton className="h-16 w-40" />
                      <Skeleton className="h-16 w-40" />
                    </div>
                    <TableSkeleton rows={3} />
                  </div>
                ),
              },
              {
                key: 'error',
                label: 'حالة خطأ',
                content: (
                  <ErrorState action={<Button variant="secondary" size="sm">إعادة المحاولة</Button>} />
                ),
              },
            ]}
          />
        </Card>

        <Card>
          <SectionHeading title="النوافذ والتنبيهات" description="حوار مُدار بالتركيز، درج جانبي من اليسار، تنبيهات من الأسفل." />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>فتح حوار تأكيد</Button>
            <Button variant="secondary" onClick={() => setDrawerOpen(true)}>فتح درج التفاصيل</Button>
            <Button
              variant="secondary"
              onClick={() => showToast({ tone: 'danger', title: 'تعذر تنفيذ التحويل', description: 'رقم الآيبان غير مكتمل. هذا التنبيه لا يختفي تلقائيًا.' })}
            >
              تنبيه خطأ
            </Button>
          </div>
        </Card>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="تأكيد تقديم الطلب"
        description="سيبدأ مسار الاعتماد فور التقديم ولن يمكن تعديل أقسام الإعداد."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>إلغاء</Button>
            <Button onClick={() => setDialogOpen(false)}>تأكيد التقديم</Button>
          </>
        }
      >
        <p className="text-body text-text-secondary">
          طلب الاستثمار <bdi className="ef-financial font-semibold">IR-2026-0004</bdi> بمبلغ{' '}
          <FinancialValue value={85_000_000} className="font-semibold" /> سيُحال إلى مدير عام الخزينة
          للمراجعة.
        </p>
      </Dialog>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="تفاصيل العرض">
        <div className="space-y-4">
          <FinancialKpi
            label="عرض مصرف الراجحي"
            value={<FinancialValue value={5.35} kind="percent" />}
            context="لمدة 12 شهرًا — عائد متوقع 4,548,958 ر.س"
          />
          <p className="text-body text-text-secondary">
            يُستخدم هذا الدرج لاحقًا لعرض تفاصيل العروض والمهام دون مغادرة سياق العمل.
          </p>
        </div>
      </Drawer>
    </PageContainer>
  )
}
