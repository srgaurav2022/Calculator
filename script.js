class Calculator {
    constructor(previousOperandTextValue, currentOperandTextValue) {
        this.previousOperandTextValue = previousOperandTextValue
        this.currentOperandTextValue = currentOperandTextValue
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumbers(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''


    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }

    updateDisplay() {
        this.currentOperandTextValue.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextValue.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextValue.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextValue = document.querySelector('[data-previous-operand]')
const currentOperandTextValue = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextValue, currentOperandTextValue)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumbers(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()

})