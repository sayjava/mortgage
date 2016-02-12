import {compoundInterest} from  './utils';
const rent = function (opts, initialMortgageCost) {

    const initialRentCost = opts.rentDeposit * opts.rent;
    const opportunityCost = initialMortgageCost - initialRentCost;

    return {
        initialRentCost,
        initialCost: opts.rentDeposit * opts.rent,
        periods: valueOverYears(opportunityCost, opts)
    };
}

function valueOverYears(opCost, opts) {
    return Number.range(1, opts.mortgageTerm).every(1).map(function (year, v) {
        let investReturns = compoundInterest(opCost, opts.investmentReturns, year - 1);
        let rentExcess = compoundInterest(opts.rent * 12, opts.rentGrowth, year - 1) - (opts.rent * 12);
        return {
            netCash: investReturns - rentExcess
        }
    });
}

exports.rent = rent;