/**
 * Save account data to local storage
 * @param {Object} account - The account data to be saved
 * @param {string} account.email - user's email address.
 * @param {string} account.password - user's password.
 * @returns {void} This function does not return anything.
 */

export function saveAccount({email,password}) {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    accounts.push({ email, password });
    localStorage.setItem("accounts",JSON.stringify(accounts));
}