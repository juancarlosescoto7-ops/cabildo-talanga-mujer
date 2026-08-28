export const financialAxisSlugs = [
  "economia",
  "prevencion-violencia",
  "salud",
  "participacion",
  "educacion",
  "ambiente",
] as const;

export type FinancialAxisSlug = (typeof financialAxisSlugs)[number];

export type FinancialAmounts = {
  budget: number;
  executed: number;
  committed: number;
};

export type FinancialData = {
  fiscalYear: number;
  axes: Partial<Record<FinancialAxisSlug, FinancialAmounts>>;
  totals: FinancialAmounts;
  updatedAt: string;
};

export const financialAxisSlugByIndex = financialAxisSlugs;

