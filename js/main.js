// data from the IMC
const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0"
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0"
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25 e 29,9 ",
        info: "Sobrepeso",
        obesity: "I"
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30 e 39,9",
        info: "Obesidade",
        obesity: "II"
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade",
        obesity: "III"
    }
]

// vars for inputs
const inputHeight = document.querySelector("#height")
const inputWeight = document.querySelector("#weight")

// buttons
const btnCalc = document.querySelector("#calc-btn")
const btnBack = document.querySelector("#back-btn")

// erros
const erroHeight = document.querySelector("#height-fail")
const erroWeight = document.querySelector("#weight-fail")

// mensagem imc
const imcHeaderSpan = document.querySelector("#imc-header span")
const imcInfoSpan = document.querySelector("#imc-info span")

// tables
const imcTable = document.querySelector("#imc-table")

// transition
const calcContainer = document.querySelector("#calc-imc-container")
const resultContainer = document.querySelector("#result-imc")

// Functions
function createTableImc(data) {
    data.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("table-data-body")

        const classification = document.createElement("p")
        classification.innerText = item.classification

        const info = document.createElement("p")
        info.innerText = item.info

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        imcTable.appendChild(div)
    });

}

function showOrHide() {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
}

// function to calculate imc
function calculateIMC(weight, height) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

// checking inputs
function checkingChars(text) {
    return text.replace(/[^0-9,]/g, "")
}

// function clear
function cleanInputs() {
    inputHeight.value = ""
    inputWeight.value = ""

    imcHeaderSpan.innerText = ""
    imcInfoSpan.innerText = ""
}

// function clear classes
function clearClass() {
    const classes = ["low", "good", "medium", "high",]
    classes.forEach(c => {
        imcHeaderSpan.classList.remove(c)
        imcInfoSpan.classList.remove(c)
    })
}

// Iniciar processo
createTableImc(data);

[inputHeight, inputWeight].forEach((el) => {
    el.addEventListener("input", (e) => {
        const uptadedValue = checkingChars(e.target.value)
        e.target.value = uptadedValue
    })
})

// Events
btnCalc.addEventListener("click", (e) => {
    e.preventDefault()

    const weight = +inputWeight.value.replace(",", ".")
    const height = +inputHeight.value.replace(",", ".")

    if (!weight || !height) return;

    const imc = calculateIMC(weight, height)

    let info;

    data.forEach(item => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info
        }
    });

    if (!info) return;

    imcHeaderSpan.innerText = imc
    imcInfoSpan.innerText = info

    clearClass()

    switch (info) {
        case "Magreza":
            imcHeaderSpan.classList.add("low")
            imcInfoSpan.classList.add("low")
            break;
        case "Normal":
            imcHeaderSpan.classList.add("good")
            imcInfoSpan.classList.add("good")
            break;
        case "Sobrepeso":
            imcHeaderSpan.classList.add("low")
            imcInfoSpan.classList.add("low")
            break;
        case "Obesidade":
            imcHeaderSpan.classList.add("medium")
            imcInfoSpan.classList.add("medium")
            break;
        case "Obesidade Grave":
            imcHeaderSpan.classList.add("high")
            imcInfoSpan.classList.add("high")
            break;
    }

    showOrHide()
})

btnBack.addEventListener("click", (e) => {
    e.preventDefault()
    cleanInputs()
    clearClass()
    showOrHide()
})