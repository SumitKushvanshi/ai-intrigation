import { useEffect, useState } from "react"
import { checkString, checkStringReplace, formating } from "../helper"

function Answer({ ans,index,totalResult,type }) {
    const[heading,setHeading]=useState(false)
    const [answer,setAnswer]=useState(ans)
//  console.log(index)
    useEffect(() => {
        // console.log(ans, checkString(ans))
        if(checkString(ans)){
            setHeading(true)
            setAnswer(checkStringReplace(answer), formating(ans))
            // setAnswer(formating(answer))
        }
       
    }, [])

 
    return (

        <>
              {
                index===0 && totalResult > 1?<span className="py-5 block text-xl text-white">{answer}</span>:  heading ?<span className="py-5 block text-lg text-white">{answer}</span>:
                <span className={type=='q'?'pl-1':'pl-5'}>{answer}</span>
              }
          
        </>
    )
}
export default Answer