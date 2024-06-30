import { useState , useEffect } from 'react'

function SearchArea() {
  /*const [count, setCount] = useState(0)*/
  /*md5 816885116c4a1cb1a640b5508bcecc42 */
  
  const [pesquisa,setPesquisa] = useState([])
  function pesquisaHandler(event){
    setPesquisa(event.target.value)
  }
  
  const auth = "&ts=1&apikey=bc3a272645aaf663032ec67153bc2b8b&hash=816885116c4a1cb1a640b5508bcecc42"
  const example = "https://gateway.marvel.com/v1/public/characters?nameStartsWith="+pesquisa+auth+"&limit=100";
  const [results,setResults] = useState([]);
  
  function searchCharacter(){
    setCharacter([])
    const searchName = "https://gateway.marvel.com/v1/public/characters?nameStartsWith="+pesquisa+auth+"&limit=100";
    fetch(searchName)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResults(data["data"]["results"]);
    }).catch(err => {
      console.log(err);
    });
  }

  const [comics, setComics] = useState([])
  const [character, setCharacter] = useState([])

  function searchComics(id){
    const searchComic = "https://gateway.marvel.com/v1/public/characters/"+id+"/comics?"+auth+"&limit=100";
    fetch(searchComic)
    .then(response => response.json())
    .then(data => {console.log(data);setComics(data.data.results);})
    .catch(err => console.log(err))
  }

  function showComicArea(id,info){
    console.log(id);
    searchComics(id);
    setCharacter(info)
  }

  const invalidJpg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg"
    
  return (
    <div className="search-area">
      <div id='comic'className="search-space">
        <input value={pesquisa} type="text" placeholder='Nome' onChange={pesquisaHandler}/>
        <button onClick={searchCharacter}>Pesquisar</button>
      </div>
      {character.length!=0?
        <div className='comic-area'>
          <span onClick={() => setCharacter([])}>X</span>
          <div className="marvel-card">
            <p>{character[0]}</p>
            <img src={character[1]} alt="" />
          </div>
          <p className='comic-amount'>Qtd: {comics.length}</p>
          <h2 className='big-text'>comics</h2>
          <div className="comic-grid">
            {comics.map(comic => <div key={comic.id} className='comic'>
              <img src={comic.thumbnail.path+"/portrait_medium."+comic.thumbnail.extension} alt="" />
              <div className="comic-info">
                <p>{comic.title}</p>
                <p>Pages: {comic.pageCount}</p>
                <p>${comic.prices[0].price}</p>
              </div>
            </div>
            )}
          </div>
        </div>:
        false
      
      }
      <h2 className='big-text'>Characters</h2>
      <div className='search-grid'>
        {results.map(result => result.thumbnail.path+"/portrait_incredible.jpg" != invalidJpg ? <a href='#comic' onClick={() => showComicArea(result.id,[result.name,result.thumbnail.path+"/portrait_incredible."+result.thumbnail.extension])}className='marvel-card' key={result.id}>
        <p>{result.name}</p>
        <img src={result.thumbnail.path+"/portrait_incredible."+result.thumbnail.extension} alt="" />
        </a> : false)}
      </div>
    </div>
  )
}

export default SearchArea
