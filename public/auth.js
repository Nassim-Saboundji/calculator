function main() {
    const currentUrl = window.location.href
    let currentAuthType = 'signup'
    const authTypeElement = document.getElementById('auth-type')
    const sendButton = document.getElementById('send-button')
    const statusIndicator = document.getElementById('status-indicator')

    if (currentUrl.includes('?authType=login')) {
        authTypeElement.innerText = 'Login'
        sendButton.innerText = 'Login'
        currentAuthType = 'login'
    }

    
    sendButton.addEventListener('click', async () => {
        
        statusIndicator.innerText = ''

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
    
        if (username.length === 0 || password.length === 0) {
            statusIndicator.innerText = 'Username or password cannot be empty.'
            return
        }

        const response = await fetch(`/${currentAuthType}`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const {status, error} = await response.json()
        if (status === 'success') {
            if (currentAuthType === 'signup') {
                statusIndicator.innerText = 'Successfully created account.'
                setTimeout(() => window.location.href = '/auth.html?authType=login', 1000)
            } else {
                statusIndicator.innerText = 'Successfully logged in.'
                setTimeout(() => window.location.href = '/', 1000)
            }

            return
        }

        if (status === 'failed') {
            statusIndicator.innerText = error
        }

    })
}
main()