import { useState , useEffect } from 'react'

function App() {
  /*const [count, setCount] = useState(0)*/
  /*md5 816885116c4a1cb1a640b5508bcecc42 */
  
  const [pesquisa,setPesquisa] = useState()
  function pesquisaHandler(event){
    setPesquisa(event.target.value)
  }
  
  const auth = "&ts=1&apikey=bc3a272645aaf663032ec67153bc2b8b&hash=816885116c4a1cb1a640b5508bcecc42"
  const example = "https://gateway.marvel.com/v1/public/characters?nameStartsWith="+pesquisa+auth+"&limit=100";
  const [results,setResults] = useState([]);
  
  function searchCharacter(){
    fetch(example)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResults(data["data"]["results"]);
    }).catch(err => {
      console.log(err);
    });
  }
  const invalidJpg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg"
    
  return (
    <>
      <input value={pesquisa} type="text" placeholder='Nome do personagem' onChange={pesquisaHandler}/>
      <button onClick={searchCharacter}>Pesquisar</button>
      <ol>{results.map(result => result.thumbnail.path+"/portrait_incredible.jpg" != invalidJpg ? <li key={result.id}>
        <p>{result.name}</p>
        <img src={result.thumbnail.path+"/portrait_incredible.jpg"} alt="" />
        </li> : false)}</ol>
    </>
  )
}

export default App
