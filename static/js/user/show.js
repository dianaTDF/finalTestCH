/* -------------------------- funciones para producto -------------------------- */
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

/* -------------------------- funciones para tickets -------------------------- */
function createRow(num,date,cost,products){
    const row = document.createElement('tr')

    const numberTd= document.createElement('td')
    numberTd.innerHTML= num
    const dateTd= document.createElement('td')
    dateTd.innerHTML= date
    const costTd= document.createElement('td')
    costTd.innerHTML= '$'+cost
    const productsTd= document.createElement('td')
    products.forEach(p => {
        productsTd.innerHTML=`${productsTd.innerHTML}, ${p.name}: ${p.counter}`
    });

    row.appendChild(numberTd) 
    row.appendChild(dateTd) 
    row.appendChild(costTd) 
    row.appendChild(productsTd) 
     
    document.getElementById('tickets').appendChild(row) 
}



/* -------------------------------------------------------------------------- */
/*                                    load                                    */
/* -------------------------------------------------------------------------- */
window.addEventListener('load', async () => {
/* ------------------- consultar por historial de tickets ------------------- */
    await fetch('/api/tickets/current/10')
    .then(response => response.json())
    .then(res => {
        if(res.payload){
            console.log(res.payload)
            let count= 0
            res.payload.forEach(ticket => {
                count++
                createRow(count,ticket.created_at,ticket.amount,ticket.products)
            });
        }
    })
    .catch(error =>console.log(error));



/* ------------------------- consultar por productos ------------------------ */
    await fetch('/api/products/current/')
    .then(response => response.json())
    .then(res => {
        if(res.payload){
            console.log(res.payload)
        }
    })
    .catch(error =>console.log(error));

    await fetch('/api/products/current/')
    .then(response => response.json())
    .then(res => {
        if(res.payload){
            console.log(res.payload)
        }
    })
    .catch(error =>console.log(error));
})