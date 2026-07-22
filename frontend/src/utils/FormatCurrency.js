/**
 * Formats a number as currency based on the user's settings.
 *
 * @param {number} amount
 * @param {{ currencyPreference?: string, showDecimals?: boolean, showNegative?: boolean }} settings
 * @returns {string} e.g. "$1,234.50" or "$1,235" or "-$246.12"
 */
export function formatCurrency(amount, settings = {}, showNegative) {
    const { currencyPreference = "$", showDecimals = true } = settings;

    const numericAmount = Number(amount) || 0;
    const isNegative = numericAmount < 0 || showNegative === true;
    const absoluteAmount = Math.abs(numericAmount);

    const formatted = showDecimals
        ? absoluteAmount.toFixed(2)
        : Math.round(absoluteAmount).toString();

    // add thousands separators
    const [whole, decimal] = formatted.split(".");
    const wholeWithCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const numberPart = decimal ? `${wholeWithCommas}.${decimal}` : wholeWithCommas;

    // minus sign goes before the currency symbol
    return `${isNegative ? "-" : ""}${currencyPreference}${numberPart}`;
}