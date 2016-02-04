import {compoundInterest} from './utils';
const rent = function (opts) {
    const term = 12 * opts.duration;
    const cost = term * opts.rent;

    return {
        cost,
        deposit: opts.insurance * opts.rent,
        investment: compoundInterest(opts.deposit, opts.investmentReturns, opts.duration)
    };
}

exports.rent = rent;