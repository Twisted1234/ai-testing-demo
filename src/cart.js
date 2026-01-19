// src/cart.js

/**
 * Berechnet den Gesamtpreis.
 * Gibt 10% Rabatt, wenn man mehr als 5 Artikel kauft.
 * * @param {number} price - Preis pro Artikel
 * @param {number} quantity - Anzahl der Artikel
 */
function calculateTotal(price, quantity) {
    if (!price || !quantity) {
        return 0;
    }

    let total = price * quantity;

    // Die Rabatt-Logik
    if (quantity > 5) {
        total = total * 0.90; // 10% Rabatt
    }

    return total;
}

module.exports = calculateTotal;