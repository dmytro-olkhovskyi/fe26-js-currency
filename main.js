import { getRate } from "./api.js";
import { loadPair, savePair } from "./storage.js";

const form = document.querySelector('#converter');
const fields = document.querySelector('#fields');
const info = document.querySelector('#info');
const result = document.querySelector('#result');

// const savedPair = loadPair();
// const fromSelect = document.getElementById('from');
// const toSelect = document.getElementById('to');
// fromSelect.value = savedPair.from;
// toSelect.value = savedPair.to;

const savedPair = loadPair();
const selects = form.querySelectorAll('select');

for (const select of selects) {
    const value = savedPair?.[select.name]; // savedPair[value]
    const exists = Array.from(select.options).some(
        (option) => option.value === value
    );

    if (exists) select.value = value;
}

function renderResult(amount, from, to, rate) {
    const converted = Math.round(amount * rate * 100) / 100;
    const msg = document.createElement('p');
    msg.textContent = `${amount} ${from} -> ${converted} ${to}`;
    result.replaceChildren(msg);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (fields.disabled) return;

    const data = new FormData(form);

    const amount = Number(data.get('amount'));
    const from = data.get('from');
    const to = data.get('to');

    savePair(from, to);

    fields.disabled = true;
    info.textContent = 'Awaiting rate...';
    result.replaceChildren();

    getRate(from, to)
        .then(({ rate, date}) => {
            renderResult(amount, from, to, rate);
            info.textContent = date ? `Rate date: ${date}` : 'Rate: 1';
        })
        .catch((error) => {
            info.textContent = 'API Error, please, try again';
            console.warn(error);
        })
        .finally(() => {
            fields.disabled = false;
        })

    // renderResult(amount, from, to, 45);
    // info.textContent = 'Test data';
});