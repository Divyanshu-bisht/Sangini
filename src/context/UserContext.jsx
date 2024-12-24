import React, { Children, createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

function UserContext({children}) {
    let[speaking,setSpeaking]=useState(false)
    let [prompt,setPrompt]= useState("listening...")
    let [response,setResponse]=useState(false)
    
    function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text)
        text_speak.volume=1;
        text_speak.rate=1;
        text_speak.pitch=1;
        text_speak.lang="hi-GB"
        window.speechSynthesis.speak(text_speak)
      }

      async function aiReponse(prompt){
        let text = await run(prompt)
        let newText=text.split("**")&&text.split("*")&&text.replace("google","divyanshu bisht")&&text.replace("Google","divyanshu bisht")
        setPrompt(newText)
        speak(newText)
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
        
      }
      let speechRecognition = window.SpeechRecognitionAlternative || window.webkitSpeechRecognition
      let recognition=new speechRecognition()
      recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex
        let transcript=e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command){
      if(command.includes("open")&&command.includes("youtube")){
        window.open("https://www.youtube.com/","_blank")
        speak("opening youtube")
        setResponse(true)
        setPrompt("opening youtube...")
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
      }
      else if(command.includes("open")&&command.includes("google")){
        window.open("https://www.google.com/","_blank")
        speak("opening google")
        setPrompt("opening google...")
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
      }
      else if(command.includes("open")&&command.includes("instagram")){
        window.open("https://www.instagram.com/","_blank")
        speak("opening instagram")
        setPrompt("opening instagram...")
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
      }
      else if(command.includes("open")&&command.includes("spotify")){
        window.open("https://www.spotify.com/","_blank")
        speak("opening spotify")
        setPrompt("opening spotify...")
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
      }
      else if(command.includes("date")){
        let date = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"})
        speak(date)
        setPrompt(date)
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
      }

      else if(command.includes("time")){
        let time = new Date().toLocaleString(undefined,{day:"numeric", month:"short"})
        speak(time)
        setPrompt(time)
        setResponse(true)
        setTimeout(()=>{
          setSpeaking(false)
        },8000)
      }

      else{
        aiReponse(command)
      }
    }
      
      let value = {
        recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse
      }

  return (
    <div>
        <datacontext.Provider value = {value}>
      {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext
