const selectedNode = document.querySelector('#node')
const btnAlert = document.querySelector('#btnAlert') 
const btnResolve = document.querySelector('#btnResolve')
let textareaOutput = document.querySelector('#output')

const fetchSend = async (url, id) => {
    try{
        const response = await fetch(`${url}/${id}`, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Credentials': 'true',
            //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            // },
             mode: 'no-cors'
        })
        const result = await response.json()
        await console.log(result, ' :v5')
        return result
    } catch(err){
        return err
    }

    // const requestOptions = {
    //   method: "POST",
    //   mode: 'no-cors'
    // };

    // console.log(`${url}/${id}`, ' :v4')
    // fetch(`${url}/${id}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
}

let nodeId = 0

selectedNode?.addEventListener('change', (e) => {
    nodeId = Number(e.target.value)
})

// btnAlert?.addEventListener('click', async () => {
//     const result = await fetchSend('https://poc-monitoringtools-fs-server.vercel.app/api/alerts', nodeId)
//     let resultTxt = await JSON.stringify(result, null, 2)

//     if (textareaOutput) {
//         textareaOutput.innerHTML = `${resultTxt}`;
//         textareaOutput.classList.remove('textareaResolve')
//         textareaOutput.classList.add('textareaAlert')
//     }
// })

const requestOptions = {
    method: "POST", 
    mode: 'no-cors', 
    redirect: "follow"
    //,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    // }
};
btnAlert.addEventListener('click', () => {
    fetch(`https://poc-monitoringtools-fs-server.vercel.app/api/alerts/${nodeId}`, requestOptions)
      .then(response => {
          if(response.ok){
              console.log(response)
              // response.json()
          }
      })
      .then(result => JSON.stringify(result, null, 2))
      .then(txt => {
        if (textareaOutput) {
            textareaOutput.innerHTML = `${txt}`;
            textareaOutput.classList.remove('textareaResolve')
            textareaOutput.classList.add('textareaAlert')
        }
      })           
      .catch((error) => console.error('There is some error: ', error));  
})

btnResolve.addEventListener('click', async () => {
    const result = await fetchSend('https://poc-monitoringtools-fs-server.vercel.app/api/resolves', nodeId)
    let resultTxt = JSON.stringify(result, null, 2)
    
    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaAlert')
        textareaOutput.classList.add('textareaResolve')
    }  
})
