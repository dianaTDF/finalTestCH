

 
 function sendMessage(message,color){
    const messaggeBody = document.createElement('h3')
    messaggeBody.style.color= color
    messaggeBody.innerHTML= message
    document.getElementById('message').appendChild(messaggeBody)
    setTimeout(()=>{
        messaggeBody.remove()
    }, 3000);
  }

  async function purge(){
    await fetch(`/api/users/clean`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status==204){
          document.getElementById('mainTable').style.display='none'
          sendMessage('Usuarios ausentes eliminados correctamente','green')
          setTimeout(()=>{
              window.location.href = '/users'
          }, 3000);
      }else{
          sendMessage(res.message,'red')
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

async function deleteUser(event){
    const id= event.target.dataset.user 

    await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(res => {
        if(res.status== 'success'){
          let delUsers=''
          res.payload.forEach(user => {
            delUsers= delUsers+ user.username+', '
          });

          document.getElementById('mainTable').style.display='none'
          
          sendMessage(`Usuarios ${delUsers} han sido eliminados`,'green')
          
          setTimeout(()=>{
              window.location.href = '/users'
          }, 3000);
        }else{
            sendMessage(res.message,'red')
        }
      })
      .catch(error => {
        console.log(error)
      });
}

async function modifyUser(event){
    const id= event.target.dataset.user 

    userRow= document.getElementById(id)

    newData= {}
    newData.rol= userRow.querySelector("select[name='rol']").value
    newData.email= userRow.querySelector("input[name='email']").value
    const username=userRow.querySelector("input[name='username']").value
    newData.username= username

    //console.log(newData)
    await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      .then(response => response.json())
      .then(res => {
        if(res.status== 'success'){
            document.getElementById('mainTable').style.display='none'
            sendMessage(`${res.payload.username} a sido actualizado correctamente`,'green')
            setTimeout(()=>{
                window.location.href = '/users'
            }, 3000);
        }else{
            sendMessage(res.message,'red')
        }
      })
      .catch(error => {
        console.log(error)
      });
}


function createRow({_id,username,rol,email}){
    const row= document.getElementById('sampleTr').cloneNode(true); 
    row.id= _id
    const nameTd= row.querySelector("input[name='username']")
    nameTd.value=username
    const rolTd= row.querySelector(`option[value='${rol}']`)
    rolTd.selected= true
    const emailTd= row.querySelector("input[name='email']")
    emailTd.value=email

    row.querySelector("button[name='edit']").setAttribute('data-user',_id) 
    row.querySelector("button[name='delete']").setAttribute('data-user',_id) 

    document.getElementById('users').appendChild(row)
}


window.addEventListener('load', async () => {

    await fetch('/api/users/')
        .then(response => response.json())
        .then(res => {
            const users=res.payload
            users.forEach(user => {
                createRow({...user})
            });
            document.getElementById('sampleTr').remove()
        })
        .catch(error =>console.log(error));     
})