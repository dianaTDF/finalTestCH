const loginForm = document.getElementById('loginForm')

loginForm?.addEventListener('submit', async event => {
  event.preventDefault()
  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(loginForm))
  })

  if (response.status === 201) {
    window.location.href = '/index'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})

