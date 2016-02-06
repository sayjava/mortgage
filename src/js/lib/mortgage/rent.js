import {compoundInterest} from  './utils';
const rent = function (opts, initialMortgageCost) {

    const initialRentCost = opts.rentDeposit * opts.rent;
    const totalMortgagePayment = opts.rent * 12 * opts.duration;

    // remove the initial rental debosit from the mortgage deposit
    const opportunityCost = initialMortgageCost - initialRentCost;
    const profit = compoundInterest(opportunityCost, opts.investmentReturns, opts.duration);

    const totalRentCost = (function () {
        const {rentGrowth, duration, rent} = opts;
        const rentPerYear = rent * 12;
        let newRent = rentPerYear;
        let totalCost = 0;
        for(var y=0; y < duration; y++) {
            totalCost += newRent;
            newRent = newRent * (1 + (rentGrowth/100));
        }
        return totalCost;
    }());

    // how much you have paid over the monthly mortgage payment.
    const excessOfMortgage = totalRentCost - totalMortgagePayment;

    return {
        initialRentCost,
        initialCost: opts.rentDeposit * opts.rent,
        totalCost: opts.duration * 12 * opts.rent,
        deposit: opts.insurance * opts.rent,
        profit: profit - excessOfMortgage
    };
}

exports.rent = rent;