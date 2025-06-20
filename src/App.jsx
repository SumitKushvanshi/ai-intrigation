

import { useState,useEffect } from 'react'
import './App.css'
import { url } from './Constant'
import Answer from './component/Answer'

function App() {


  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([])
  const [chat,setChat]=useState([])
  


  //store history
   
  const payLoad = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }

  const askQuestion = async () => {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payLoad)
    })
    response = await response.json()

    let dataString = response.candidates[0].content.parts[0].text
    dataString = dataString.split("* ")
    dataString = dataString.map((item) => item.trim())

    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }])
    setChat([...result,])
     
     
      setQuestion(""); // Clear input field
 
  
   
  }
  

  const handleKeyDown=(event)=>{
      if (event.key === "Enter") {
      askQuestion();
      setQuestion('')
    }
  }

  return (


    <div className=' grid grid-cols-5 h-screen text-center'>
      <div className='col-span-1 bg-zinc-800' >
        <p className='text-zinc-400 mr-20 '>Chats</p>
       <ul>
         {
          result.map((item ,index)=>(
            item.type=='q'?<li className='text-zinc-300 ml-1 text-left p-2' key={index+Math.random()}>{item.text}</li>:null
          ))
        }
       </ul>
      </div>
      <div className='col-span-4 p-10'>
        <div className='container h-120 overflow-auto'>
          <div className='text-zinc-300'>
            <ul>
              {
                result.map((item, index) => (
                  <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      item.type == 'q' ? <li key={index + Math.random()}
                        className='text-right border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl p-1 w-fit '>
                        <Answer totalResult={1} ans={item.text} index={index} type={item.type} /></li>
                        : item.text.map((answerText, answerIndex) => (
                          <li key={answerIndex + Math.random()} className='text-left '>
                            <Answer totalResult={answerIndex.length} ans={answerText} index={answerIndex} type={item.type} /></li>
                        ))
                    }
                  </div>
                )
                )

              }
            </ul>


          </div>
        </div>
        <div className='text-white bg-zinc-800 w-1/2 m-auto rounded-4xl border-zinc-400 border flex h-16 pr-5'>
          <input type="text" onKeyDown={handleKeyDown}
           value={question} onChange={(event) => setQuestion(event.target.value)} placeholder='Ask me anything' className='w-full h-full p-3 outline-none' />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>

  )
}

export default App
