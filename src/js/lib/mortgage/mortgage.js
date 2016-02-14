import {compoundInterest} from  './utils';
import mortgageCalculator from 'mortgage-calculator';

const mortgage = function (opts) {

    const {homeValue} = opts;

    const initialDeposit = homeValue - ((1 - (opts.downPayment / 100)) * homeValue);
    const mortgageValue = homeValue - initialDeposit;
    const stampValue = (opts.stampDuty / 100) * opts.homeValue;
    const buyingCost = opts.arrangment + stampValue;

    const monthlyPayment = periodicMortgatePayment(mortgageValue, opts.mortgageRate, opts.mortgageTerm, 12);
    const amortized = mortgageCalculator.amortization(mortgageValue, monthlyPayment, opts.mortgageTerm, opts.mortgageRate / 100);
    const periods = valueSchedule(amortized, initialDeposit, buyingCost, opts);

    return {
        initialCost: initialDeposit + buyingCost,
        initialDeposit,
        monthlyPayment,
        stampValue,
        periods
    }
};

function periodicMortgatePayment(principal, rate, term, periods = 1) {
    let interest = (rate / 100) / periods;
    let period = term * periods;
    let top = interest * Math.pow((1 + interest), period);
    let bottom = Math.pow((1 + interest), period) - 1;
    return principal * (top / bottom);
}

function valueSchedule(amortized, initialDeposit, buyingCost, opts) {
    // yearly net worth
    return amortized.inGroupsOf(12).map((payments, year) => {
        const houseAppr = compoundInterest(opts.homeValue, opts.homePriceGrowth-opts.inflation, year);
        const lastPayment = payments.last();

        // agent fees
        const agentFees = houseAppr * (opts.estateAgent / 100);

        // money spent on maintenance
        const maintenance = compoundInterest(opts.homeValue * (opts.maintainance / 100), 2 / 100, year);

        // subtract all expenses
        const netHouseValue = houseAppr - agentFees - maintenance;

        // pay back the bank
        const netCash = netHouseValue - lastPayment.remainingCapital;

        lastPayment.netCash = netCash - (initialDeposit + buyingCost);

        return lastPayment;
    });
}

exports.mortgage = mortgage;

