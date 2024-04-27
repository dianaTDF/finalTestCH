window.addEventListener('load', async () => {
    const cookies = document.cookie; // Get all cookies as a string
    console.log(cookies);
/*     let response = await fetch('/api/users/current', {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            response= null
            return response
        }
        return response.json(); // This returns a Promise
      })
      .then(data => {
        //console.log('Success:', data);
        // Access the data here
        //console.log('Status:', data.status); // "success"
        console.log('Payload:', data.payload); // Object { _id: "9f758811-363d-4c62-8e3b-c97335c4b594", username: "user1", first_name: "John", … }
        
      })
     */


    
})

