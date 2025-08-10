import math
import json
from pathlib import Path


PRICES = {"pro": 89, "ent": 349, "ultra": 2500}

SCENARIOS = {
    # name: {month12 counts, net monthly growth}
    "Conservative": {"m12": {"pro": 250, "ent": 100, "ultra": 8}, "g": 0.06},
    "Base": {"m12": {"pro": 500, "ent": 200, "ultra": 20}, "g": 0.08},
    "Aggressive": {"m12": {"pro": 1500, "ent": 500, "ultra": 50}, "g": 0.10},
}


def backsolve_start(m12_counts: dict, g: float) -> dict:
    # Assume net growth applied for 11 steps (month 1 -> month 12)
    factor = (1.0 + g) ** 11
    return {k: max(1, round(v / factor)) for k, v in m12_counts.items()}


def grow_counts(start_counts: dict, g: float, months: int = 24) -> list:
    rows = []
    counts = dict(start_counts)
    for month in range(1, months + 1):
        if month == 1:
            month_counts = counts.copy()
        else:
            month_counts = {k: max(1, round(counts[k] * (1.0 + g))) for k in counts}
            counts = month_counts.copy()
        pro_mrr = month_counts["pro"] * PRICES["pro"]
        ent_mrr = month_counts["ent"] * PRICES["ent"]
        ultra_mrr = month_counts["ultra"] * PRICES["ultra"]
        total_mrr = pro_mrr + ent_mrr + ultra_mrr
        arr = total_mrr * 12
        rows.append({
            "month": month,
            "pro_subs": month_counts["pro"],
            "ent_subs": month_counts["ent"],
            "ultra_subs": month_counts["ultra"],
            "pro_mrr": pro_mrr,
            "ent_mrr": ent_mrr,
            "ultra_mrr": ultra_mrr,
            "total_mrr": total_mrr,
            "arr": arr,
        })
    return rows


def to_csv_lines(data: list, scenario: str) -> list:
    lines = []
    for r in data:
        lines.append(
            f"{scenario},{r['month']},{r['pro_subs']},{r['ent_subs']},{r['ultra_subs']},{r['pro_mrr']},{r['ent_mrr']},{r['ultra_mrr']},{r['total_mrr']},{r['arr']}"
        )
    return lines


def main():
    root = Path(__file__).resolve().parents[1]
    csv_path = root / "revenue_forecast.csv"
    html_path = root / "revenue_dashboard.html"

    header = "scenario,month,pro_subs,ent_subs,ultra_subs,pro_mrr,ent_mrr,ultra_mrr,total_mrr,arr"
    csv_lines = [header]
    dashboard = []

    for name, cfg in SCENARIOS.items():
        start = backsolve_start(cfg["m12"], cfg["g"])
        rows = grow_counts(start, cfg["g"], months=24)
        csv_lines.extend(to_csv_lines(rows, name))
        dashboard.append({"scenario": name, "rows": rows})

    csv_path.write_text("\n".join(csv_lines), encoding="utf-8")

    # Minimal HTML dashboard with embedded JSON
    html = f"""
<!doctype html>
<meta charset="utf-8"/>
<title>Suggestly Revenue Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  body{{font-family:system-ui,-apple-system,Segoe UI,Inter,sans-serif;margin:20px;color:#0b1220}}
  .card{{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:10px 0}}
  table{{width:100%;border-collapse:collapse}}
  th,td{{border-bottom:1px solid #eef2f7;padding:6px 8px;text-align:right}}
  th:first-child,td:first-child{{text-align:left}}
  h2{{margin:.2rem 0}}
  .muted{{color:#6b7280}}
</style>
<h1>Suggestly Revenue Dashboard</h1>
<p class="muted">Auto-generated from defaults. Prices: Pro ${PRICES['pro']}, Enterprise ${PRICES['ent']}, Ultra ${PRICES['ultra']}.</p>
<script>const DATA = {json.dumps(dashboard)};</script>
<div id="root"></div>
<script>
  const root = document.getElementById('root');
  DATA.forEach(({scenario, rows})=>{
    const card = document.createElement('div');
    card.className='card';
    const m12 = rows[11];
    const m24 = rows[23];
    card.innerHTML = `
      <h2>${{scenario}}</h2>
      <div class="muted">Month 12 MRR: $${{m12.total_mrr.toLocaleString()}} · ARR: $${{m12.arr.toLocaleString()}}</div>
      <div class="muted">Month 24 MRR: $${{m24.total_mrr.toLocaleString()}} · ARR: $${{m24.arr.toLocaleString()}}</div>
      <div style="overflow:auto;margin-top:8px">
        <table>
          <thead><tr><th>Month</th><th>Pro</th><th>Ent</th><th>Ultra</th><th>Total MRR</th><th>ARR</th></tr></thead>
          <tbody>
            ${rows.map(r=>`<tr><td>${r.month}</td><td>${r.pro_subs}</td><td>${r.ent_subs}</td><td>${r.ultra_subs}</td><td>$${r.total_mrr.toLocaleString()}</td><td>$${r.arr.toLocaleString()}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
    root.appendChild(card);
  });
</script>
"""
    html_path.write_text(html, encoding="utf-8")

    print(f"Wrote {csv_path}")
    print(f"Wrote {html_path}")


if __name__ == "__main__":
    main()





