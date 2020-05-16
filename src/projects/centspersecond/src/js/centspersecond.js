const dashboard = document.querySelector(".dashboard");
const dashboardAdd = document.querySelector(".dashboard__add");
const dashboardEntries = document.querySelector(".dashboard__entries");
const form = document.querySelector(".form");
const dashboardAddForm = document.querySelector(".dashboard__add-entry");
const dashboardAddClose = document.querySelector(".dashboard__add-entry-close");
const storageKey = "chr1s.d3v:centsPerSecond";

const readEntries = () => {
    if (!window.localStorage) {
        console.error("localStorage not found.");
        return [];
    }
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]");
};

const deleteEntry = (e) => {
    if (!window.localStorage) {
        console.error("localStorage not found.");
        return;
    }
    const button = e.currentTarget;
    const expense = button.dataset.expense;
    const entries = readEntries();
    const newEntries = entries.filter(entry => entry.expense !== expense);
    window.localStorage.setItem(storageKey, JSON.stringify(newEntries));
    renderEntries();
};

const createEntry = (e) => {
    if (!window.localStorage) {
        console.error("localStorage not found.");
        return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const euroPerMonth = parseInt(formData.get("amountPerMonth"), 10);
    const animationDuration = calcAnimationDuration(euroPerMonth);
    const centsPerSecond = calcEuroPerSecond(euroPerMonth) * 100
    const save = {
        expense: formData.get("expense"),
        amountPerMonth: euroPerMonth,
        centsPerSecond: centsPerSecond.toFixed(4),
        animationDuration
    };
    const entries = readEntries();
    entries.push(save);
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
    renderEntries();
};

const calcEuroPerSecond = (euroPerMonth) => {
    return euroPerMonth / 30 / 24 / 60 / 60;
};

const calcAnimationDuration = (amountPerMonth) => {
    const amountPerSecond = calcEuroPerSecond(amountPerMonth);
    return `${Math.round(1 / amountPerSecond)}ms`;
};

const renderEntries = () => {
    const items = readEntries();
    dashboardEntries.innerHTML = "";
    items.forEach((item) => {
        const chart = document.createElement("div");
        const chartInner = document.createElement("div");
        const chartText = document.createElement("div");
        const chartAmount = document.createElement("div");
        const chartDelete = document.createElement("button");

        chart.classList.add("dashboard__entry");
        chartInner.classList.add("dashboard__entry-inner");
        chartInner.style.animationDuration = item.animationDuration;
        chartAmount.classList.add("dashboard__entry-amount");
        chartAmount.innerHTML = `${item.centsPerSecond}¢ / s`;
        chartText.classList.add("dashboard__entry-text");
        chartText.innerHTML = item.expense;
        chartDelete.classList.add("dashboard__entry-del");
        chartDelete.dataset.expense = item.expense;
        chartDelete.classList.add("material-icons");
        chartDelete.innerHTML = "close";
        chartDelete.addEventListener("click", deleteEntry);
        chart.appendChild(chartInner);
        chart.appendChild(chartText);
        chart.appendChild(chartDelete);
        chart.appendChild(chartAmount);
        dashboardEntries.appendChild(chart);
    });
};

const init = function () {
    renderEntries();
}

form.addEventListener("submit", createEntry)
dashboardAdd.addEventListener("click", () => {
    dashboardAddForm.classList.remove("dashboard__add-entry--hidden");
    dashboardAdd.classList.add("dashboard__add--hidden");
});
dashboardAddClose.addEventListener("click", () => {
    dashboardAddForm.classList.add("dashboard__add-entry--hidden");
    dashboardAdd.classList.remove("dashboard__add--hidden");
})
init();
