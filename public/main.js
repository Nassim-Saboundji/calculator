
function convertToJS(expression) {
    const operatorMap = new Map([
        ['+', '+'],
        ['-', '-'],
        ['×', '*'],
        ['÷', '/'],
        ['√', 'Math.sqrt'],
        ['^', '**'],
        ['%', ' / 100']
    ])

    let jsExpressionArray = []
   
    for (let i = 0; i < expression.length; i++) {
        const jsOperator = operatorMap.get(expression[i])

        if (jsOperator) {
            if (jsOperator === operatorMap.get('%')
            && expression[i-1] !== ')') {
                jsExpressionArray.pop()
                jsExpressionArray.push(`(${expression[i-1]} ${jsOperator})`)
                continue
            }

            jsExpressionArray.push(jsOperator)
            if (jsOperator === operatorMap.get('√')
            && expression[i+1] !== '(') {
                jsExpressionArray.push('(')
                jsExpressionArray.push(expression[i+1])
                jsExpressionArray.push(')')
                i = i + 1
            } 
        } else {
            jsExpressionArray.push(expression[i])
        }
    }

    return jsExpressionArray.join(' ')
}

function compute(expression) {
    expression.filter(s => {
        if (s !== '') return s
    })
    
    const sandbox = document.getElementsByTagName('iframe')[0]
    
    let result
    try {
        result = sandbox
        .contentWindow
        .Function(`"use strict"; return ${convertToJS(expression)}`)()
    } catch (e) {
        result = 'error'
    }
    
    return result
}

function inputHandler(key) {
    const display = document.getElementById('display')
    const displayContent = display.innerText.split('\xa0')
    
    if (display.innerText.includes('=')) {
        display.innerText = displayContent.pop()
    }
    
    if (key.innerText === 'MR') {
        display.innerHTML += `&nbsp${display.dataset.mr}`
        return
    }

    if (key.innerText === 'M+') {
        display.dataset.mr = Number(display.dataset.mr) + Number(display.innerText)
        return
    }

    if (key.innerText === 'M-') {
        display.dataset.mr = Number(display.dataset.mr) - Number(display.innerText)
        return
    }

    if (key.innerText === 'MC') {
        display.dataset.mr = 0
        return
    }

    if (key.innerText === 'CLEAR') {
        display.innerText = ''
        return
    }

    if (key.innerText === '=') {
        const result = compute(displayContent)
        if (result === 'error') {
            display.innerText = 'INVALID EXPRESSION. PRESS DEL TO CLEAR.'
            return
        }

        display.innerHTML += `&nbsp${key.innerText}&nbsp${result}`
        return
    }

    if (key.innerText === 'DEL') {
        // Pop twice to delete both the previous whitespace
        // and the previous element.
        displayContent.pop()
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
        key.addEventListener('click', () => inputHandler(key))
    }
}
main()