var jsdom = require("jsdom");
var jquery = require("jquery");
var fs = require("fs");
var file = fs.readFileSync("./google.html", "utf-8");


// Extract the years from the table
var extractHeaders = function (table) {
    var headers = table.find('thead tr th').toArray().map(function (th) {
        return th.innerHTML;
    });

    //remove the title text
    var textYears = headers.slice(1);

    // remove useless text and return pure years
    var years = textYears.map(function (textYr) {
        var splits = textYr.split(/\s/);
        return (splits[splits.length - 2]);
    });

    return years;
};


// Extract the key values
var extractKeyValues = function ($, table, years) {
    var trs = table.find('tbody tr.hilite'); // pick highlights
    return trs.toArray().map(function (tr) {
        var row = $(tr).find('td');
        var title = row[0].innerHTML; // get the title for the row
        // extract the numbers
        var values = row.slice(1).map(function (index, td) {
            return {
                value: td.innerHTML.split(',').join('').split('.').join('') * 1000000,
                year: years[index]
            }
        }).toArray();

        return {
            title: title,
            values: values
        }
    });
}

var INCOME_ANNUAL = '#incannualdiv #fs-table';
var BALANCE_ANNUAL = '#balannualdiv #fs-table';
var CASH_FLOW__ANNUAL = '#casannualdiv #fs-table';

exports.scrape = function (ticker, callback) {

    jsdom.env(file, function (errors, window) {

        if(errors) {
            callback(errors, null);
            return;
        }
        var $ = jquery(window);
        var balanceAnnual = $(BALANCE_ANNUAL);
        var incomeAnnual = $(INCOME_ANNUAL);
        var cashflowAnnual = $(CASH_FLOW__ANNUAL);

        var years = extractHeaders(balanceAnnual);
        var balanceStatement = extractKeyValues($, balanceAnnual, years);
        var cashStatement = extractKeyValues($, cashflowAnnual, years);
        var incomeStatement = extractKeyValues($, incomeAnnual, years);

        // store the value into the database
        callback(null, {
            income: incomeStatement,
            cash: cashStatement,
            balance: balanceStatement
        });
    });
}


