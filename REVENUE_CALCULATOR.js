/**
 * @fileoverview Revenue Forecasting Calculator
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Comprehensive financial modeling and revenue projection system
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

class RevenueCalculator {
  constructor() {
    this.plans = {
      free: { price: 0, features: "Basic access" },
      starter: { price: 9.99, features: "Unlimited AI requests" },
      pro: { price: 29.99, features: "Advanced features" },
      enterprise: { price: 99.99, features: "Custom solutions" },
    };

    this.annualDiscount = 0.17; // 17% discount for annual plans
    this.defaultConversionRates = {
      month1: 0.02,
      month3: 0.04,
      month6: 0.07,
      month12: 0.1,
    };

    this.defaultChurnRates = {
      starter: 0.08,
      pro: 0.05,
      enterprise: 0.03,
    };
  }

  // Calculate Monthly Recurring Revenue (MRR)
  calculateMRR(
    users,
    conversionRate,
    planDistribution = { starter: 0.6, pro: 0.3, enterprise: 0.1 }
  ) {
    const paidUsers = users * conversionRate;
    let mrr = 0;

    Object.keys(planDistribution).forEach((plan) => {
      if (this.plans[plan]) {
        mrr += paidUsers * planDistribution[plan] * this.plans[plan].price;
      }
    });

    return {
      totalUsers: users,
      paidUsers: paidUsers,
      mrr: mrr,
      arr: mrr * 12,
      planBreakdown: Object.keys(planDistribution).map((plan) => ({
        plan: plan,
        users: paidUsers * planDistribution[plan],
        revenue: paidUsers * planDistribution[plan] * this.plans[plan].price,
      })),
    };
  }

  // Project growth over time
  projectGrowth(
    initialUsers,
    months,
    growthRate = 0.15,
    conversionGrowth = 0.02
  ) {
    const projections = [];
    let currentUsers = initialUsers;
    let currentConversion = this.defaultConversionRates.month1;

    for (let month = 1; month <= months; month++) {
      // Update conversion rate based on time
      if (month <= 3) currentConversion = this.defaultConversionRates.month1;
      else if (month <= 6)
        currentConversion = this.defaultConversionRates.month3;
      else if (month <= 12)
        currentConversion = this.defaultConversionRates.month6;
      else currentConversion = this.defaultConversionRates.month12;

      const mrrData = this.calculateMRR(currentUsers, currentConversion);

      projections.push({
        month: month,
        users: currentUsers,
        mrr: mrrData.mrr,
        arr: mrrData.arr,
        paidUsers: mrrData.paidUsers,
        conversionRate: currentConversion,
      });

      // Grow user base
      currentUsers = Math.floor(currentUsers * (1 + growthRate));
    }

    return projections;
  }

  // Calculate Customer Lifetime Value (CLV)
  calculateCLV(plan, retentionMonths = null) {
    const planData = this.plans[plan];
    if (!planData) return 0;

    const monthlyRevenue = planData.price;
    const retention = retentionMonths || this.getRetentionMonths(plan);

    return monthlyRevenue * retention;
  }

  // Get retention months based on plan
  getRetentionMonths(plan) {
    const retentionRates = {
      starter: 18,
      pro: 24,
      enterprise: 36,
    };
    return retentionRates[plan] || 12;
  }

  // Calculate Customer Acquisition Cost (CAC) payback
  calculateCACPayback(cac, plan) {
    const clv = this.calculateCLV(plan);
    const monthlyRevenue = this.plans[plan].price;

    return {
      cac: cac,
      clv: clv,
      paybackMonths: cac / monthlyRevenue,
      clvCacRatio: clv / cac,
    };
  }

  // Calculate churn impact
  calculateChurnImpact(users, plan, months = 12) {
    const churnRate = this.defaultChurnRates[plan] || 0.05;
    const monthlyRevenue = this.plans[plan].price;

    let remainingUsers = users;
    let totalRevenue = 0;
    const monthlyBreakdown = [];

    for (let month = 1; month <= months; month++) {
      const monthlyRevenueTotal = remainingUsers * monthlyRevenue;
      totalRevenue += monthlyRevenueTotal;

      monthlyBreakdown.push({
        month: month,
        users: remainingUsers,
        revenue: monthlyRevenueTotal,
        churned: Math.floor(remainingUsers * churnRate),
      });

      remainingUsers = Math.floor(remainingUsers * (1 - churnRate));
    }

    return {
      totalRevenue: totalRevenue,
      remainingUsers: remainingUsers,
      totalChurned: users - remainingUsers,
      monthlyBreakdown: monthlyBreakdown,
    };
  }

  // Calculate profitability
  calculateProfitability(revenue, costs) {
    const grossProfit = revenue - costs;
    const grossMargin = (grossProfit / revenue) * 100;
    const netMargin = grossMargin - 15; // Assuming 15% operating expenses

    return {
      revenue: revenue,
      costs: costs,
      grossProfit: grossProfit,
      grossMargin: grossMargin,
      netProfit: revenue * (netMargin / 100),
      netMargin: netMargin,
    };
  }

  // Scenario analysis
  runScenarioAnalysis(scenarios) {
    const results = {};

    Object.keys(scenarios).forEach((scenarioName) => {
      const scenario = scenarios[scenarioName];
      const projections = this.projectGrowth(
        scenario.initialUsers,
        scenario.months,
        scenario.growthRate,
        scenario.conversionGrowth
      );

      const finalMonth = projections[projections.length - 1];
      const totalRevenue = projections.reduce((sum, p) => sum + p.mrr, 0);

      results[scenarioName] = {
        finalMRR: finalMonth.mrr,
        finalARR: finalMonth.arr,
        totalRevenue: totalRevenue,
        finalUsers: finalMonth.users,
        finalPaidUsers: finalMonth.paidUsers,
        projections: projections,
      };
    });

    return results;
  }

  // Generate detailed financial report
  generateFinancialReport(months = 36) {
    const projections = this.projectGrowth(100, months);
    const totalRevenue = projections.reduce((sum, p) => sum + p.mrr, 0);
    const finalMRR = projections[projections.length - 1].mrr;

    // Calculate costs (simplified model)
    const costs = this.estimateCosts(projections);

    // Calculate profitability
    const profitability = this.calculateProfitability(
      totalRevenue,
      costs.total
    );

    return {
      summary: {
        totalRevenue: totalRevenue,
        finalMRR: finalMRR,
        finalARR: finalMRR * 12,
        totalUsers: projections[projections.length - 1].users,
        totalPaidUsers: projections[projections.length - 1].paidUsers,
        profitability: profitability,
      },
      monthlyProjections: projections,
      costs: costs,
      kpis: this.calculateKPIs(projections),
    };
  }

  // Estimate costs based on user growth
  estimateCosts(projections) {
    const costs = {
      personnel: [],
      infrastructure: [],
      marketing: [],
      ai: [],
      support: [],
      total: [],
    };

    projections.forEach((projection, index) => {
      const month = index + 1;
      const users = projection.users;
      const paidUsers = projection.paidUsers;

      // Personnel costs (grow with revenue)
      const personnel = month <= 6 ? 25000 : month <= 12 ? 45000 : 85000;

      // Infrastructure costs (scale with users)
      const infrastructure = Math.max(5000, users * 0.5);

      // Marketing costs (percentage of revenue)
      const marketing = projection.mrr * 0.3;

      // AI costs (per paid user)
      const ai = paidUsers * 8;

      // Support costs (per paid user)
      const support = paidUsers * 3;

      const total = personnel + infrastructure + marketing + ai + support;

      costs.personnel.push(personnel);
      costs.infrastructure.push(infrastructure);
      costs.marketing.push(marketing);
      costs.ai.push(ai);
      costs.support.push(support);
      costs.total.push(total);
    });

    return costs;
  }

  // Calculate key performance indicators
  calculateKPIs(projections) {
    const finalMonth = projections[projections.length - 1];
    const totalRevenue = projections.reduce((sum, p) => sum + p.mrr, 0);

    return {
      averageMRR: totalRevenue / projections.length,
      mrrGrowthRate:
        ((finalMonth.mrr - projections[0].mrr) / projections[0].mrr) * 100,
      userGrowthRate:
        ((finalMonth.users - projections[0].users) / projections[0].users) *
        100,
      conversionRate: (finalMonth.paidUsers / finalMonth.users) * 100,
      revenuePerUser: finalMonth.mrr / finalMonth.users,
      revenuePerPaidUser: finalMonth.mrr / finalMonth.paidUsers,
    };
  }

  // Export data for charts
  exportChartData(projections) {
    return {
      labels: projections.map((p) => `Month ${p.month}`),
      datasets: [
        {
          label: "Users",
          data: projections.map((p) => p.users),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
          label: "MRR ($)",
          data: projections.map((p) => p.mrr),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Paid Users",
          data: projections.map((p) => p.paidUsers),
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    };
  }
}

// Usage examples and quick calculations
const calculator = new RevenueCalculator();

// Quick MRR calculation
console.log("=== QUICK MRR CALCULATION ===");
const mrrData = calculator.calculateMRR(1000, 0.05);
console.log(`MRR: $${mrrData.mrr.toFixed(2)}`);
console.log(`ARR: $${mrrData.arr.toFixed(2)}`);

// Growth projection
console.log("\n=== 12-MONTH GROWTH PROJECTION ===");
const growthProjection = calculator.projectGrowth(100, 12, 0.15);
console.log(`Final MRR: $${growthProjection[11].mrr.toFixed(2)}`);
console.log(`Final Users: ${growthProjection[11].users}`);

// CLV calculation
console.log("\n=== CUSTOMER LIFETIME VALUE ===");
const clvStarter = calculator.calculateCLV("starter");
const clvPro = calculator.calculateCLV("pro");
const clvEnterprise = calculator.calculateCLV("enterprise");
console.log(`Starter CLV: $${clvStarter.toFixed(2)}`);
console.log(`Pro CLV: $${clvPro.toFixed(2)}`);
console.log(`Enterprise CLV: $${clvEnterprise.toFixed(2)}`);

// CAC payback analysis
console.log("\n=== CAC PAYBACK ANALYSIS ===");
const cacAnalysis = calculator.calculateCACPayback(30, "pro");
console.log(`CAC Payback: ${cacAnalysis.paybackMonths.toFixed(1)} months`);
console.log(`CLV/CAC Ratio: ${cacAnalysis.clvCacRatio.toFixed(2)}:1`);

// Scenario analysis
console.log("\n=== SCENARIO ANALYSIS ===");
const scenarios = {
  conservative: {
    initialUsers: 50,
    months: 12,
    growthRate: 0.1,
    conversionGrowth: 0.01,
  },
  realistic: {
    initialUsers: 100,
    months: 12,
    growthRate: 0.15,
    conversionGrowth: 0.02,
  },
  optimistic: {
    initialUsers: 200,
    months: 12,
    growthRate: 0.25,
    conversionGrowth: 0.03,
  },
};

const scenarioResults = calculator.runScenarioAnalysis(scenarios);
Object.keys(scenarioResults).forEach((scenario) => {
  const result = scenarioResults[scenario];
  console.log(
    `${scenario.toUpperCase()}: MRR $${result.finalMRR.toFixed(2)}, Users ${
      result.finalUsers
    }`
  );
});

// Full financial report
console.log("\n=== FULL FINANCIAL REPORT ===");
const report = calculator.generateFinancialReport(36);
console.log(
  `3-Year Revenue: $${(report.summary.totalRevenue / 1000).toFixed(1)}K`
);
console.log(`Final MRR: $${(report.summary.finalMRR / 1000).toFixed(1)}K`);
console.log(
  `Net Margin: ${report.summary.profitability.netMargin.toFixed(1)}%`
);

// Export for use in other applications
if (typeof module !== "undefined" && module.exports) {
  module.exports = RevenueCalculator;
}

// Browser usage
if (typeof window !== "undefined") {
  window.RevenueCalculator = RevenueCalculator;
}
