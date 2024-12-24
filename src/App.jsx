import './App.css'
import React, { useContext } from 'react'
import va from "./assets/ai.png"
import { FaMicrophoneAlt } from "react-icons/fa";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"
function App() {
  let {recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse}=useContext(datacontext)
  return (
    <>
    <div className="main">
      <img src={va} alt="" id="sangini"/>
      <span>I'm Sangini, Your Advanced Virtual Assistant</span>
      {!speaking? 
      <button onClick={()=>{
        setPrompt("listening...")
        setSpeaking(true)
        setResponse(false)
        recognition.start()
      }}>Click Here <FaMicrophoneAlt /></button>
      :
      <div className='response'>
        {!response?
        <img src={speakimg} alt="" id="speak"/>:
        <img src={aigif} alt="" id="aigif"/>}
        
        <p>{prompt}</p>
      </div>
      }
      
    </div>
    </>
  )
}

export default App
