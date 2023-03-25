
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

function convertToJS(expression) {
    const operatorMap = new Map([
        ['+', '+'],
        ['-', '-'],
        ['×', '*'],
        ['÷', '/'],
        ['√', '** (1/2)'],
        ['^', '**'],
        ['%', '%']
    ])

    let jsExpressionArray = []
    let buffer = []
    for (const symbol of expression) {
    
        if (symbol === '√') {
            buffer.push(operatorMap.get('√'))
            continue
        }

        if (operatorMap.get(symbol)) {
            jsExpressionArray.push(operatorMap.get(symbol))
            continue
        }

        jsExpressionArray.push(symbol)
        if (buffer.length !== 0) {
            jsExpressionArray.push(buffer[0])
            buffer = []
        }
    }

    return jsExpressionArray.join(' ')
}

function compute(display) {
    const displayContent = display.innerText
    const expression = displayContent.split('\xa0')
    .filter(s => {
        if (s !== '') return s
    })
    
    const sandbox = document.getElementsByTagName('iframe')[0]
    const result = sandbox
    .contentWindow
    .Function(`"use strict"; return ${convertToJS(expression)}`)()
    
    return result
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
        const result = compute(display)
        display.innerHTML += `&nbsp${key.innerText}&nbsp${result}`
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
    const sandbox = document.createElement('iframe')
    sandbox.style.display = 'none'
    document.body.appendChild(sandbox)


    const keys = document.getElementsByClassName('key')
    for (const key of keys) {
        key.addEventListener('click', () => addToDisplay(key))
    }
}
main()