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
        display.dataset.previousKeyType = key.dataset.keyType
        return
    }

    if (key.innerText === 'DEL') {
        const displayContent = display.innerText.split(' ')
        displayContent.pop()
        display.innerText = displayContent.join(' ')
        return
    }

    display.innerText += ' ' + key.innerText
}

function main() {
    const keys = document.getElementsByClassName('key')
    const display = document.getElementById('display')
    for (const key of keys) {
        key.addEventListener('click', () => addToDisplay(key))
    }
}
main()