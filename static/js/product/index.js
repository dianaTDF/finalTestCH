/* 
    primero conseguir que se haga la comrpa, 
    despues el filtro
    despues el paginate

    y si me sobra  tiempo, el multer
    */
    
    //me comi hacer los botones y las funciones solo para notar que el input number ya tiene para sumar de a 1 
    // nooo~ tengo sueño
/*     function modCounter(event){
        const container =event.target.parentNode
        const val =parseInt(container.querySelector('input[type="number"]').value) + parseInt( event.target.value)
        if(val>=0) container.querySelector('input[type="number"]').value = val
    }
 */

    /* 
    const productList={}
    let purchased=false

    function apply(event){
        purchased=true
        const container =event.target.parentNode
        const value= event.target.value
        const idProduct= container.querySelector('input[type="hidden"]').value
        //console.log(JSON.stringify(productList))
        if(value >0){
            productList[idProduct]=value
        }else{
            delete productList[idProduct]
        } 


    }
    */
    function apply(event){

        //console.log(formatedList)

    }
    /*    
        const numList =document.querySelectorAll('input[type="number"]') 
        //console.log(numList[3].value)
        console.log(Array(...numList).filter(item => item.value >0))
    } */

    //para generar los posteos
    function createPost({title,price,stock,_id},samplePost,counter=0){
        const post= samplePost.cloneNode(true); 
        post.id=''
        post.querySelector("strong[name='title']").innerHTML=title
        post.querySelector("span[name='price']").innerHTML=price
        post.querySelector("span[name='stock']").innerHTML=stock
        const numberInp =post.querySelector('input[type="number"]')
        numberInp.setAttribute('data-id',_id) 
        numberInp.value=counter
        return post
    }
    
    
window.addEventListener('load', async () => {
    /* ---------------------------------- TODO ---------------------------------- */
    /* -- aca deberia meter una forma de loggear lo que ya existe en el carrito - */
    //metiendo un fetch y e insertar los calores del array en los diferentes elemntos
    
    //consegir productos del carrito
    let cartProducts=[]  
    await fetch('/api/carts/current')
        .then(response => response.json())
        .then(res => {
            if(res.payload.products){
                cartProducts= res.payload.products
            }
        })
        .catch(error =>console.log(error));  



    //tomar modelo
    const samplePost= document.getElementById('sample_item') 

    //crear productos
    await fetch('/api/products')
        .then(response => response.json())
        .then(res => {
            let num 
            const products=res.payload 
            products.forEach(p => {
                //analizar el array del carrito con el de productos, reflejar cantidades ya anotadas
                let element =cartProducts.find(item=> item.product._id== p._id)
                num=element!=null? element.counter:0

                let post =createPost(p,samplePost,num)  
                document.getElementById('productBox').appendChild(post)
            });
            samplePost.remove()
        })
        .catch(error =>console.log(error));
})

//antes de salir, enviar la nueva lista al carrito
window.addEventListener('unload', async function(event) {
    const formatedList=[]

    const numList =document.querySelectorAll('input[type="number"]')
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

    event.returnValue = ''
});