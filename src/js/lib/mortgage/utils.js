
exports.compoundInterest =  function(principal, rate, duration) {
    return principal * Math.pow((1 + rate/100), duration);
}
