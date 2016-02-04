import {compoundInterest} from './utils';
const rent = function (opts, initialMortgageCost) {

    const initialRentCost = opts.insurance * opts.rent;
    const opportunityCost = initialMortgageCost - initialRentCost;

    const profit = compoundInterest(opportunityCost, opts.investmentReturns, opts.duration);

    return {
        initialRentCost,
        initialCost: opts.insurance * opts.rent,
        totalCost: opts.duration * 12 * opts.rent,
        deposit: opts.insurance * opts.rent,
        cashAtHand: profit
    };
}

exports.rent = rent;