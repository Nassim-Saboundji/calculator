function compute() {
    const display = document.getElementById('display')
    const displayContent = display.innerText
    const operation = displayContent.split(' ')
    console.log(operation)
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
        const displayContent = display.innerText.split(' ')
        displayContent.pop()
        display.innerText = displayContent.join(' ')
        return
    }

    if (key.dataset.keyType === 'operator' ) {
        // Using innerHTML to get proper whitespace.
        // Safe because we get the key from an innerText
        // before using innerHTML.
        display.innerHTML += ` ${key.innerText}&nbsp`
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