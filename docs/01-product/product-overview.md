# Product Overview

## Product Name

منصة إدارة الودائع الاستثمارية — النموذج التفاعلي

## Purpose

The prototype demonstrates how the Environment Fund can manage the complete lifecycle of investment deposit requests through one clear, controlled, and auditable workspace.

It is intended to help business stakeholders validate the operating model before production development begins.

## Business Context

The General Department of Treasury manages available liquidity, requests quotations from banks, evaluates received offers, obtains the required approvals, coordinates execution, and follows deposits through activation and maturity.

The prototype replaces fragmented email, document, and spreadsheet-based visibility with a unified simulated experience.

## Primary Business Object

The primary business object is the Investment Request.

One Deposit Specialist prepares the request progressively while its main status remains `مسودة`.

The request includes:

- Request and investment information.
- Liquidity justification and supporting files.
- Bank RFQ communication.
- Received bank offers.
- Evaluation and recommendation.
- Approval history.
- Winning-bank information.
- Investment Support review.
- Finance review.
- Accounting execution.
- Bank activation confirmation.

After activation, the completed request creates and links an Active Deposit record in the Deposit Portfolio.

## Prototype Objectives

The prototype must enable stakeholders to validate:

1. The end-to-end business process.
2. Approval thresholds and return paths.
3. Information required at each stage.
4. Role-based visibility and edit permissions.
5. The relationship between an Investment Request and an Active Deposit.
6. The usability of the request workspace.
7. Dashboard, task, portfolio, and reporting expectations.
8. The Environment Fund visual direction for the future platform.

## Main Modules

1. الصفحة الرئيسية
2. مهامي
3. محفظة الودائع
4. طلبات الاستثمار
5. التقارير والتحليلات
6. الإعدادات

## Users

The prototype includes the following primary roles:

- أخصائي الودائع.
- مدير عام الخزينة.
- الرئيس التنفيذي لقطاع الاستثمار والخزينة.
- أخصائي دعم الاستثمار.
- أخصائي المالية.
- أخصائي المحاسبة.
- مدير النظام.
- مستخدم للعرض فقط.

## Experience Principles

The product experience must be:

- Arabic-first and RTL.
- Clear for occasional executive approvers.
- Efficient for daily operational users.
- Financially credible.
- Auditable and transparent.
- Visually modern without unnecessary decoration.
- Suitable for desktop and tablet stakeholder demonstrations.

## Prototype Boundaries

The prototype uses local mock data and simulated interactions only.

It does not include:

- Real bank integrations.
- Real email delivery.
- Real Azure Entra ID authentication.
- Real Oracle Fusion Cloud ERP integration.
- Real accounting posting.
- A backend or database.
- Production security controls.
- Production deployment configuration.

## Success Definition

The prototype is successful when a stakeholder can:

1. Switch to a business role.
2. Understand what requires attention.
3. Open a realistic request.
4. Complete or review the appropriate stage.
5. Approve, reject, or return according to role.
6. Follow the full audit trail.
7. Execute the simulated financial steps.
8. Activate the deposit.
9. Find the resulting deposit in the portfolio.
10. Understand the future system without additional explanation.
