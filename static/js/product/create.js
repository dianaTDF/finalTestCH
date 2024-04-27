const createForm = document.getElementById('createForm')


function sendMessage(message,color){
    const messaggeBody = document.createElement('h3')
    messaggeBody.style.color= color
    messaggeBody.innerHTML= message
    document.getElementById('message').appendChild(messaggeBody)
    setTimeout(()=>{
        messaggeBody.remove()
    }, 5000);
  }
  

createForm?.addEventListener('submit', async event => {
  event.preventDefault()
  await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(new FormData(createForm))
    })
    .then(response => response.json())
    .then(res => {
        
        if(res.status== 'success'){
            console.log(res.status)
            sendMessage(`Producto ${res.payload.title} creado exitosamente`,'green')
          }else{
            sendMessage(res.message,'red')
            console.log(res.status)
        }
    })
    .catch((error) =>{
        sendMessage(error.message,'red')
        alert(error.message)
    });
  })
