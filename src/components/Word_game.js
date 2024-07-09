import React, { useEffect, useState } from 'react'
const WORDS =['apple','dalia','ball','elephant','people','dream','football']
export default function Word_game() {
    const [isplayOn,setIsPlayOn]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const [correctWord,setCorrectWord]=useState('');
    const[ScrambledWord,setScrambledWord]=useState('');

    const[message,setMessage]=useState('');
    const handleInputChange=(event)=>{
        console.log(event.target.value)
     setInputValue(event.target.value.toUpperCase());
    };
    
    const selectWord =()=>
    {
       const randomIndex = Math.floor(Math.random() * WORDS.length);
       const tempWord = WORDS[randomIndex];
       return tempWord;
       
    };

    const handleButtonClick =()=>{
        console.log("clicked");
        if(inputValue!=='')
        {
        if(correctWord=== inputValue)
        {
            setMessage("CORRECT ANSWER");
        }
        else{
            setMessage("WRONG ANSWER");
        }
       }

    };

    const handleStartGame =()=>
    {
        setIsPlayOn(true);
        setInputValue("");
        setMessage("");
        
        const word= selectWord();
        setCorrectWord(word.toUpperCase());
        setScrambledWord(constructScrambledWord(word));
    };

    const constructScrambledWord = (word) =>{
      const shuffledArray = word.split('');
      //FISHER-YATES SHUFFLE (REMEMBER KARISH)
      for(let i=shuffledArray.length-1; i>0;i--)
      {
        const j= Math.floor(Math.random()*(i+1));
        [shuffledArray[i],shuffledArray[j]]=[shuffledArray[j],shuffledArray[i]];
    }
    return shuffledArray.join('');
    }

    useEffect(()=>{
        let clearMessage;
        if(message === "WRONG ANSWER")
        {
            const clearMessage=setTimeout(()=>setMessage(""),800);
        }
        return()=>{
            if(clearMessage){
                clearTimeout(clearMessage);
            }
        };
      },[message])

  return (
    <body id='entire'>
    <div id='word'>
        {!!message &&(
           <div id='message'>
            <p>{message}</p>
           </div>
        )}
         <h1>Word Game</h1>
         <div id='content'>
           {isplayOn ?(
             <>
              <div id='board'>
                 {correctWord.split("").map((el,i)=>(
                 <span key={`${el}_${i}`} id='square'>
                  {inputValue[i]} 
                </span>
                 ))}
              </div>
          <p id='word1'>{ScrambledWord}</p> {/* {condition ? valueIf_true: valueIf_false} */}
            <div id='fields'>
               <input type='text' onChange={handleInputChange} value={inputValue}/>
                <button type='button' id='button'onClick={handleButtonClick}>Enter</button>
            </div>
       </>
        ) :(<button id='start' type='button' onClick={handleStartGame}>Start Game</button>)}
            {
            isplayOn &&(
                <button id='new' type='button' onClick={handleStartGame}>New Game</button>
            )}
    </div>
</div>
<img src='https://img.freepik.com/premium-psd/mockup-wall-childrens-room-with-teddy-bear-white-wall-background_512478-55.jpg?w=2000'></img>
</body>
  )
}
