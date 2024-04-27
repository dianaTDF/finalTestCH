function sendMessage(message,color){
    const messaggeBody = document.createElement('h3')
    messaggeBody.style.color= color
    messaggeBody.innerHTML= message
    document.getElementById('message').appendChild(messaggeBody)
    setTimeout(()=>{
        messaggeBody.remove()
    }, 5000);
  }


const createForm = document.getElementById('createForm')
createForm?.addEventListener('submit', async event => {
    event.preventDefault()
    let success
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(new FormData(createForm))
      })
      .then(response => response.json())
      .then(res => {
          if(res.status== 'success'){
              sendMessage(`Se a registrado correctamente, sera enviado al home`,'green')
              success= true
            }else{
              sendMessage(res.message,'red')
              console.log(res.status)
          }
      })
      .catch((error) =>{
          sendMessage(error.message,'red')
          alert(error.message)
      });
    
      if(success){
        const login= {}
        login.username = document.querySelector("input[name='username']").value
        login.password = document.querySelector("input[name='password']").value
        console.log(login)

        const response =await fetch('/api/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(new FormData(createForm))
          })
        
          if (response.status === 201) {
            setTimeout(()=>{
                window.location.href = '/index'
            }, 3000);
          } else {
            const error = await response.json()
            alert(error.message)
          }
      
      }
  })
  