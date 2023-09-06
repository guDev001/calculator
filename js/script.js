const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button') 

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }

    addDigit(digit){
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation){
        if(this.currentOperationText.inner === '') {

            if(this.previousOperationText.inner !== '') {
                this.changeOperation(operation)
            }
            return
        }

        let operationValue
        const previous = +this.previousOperationText.innerText.split(' ')[0]
        const current =  +this.currentOperationText.innerText

        switch(operation) {
            case'+':
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
            break

            case'-':
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
            break

            case'/':
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
            break

            case'*':
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
            break

            case'%':
                this.percentOperation()
            break

            case'^':
                this.potencialOperation()
            break

            case'AC':
                this.deleteAllOperation()
            break

            case'=':
                this.processEqualOperation() 
            break

            default:
            return
        }
    }

    changeOperation(operation) {
        const mathOperation = ['+', '-', '*', '/']

        if(!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    deleteAllOperation() {
            this.currentOperationText.innerText = ''
            this.previousOperationText.innerText = ''
    
    }


    percentOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText / 100
        this.previousOperationText.innerText = this.currentOperationText.innerText
        this.currentOperationText.innerText = ''
    }

    potencialOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText * this.currentOperationText.innerText
        this.previousOperationText.innerText = this.currentOperationText.innerText
        this.currentOperationText.innerText = ''
    }

    processEqualOperation() {
        const operation = previousOperationText.innerText.split(' ')[1]

        this.processOperation(operation)
    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        }

        else {
            if (previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText 

        if(+value >= 0 || value === '.'){
            calc.addDigit(value)
        }

        else {
            calc.processOperation(value)
        }
    })
})