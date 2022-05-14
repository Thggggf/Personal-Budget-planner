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
const data = document.querySelector(".time-data").querySelectorAll("input")

