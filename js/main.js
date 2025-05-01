const selectedNode = document.querySelector('#node')
const btnAlert = document.querySelector('#btnAlert') 
const btnResolve = document.querySelector('#btnResolve')
let textareaOutput = document.querySelector('#output')

const fetchSend = async (url, id) => {
    // try{
    //     const response = await fetch(`${url}/${id}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Credentials': 'true',
    //             'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    //         },
    //          mode: 'no-cors'
    //     })
    //     const result = await response.json()
    //     return result
    // } catch(err){
    //     return err
    // }

    const requestOptions = {
      method: "POST",
      redirect: "follow"
    };
    
    fetch(`${url}/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

let nodeId = 0

selectedNode?.addEventListener('change', (e) => {
    nodeId = Number(e.target.value)
})

btnAlert?.addEventListener('click', async () => {
    // const result = await fetchSend('http://localhost:3000/api/alerts', nodeId)
    const result = await fetchSend('https://poc-monitoringtools-fs-server.vercel.app/api/alerts', nodeId)
    let resultTxt = JSON.stringify(result, null, 2)

    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaResolve')
        textareaOutput.classList.add('textareaAlert')
    }
})

btnResolve?.addEventListener('click', async () => {
    // const result = await fetchSend('http://localhost:3000/api/resolves', nodeId)
    const result = await fetchSend('https://poc-monitoringtools-fs-server.vercel.app/api/resolves', nodeId)
    let resultTxt = JSON.stringify(result, null, 2)
    
    if (textareaOutput) {
        textareaOutput.innerHTML = `${resultTxt}`;
        textareaOutput.classList.remove('textareaAlert')
        textareaOutput.classList.add('textareaResolve')
    }  
})
