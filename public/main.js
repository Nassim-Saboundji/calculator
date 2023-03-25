
// RPN = Reverse Polish Notation
function convertToRPN(expression) {
    console.log(expression)
    const RPNotation = []
    const operators = []

    const operatorSet = new Set(['+', '-', '×', '÷', '√', '^', '%'])

    for (const symbol of expression) {
        if (operatorSet.has(symbol)) {
            operators.push(symbol)
            continue
        }

        
    }
}


function compute() {
    const display = document.getElementById('display')
    const displayContent = display.innerText
    const expression = displayContent.split('\xa0')
    .filter(s => {
        if (s !== '') return s
    })
    const RPNotation = convertToRPN(expression)
}



function addToDisplay(key) {
    const display = document.getElementById('display')
    
    if (
        key.innerText === 'M+' || key.innerText === 'M-' 
        || key.innerText === 'MR' || key.innerText === 'MC'
    ) {
        // todo : do something
        return
    }

    if (key.innerText === '=') {
        compute()
        return
    }

    if (key.innerText === 'DEL') {
        const displayContent = display.innerText.split('\xa0')
        displayContent.pop()
        display.innerText = displayContent.join('\xa0')
        return
    }

    if (key.dataset.keyType === 'operator' ) {
        // Using innerHTML to get proper whitespace.
        // Safe because we get the key from an innerText
        // before using innerHTML.
        display.innerHTML += `&nbsp${key.innerText}&nbsp`
    } else {
        display.innerText += key.innerText
    }
}

function main() {
    const keys = document.getElementsByClassName('key')
    const display = document.getElementById('display')
    for (const key of keys) {
        key.addEventListener('click', () => addToDisplay(key))
    }
}
main()