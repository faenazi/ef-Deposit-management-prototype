import type { EvaluationCriterion } from '@/domain/offer'

/**
 * The seven prototype evaluation criteria (domain-model.md —
 * EvaluationCriterion). Reference data managed by the administrator;
 * weights total 100.
 */
export const evaluationCriteria: readonly EvaluationCriterion[] = [
  {
    id: 'CRT-001',
    code: 'ANNUAL_RATE',
    nameAr: 'معدل العائد السنوي',
    weight: 30,
    isActive: true,
    calculationType: 'CALCULATED',
  },
  {
    id: 'CRT-002',
    code: 'EXPECTED_RETURN',
    nameAr: 'العائد المتوقع',
    weight: 20,
    isActive: true,
    calculationType: 'CALCULATED',
  },
  {
    id: 'CRT-003',
    code: 'CONCENTRATION_IMPACT',
    nameAr: 'أثر التركز البنكي',
    weight: 15,
    isActive: true,
    calculationType: 'CALCULATED',
  },
  {
    id: 'CRT-004',
    code: 'VALIDITY_PERIOD',
    nameAr: 'مدة سريان العرض',
    weight: 10,
    isActive: true,
    calculationType: 'CALCULATED',
  },
  {
    id: 'CRT-005',
    code: 'TENOR_ALIGNMENT',
    nameAr: 'ملاءمة مدة الاستثمار',
    weight: 10,
    isActive: true,
    calculationType: 'MANUAL',
  },
  {
    id: 'CRT-006',
    code: 'OPERATIONAL_READINESS',
    nameAr: 'الجاهزية التشغيلية',
    weight: 10,
    isActive: true,
    calculationType: 'MANUAL',
  },
  {
    id: 'CRT-007',
    code: 'SPECIAL_CONDITIONS',
    nameAr: 'الشروط الخاصة',
    weight: 5,
    isActive: true,
    calculationType: 'MANUAL',
  },
]
