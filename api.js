const RATE_URL = 'https://api.frankfurter.dev/v2/rate';

export function getRate(from, to) {
    if (from === to) return Promise.resolve({ rate: 1, date: null });

    const base = encodeURIComponent(from);
    const quote = encodeURIComponent(to);

    return fetch(`${RATE_URL}/${base}/${quote}`)
            .then((response) => {
                if (!response.ok) throw new Error(`Error ${response.status}`);
                return response.json();
            })
            .then(({rate, date}) => {
                // TODO: Errors handling
                return { rate, date };
            });
}