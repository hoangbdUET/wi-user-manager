module.exports = {
    evaluate
};

function evaluate(v, params) {
    if (typeof v === 'function') return v(params);
    return v;
}
