const WS_KEY = 'currency.pair';

export function savePair(from, to) {
    try {
        localStorage.setItem(WS_KEY, JSON.stringify({from, to}));
    } catch (error) {
        console.warn('Web Storage error', error);
    }
}

export function loadPair() {
    try {
        const raw = localStorage.getItem(WS_KEY);

        return raw === null ? null : JSON.parse(raw);
    } catch {
        return null;
    }
}