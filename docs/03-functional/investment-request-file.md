# Investment Request File

## Purpose

Represent each investment request as a complete transaction workspace, not as one long form.

## Page Anatomy

1. Transaction header.
2. Current status and owner.
3. Amount, tenor, dates, and priority summary.
4. Workflow progress indicator.
5. Section navigation.
6. Main section workspace.
7. Contextual summary panel.
8. Sticky action area.
9. Activity and audit history.

## Sections

- نظرة عامة
- معلومات الطلب
- معلومات السيولة
- التواصل مع البنوك
- العروض المستلمة
- التقييم والتوصية
- سجل الاعتمادات
- بيانات البنك الفائز
- مراجعة دعم الاستثمار
- مراجعة المالية
- تنفيذ المحاسبة
- تفعيل الوديعة
- المرفقات
- الملاحظات
- سجل النشاط

## Draft Experience

The main request status remains `مسودة` until submission. Each preparation section has an independent completion indicator:

- لم يبدأ
- قيد الاستكمال
- مكتمل
- توجد نواقص

Display:

- Overall completion percentage.
- Last saved timestamp.
- Draft owner.
- Missing mandatory requirements.
- Readiness checklist.

## Editability

Section editability depends on the active role and workflow stage. Locked sections remain visible when permitted, with a clear read-only indication.

## Submission

The submission action is enabled only when readiness validation passes. Before submission, show a confirmation dialog summarizing:

- Request amount.
- Approval route.
- Recommended bank and offer.
- Mandatory attachment status.
- Completeness confirmation.

## Returned Requests

A returned request must show:

- Return source.
- Return reason.
- Return date.
- Sections requiring attention.
- Resubmission action.

Previous approvals and activities must remain visible.

## Activity History

Record meaningful events such as creation, edits, attachment changes, submission, approval, return, rejection, execution, and activation. Use realistic timestamps and user identities.

## UX Requirements

- Avoid a wizard that hides context.
- Preserve section navigation while scrolling.
- Keep the primary action visible without obstructing content.
- Use progressive disclosure for secondary details.
- Avoid excessive nested cards.
