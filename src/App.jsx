import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [bestScore,setBestScore] = useState(0);
  const [currentScore,setCurrentScore] = useState(0);
  const [imageList,setImageList] = useState([]);
  const [visited,setVisited] = useState(new Set());
  // const
  console.log(imageList);


  function onClickHandler(url){
    if(visited.has(url)){
      if(currentScore > bestScore)
        setBestScore(currentScore);
      setVisited(new Set());
      setCurrentScore(0);
    }else{
      setVisited(new Set([...visited,url]))
      setCurrentScore(currentScore+1)
      setImageList([...(shuffle(imageList))])
    }
  }

  useEffect(()=> {
    fetch("https://dog.ceo/api/breeds/image/random/12")
    .then(res => res.json())
    .then(res => setImageList(res.message))
    .catch(error => console.error(error))
  },[])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    return array;
  }

  return (
    <>
    <div className='score-card'>
    <div>
        Current Score : {currentScore}
      </div>
      <div>
        Best Score : {bestScore}
      </div>
    </div>
    <div className='container'>
      {
        imageList.map((item) => {
        return (<>
        <img src={item} alt="" width="200px" height="auto"
            onClick={() => onClickHandler(item)}/>
            
          </>)
        })
      }
    </div>
    </>
  )
}

export default App

