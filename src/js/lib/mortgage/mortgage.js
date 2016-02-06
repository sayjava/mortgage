const Finance = require('../finance');
var compoundInterest = require('./utils').compoundInterest;

const mortgage = function (opts) {

    const {homeValue} = opts;
    const mortgageRate = (opts.mortgageRate / 100) / 12;
    const initialDeposit = homeValue - ((1 - (opts.downPayment / 100)) * homeValue);

    const mortgageValue = homeValue - initialDeposit;
    const mortgageTerm = opts.mortgageTerm * 12;
    const mortgageDuration = opts.duration * 12;

    const monthlyPayment = Finance.PMT(mortgageRate, mortgageTerm, -mortgageValue);

    const mortgageCost = monthlyPayment * mortgageDuration;
    const stampValue = (opts.stampDuty / 100) * opts.homeValue;
    const buyingCost = opts.arrangment + opts.convency + opts.survey + stampValue;

    const newHomeValue = compoundInterest(opts.homeValue, opts.homePriceGrowth, opts.duration);

    const maintainanceCost = (function () {
        let cost = 0;
        let yearlyCost = (opts.maintainance / 100) * opts.homeValue;
        let inflation = opts.inflation / 100;

        for (let y = 1; y <= opts.duration; y++) {
            cost += yearlyCost;
            yearlyCost += inflation * yearlyCost;
        }

        return cost;
    }());

    const paidBack = (function () {
        var paidPrincipal = 0;
        var paidInterest = 0;

        for (let p = 1; p <= mortgageDuration; p++) {
            let principal = Finance.PPMT(mortgageRate, p, mortgageTerm, -mortgageValue);
            let interest = Finance.ISPMT(mortgageRate, p, mortgageTerm, -mortgageValue);
            paidPrincipal += principal;
            paidInterest += interest;
        }

        return {
            paidPrincipal,
            paidInterest
        };

    }());

    // we need to factor in the sales commision
    const netNewValue = (1 - (opts.estateAgent / 100)) * newHomeValue;
    const outstandingLoan = mortgageValue - paidBack.paidPrincipal;
    const totalCost = buyingCost + paidBack.paidInterest + maintainanceCost;
    const leftover = netNewValue - (outstandingLoan + totalCost);
    const profit = leftover - initialDeposit;


    /*console.log('Monthly Payment ', monthlyPayment);
    console.log('Mortgage Cost', mortgageCost);
    console.log('TOTAL COST ', totalCost);
    console.log('Home APPRECIATION ', newHomeValue);
    console.log('PRINCIPAL PAID', paidBack);
    console.log('Profit', profit);
    console.log('Maintainance', maintainanceCost);*/


    return {
        initialCost: initialDeposit + buyingCost,
        initialDeposit,
        totalCost,
        newHomeValue,
        monthlyPayment,
        paidBack,
        profit,
        stampValue,
        maintainanceCost,
        profit: profit + initialDeposit
    }
};

exports.mortgage = mortgage;

