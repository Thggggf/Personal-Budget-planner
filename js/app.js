const start = document.querySelector("#start")

const resultsList = document.querySelector(".result-table").querySelectorAll("div")
const resultsValuesList = [];
resultsList.forEach((el, i) => { if (i % 2 !== 0) resultsValuesList.push(el) })
const compulsaryExpenses = document.querySelectorAll(".expenses-item")
const buttons = document.querySelectorAll("button")
const compulsaryExpensesBtn = buttons[0]
const optionalExpensesBtn = buttons[1]
const countBudgetBtn = buttons[2]
const optionalExpenses = document.querySelectorAll(".optionalexpenses-item")
const income = document.querySelector("#income")
const savings = document.querySelector("#savings")
const savingsSum = document.querySelector("#sum")
const savingsPercent = document.querySelector("#percent")
const timeData = document.querySelector(".time-data").querySelectorAll("input")

compulsaryExpensesBtn.addEventListener("click", function () {
    // при клике запускаеться функция
    let sum = 0; // переменная суммы собирает все ценники что ввел ползователь

    for (let i = 0; i < compulsaryExpenses.length; i++) {
        // цикл работает до момента окончания 'input' на странице
        let a = compulsaryExpenses[i].value; // присваиваем в 'a' то что ввел пользовательв наименование
        let b = compulsaryExpenses[++i].value; // в 'b' попадает значение введенное в цене

        if (
            typeof a === "string" &&
            typeof a != null &&
            typeof b != null &&
            a != "" &&
            b != "" &&
            a.length < 50
        ) {
            appData.expenses[a] = b; // в глобальный обьект записываем новый обьект
            sum += +b; // собираем сумму всех значений которые ввел пользователь
        } else {
            i = i - 1; // возвращаемся к вопросу снова
        }
    }
    resultsValuesList[3].textContent = sum;
});

optionalExpensesBtn.addEventListener("click", function () {
    for (let i = 0; i < optionalExpenses.length; i++) {
        let opt = optionalExpenses[i].value
        appData.optionalExpenses[i] = opt;
        resultsValuesList[4].textContent += appData.optionalExpenses[i] + " ";

    }
})

countBudgetBtn.addEventListener("click", () => {
    if (!appData.budget || !resultsValuesList[3]) { alert("Для расчёта дневного бюджета, требуется утвердить обязательные расходы и доход"); resultsValuesList[2].textContent = "Произошла ошибка"; return null }
    appData.dailyBudget = appData.detectDailyBudget()
    resultsValuesList[1].textContent = appData.dailyBudget
    if (appData.dailyBudget > 1750) {
        resultsValuesList[2].textContent = "Высокий уровень достатка."
    } else if (appData.dailyBudget > 650) {
        resultsValuesList[2].textContent = "Средний уровень достатка."
    } else { resultsValuesList[2].textContent = "Низкий уровень достатка." }
})

income.addEventListener("input", () => {
    let items = income.value
    appData.income = items.split(", ")
    resultsValuesList[5].textContent = appData.income
})

savings.addEventListener("click", () => {
    appData.savings = appData.savings ? false : true;
})
savingsSum.addEventListener("input", () => {
    if (appData.savings) {
        let sum = +savingsSum.value,
            percent = +savingsPercent.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        resultsValuesList[6].textContent = appData.monthIncome.toFixed(1)
        resultsValuesList[7].textContent = appData.yearIncome.toFixed(1)
    }
})
savingsPercent.addEventListener("input", () => {
    if (appData.savings) {
        let sum = +savingsSum.value,
            percent = +savingsPercent.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        resultsValuesList[6].textContent = appData.monthIncome.toFixed(1)
        resultsValuesList[7].textContent = appData.yearIncome.toFixed(1)

    }
})
// app Data
const appData = {
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    detectDailyBudget: function () { return Math.floor((appData.budget - +resultsValuesList[3].textContent) / 30) }
}



start.addEventListener("click", () => {
    time = prompt("Введите дату в формате YYYY-MM-DD")
    money = +prompt("Ваш бюджет на месяц")

    while (isNaN(money) || money == "" || money == null) {
        money = prompt("Ваш бюджет?", "")
    }
    appData.budget = money;
    appData.timeData = time;
    resultsValuesList[0].textContent = money.toFixed();
    const userDate = new Date(Date.parse(time))
    timeData[0].value = userDate.getFullYear()
    timeData[1].value = userDate.getMonth() + 1
    timeData[2].value = userDate.getDate()


})

