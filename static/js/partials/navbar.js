document.getElementById('logout-button').addEventListener('click', async event => {
    const response = await fetch('/api/sessions/current', {
        method: 'DELETE'
    })
    
    if (response.status === 204) {
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})

