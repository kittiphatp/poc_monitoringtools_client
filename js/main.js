const selectedNode = document.querySelector('#node')
const btnAlert = document.querySelector('#btnAlert') 
const btnResolve = document.querySelector('#btnResolve')
let textareaOutput = document.querySelector('#output')

const fetchSend = async (url, id) => {
    try{
        const response = await fetch(`${url}/${id}`, {
            method: 'POST',
             mode: 'no-cors'
        })
        const result = await response.json()
        await console.log(result, ' :v5')
        return result
    } catch(err){
        return err
    }
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
    method: "POST"
};
btnAlert.addEventListener('click', () => {
    fetch(`https://poc-monitoringtools-fs-server.vercel.app/api/alerts/${nodeId}`, requestOptions)
      .then(response => {
          if(response.ok){
              return response.json()
          }
      })
      // .then(result => JSON.stringify(result, null, 2))
      .then(result => {
          console.log(result)
          return JSON.stringify(result)
      })
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
