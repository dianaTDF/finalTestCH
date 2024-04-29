    

    
    //una vez terminado de cargar los productos de nuestro carrito
    //se carga el campo donde se presente y actualia el costo total
    function createtotalRow(){
        const row = document.createElement('tr')
        const result= document.createElement('td')
        result.setAttribute('colspan',4)
        result.innerHTML= "<strong>Total=</strong>"
        const total= document.createElement('span')
        total.id ='totalCost'
        
        let totalValue=0
        document.querySelectorAll("td[name='cost']").forEach(e => {
           // console.log(e.innerHTML)
            totalValue= totalValue + Number(e.innerHTML) 
        });
        total.innerHTML=totalValue

        result.appendChild(total)
        row.appendChild(result)  
        document.getElementById('cartProducts').appendChild(row)
    }



    //actualiza el monto total
    function updateCosts(){
        let totalValue=0

        document.querySelectorAll("td[name='cost']").forEach(e => {
           // console.log(e.innerHTML)
            totalValue= totalValue + Number(e.innerHTML) 
        });
        document.getElementById('totalCost').innerHTML=totalValue
       //console.log(getProductArray())
    }



    //crea la fila del producto
    function createRow(id,title,price,counter){
        const row = document.createElement('tr')
        const productTd = document.createElement('td')
        productTd.innerHTML= title
        const priceTd = document.createElement('td')
        priceTd.innerHTML= price
        const counterTd = document.createElement('td')
        const numberInt = document.createElement('input')
        numberInt.setAttribute('data-id',id)
        numberInt.setAttribute('type','number')
        numberInt.setAttribute('value',counter)
        numberInt.setAttribute('min',0)
        numberInt.addEventListener('change',(event)=>{
            const parent= event.target.parentNode.parentNode
            const costTd= parent.querySelector("td[name='cost']")
            costTd.innerHTML= event.target.value*price
            updateCosts()
        })
        counterTd.appendChild(numberInt)

        const cost = document.createElement('td')
        cost.setAttribute('name','cost')
        cost.innerHTML= counter*price

        row.appendChild(productTd)
        row.appendChild(priceTd)
        row.appendChild(counterTd)
        row.appendChild(cost)
        return row
    }


    //obtener el array que nos interesa para las rutas
    function getProductArray(){
        let arr=[]
        document.querySelectorAll("input[type='number']").forEach(e => {
            if(e.value != 0){
                arr.push({
                    product:e.dataset.id,
                    counter:Number(e.value) 
                })
            }
        })
        return arr
    }

//listener de cuando se carga la pagina
window.addEventListener('load', async () => {

    await fetch('/api/carts/current')
        .then(response => response.json())
        .then(res => {
            const products=res.payload
            if(res.payload.products){
                res.payload.products.forEach(p => {
                    let row =createRow(p.product._id,p.product.title,p.product.price,p.counter)  
                    document.getElementById('cartProducts').appendChild(row)
    
                });
                createtotalRow()
            }
        })
        .catch(error =>console.log(error));     
})


//en el caso de salir sin ejecutar la compra, constato posibles modificaciones

async function updateCart(){
    const formatedList=[]

    const numList =document.querySelectorAll('input[type="number"]')
    if(numList){

        const newList =Array(...numList).filter(item => item.value >0) 
        
        newList.forEach(item => {
            formatedList.push({
                    product:item.dataset.id,
                    counter:item.value,
            })
        });

        await fetch('/api/carts/current', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formatedList)
            }).then(response => {
                ('enviado')
            })
            .catch(error => {
                (error)
            });

    }
}
/* 
window.addEventListener('unload', async function(event) {
    const formatedList=[]

    const numList =document.querySelectorAll('input[type="number"]')
    if(numList){

        const newList =Array(...numList).filter(item => item.value >0) 
        
        newList.forEach(item => {
            formatedList.push({
                    product:item.dataset.id,
                    counter:item.value,
            })
        });

        await fetch('/api/carts/current', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formatedList)
            }).then(response => {
                console.log('enviado')
            })
            .catch(error => {
                console.log(error)
            });

    }
    event.returnValue = ''
});
 */


/* -------------------------- parte para el ticket -------------------------- */
function sendMessage(message,color){
    const messaggeBody = document.createElement('h3')
    messaggeBody.style.color= color
    messaggeBody.innerHTML= message
    document.getElementById('message').appendChild(messaggeBody)
    setTimeout(()=>{
        messaggeBody.remove()
    }, 3000);
  }



function makeTicket(products,amount){
    const title =document.createElement('h3')
    title.innerHTML= "Compra exitosa"


   const list =document.createElement('ul')
   products.forEach(prod => {
       let item= document.createElement('li')
       item.innerHTML=`PRODUCTO:${prod.name} - CANTIDAD: ${prod.counter}`
       list.appendChild(item)   
   })

   const cost=document.createElement('h2')
   cost.innerHTML= `costo total: $${amount}`

   const goBack=document.createElement('button')
   goBack.innerHTML= `Volver a carrito`
   goBack.onclick= ()=>{
       window.location.href = '/cart'
   }


   document.querySelector('table').remove()
   const  mainTicket = document.getElementById('ticket')
   mainTicket.appendChild(title)
   mainTicket.appendChild(document.createElement('br'))
   mainTicket.appendChild(list)
   mainTicket.appendChild(document.createElement('br'))
   mainTicket.appendChild(cost)
   mainTicket.appendChild(document.createElement('br'))
   mainTicket.appendChild(goBack)

}

Array(document.querySelector('a')).forEach(element => {
    element.addEventListener('click', async ()=>{
        await updateCart()
    })
    
});





const purchased= document.getElementById('buy')
 purchased.addEventListener('click', async ()=>{
    //mirar esto despues
    await updateCart()

    

    const formatedList=[]

    const numList =document.querySelectorAll('input[type="number"]')
    const newList =Array(...numList).filter(item => item.value >0) 
    newList.forEach(item => {
        formatedList.push({
                product:item.dataset.id,
                counter:item.value,
        })
    });

    await fetch('/api/carts/purchase', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formatedList)
      })
      .then(response => response.json())
      .then(res => {
        if(res.status == 'success'){
            const ticket= res.payload
            if(ticket === 0){
                sendMessage("Proceso completo <br> cantidad de productos no disponibles <br> costo de compra $0","green")
            }else{
                makeTicket(ticket.products,ticket.amount)
            }


        }else{
            //ocurre error
        }
      })
      .catch(error => {
        console.log(error)
      });
 })

 