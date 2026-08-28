import { financialAxisSlugs, type FinancialAmounts, type FinancialAxisSlug } from "@/lib/financial-data";

export const dynamic = "force-dynamic";

type SupabaseRow = Record<string, unknown>;

const aliases: Record<FinancialAxisSlug, string[]> = {
  economia: ["economia", "economico", "productiv", "emprend"],
  "prevencion-violencia": ["violencia", "prevencion"],
  salud: ["salud", "citologia", "esterilizacion"],
  participacion: ["participacion", "liderazgo", "empoderamiento"],
  educacion: ["educacion", "escolar", "beca"],
  ambiente: ["ambiente", "ambiental", "areas verdes"],
};

const emptyAmounts = (): FinancialAmounts => ({ budget: 0, executed: 0, committed: 0 });
const numberValue = (value: unknown) => {
  const parsed = typeof value === "number" ? value : Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};
const normalize = (value: unknown) => String(value ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const rowLabel = (row: SupabaseRow) => normalize(
  row.eje ?? row.axis ?? row.categoria ?? row.nombre_eje ?? row.actividad ?? row.obra ?? row.programa,
);

const rowAxis = (row: SupabaseRow) => {
  const explicitSlug = normalize(row.eje_slug ?? row.axis_slug).replace(/\s+/g, "-");
  if (financialAxisSlugs.includes(explicitSlug as FinancialAxisSlug)) return explicitSlug as FinancialAxisSlug;
  const label = rowLabel(row);
  return financialAxisSlugs.find((slug) => aliases[slug].some((alias) => label.includes(alias)));
};

const amountsFromRow = (row: SupabaseRow): FinancialAmounts => ({
  budget: numberValue(row.montoEjecutable ?? row.presupuesto_vigente ?? row.presupuesto ?? row.budget ?? row.monto_permitido),
  executed: numberValue(row.montoEjecutado ?? row.ejecutado ?? row.executed ?? row.devengado),
  committed: numberValue(row.montoComprometido ?? row.comprometido ?? row.committed),
});

const addAmounts = (target: FinancialAmounts, source: FinancialAmounts) => {
  target.budget += source.budget;
  target.executed += source.executed;
  target.committed += source.committed;
};

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const apiKey = process.env.SUPABASE_ANON_KEY;
  const rpcName = process.env.SUPABASE_RPC_NAME;
  if (!url || !apiKey || !rpcName) {
    return Response.json({ error: "Falta configurar la conexión con Supabase." }, { status: 503 });
  }

  let rpcParams: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(process.env.SUPABASE_RPC_PARAMS ?? "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) rpcParams = parsed;
  } catch {
    return Response.json({ error: "SUPABASE_RPC_PARAMS no contiene JSON válido." }, { status: 500 });
  }

  const schema = process.env.SUPABASE_SCHEMA ?? "public";
  const token = process.env.SUPABASE_ACCESS_TOKEN ?? apiKey;
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/${encodeURIComponent(rpcName)}`, {
    method: "POST",
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept-Profile": schema,
      "Content-Profile": schema,
    },
    body: JSON.stringify(rpcParams),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    return Response.json({ error: "Supabase no devolvió datos financieros." }, { status: 502 });
  }

  const payload: unknown = await response.json();
  const report = payload && typeof payload === "object" && !Array.isArray(payload) ? payload as SupabaseRow : null;
  const rawRows = Array.isArray(payload) ? payload : Array.isArray(report?.ejes) ? report.ejes : [];
  const rows = rawRows.filter((row): row is SupabaseRow => Boolean(row) && typeof row === "object");
  const axes: Partial<Record<FinancialAxisSlug, FinancialAmounts>> = {};
  const totals = emptyAmounts();

  for (const row of rows) {
    const amounts = amountsFromRow(row);
    addAmounts(totals, amounts);
    const slug = rowAxis(row);
    if (slug) {
      axes[slug] ??= emptyAmounts();
      addAmounts(axes[slug], amounts);
    }
  }

  if (report) {
    totals.budget = numberValue(report.ejecutableGeneralGrupo ?? report.montoVigenteGrupo) || totals.budget;
    totals.executed = numberValue(report.montoEjecutadoGrupo) || totals.executed;
    totals.committed = numberValue(report.montoComprometidoGrupo) || totals.committed;
  }

  return Response.json({
    fiscalYear: Number(process.env.FINANCIAL_FISCAL_YEAR ?? 2026),
    axes,
    totals,
    updatedAt: new Date().toISOString(),
  }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
