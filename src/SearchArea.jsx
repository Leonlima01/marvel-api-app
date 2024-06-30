import { useState } from 'react'

function SearchArea() {
  
  const [pesquisa,setPesquisa] = useState([])
  const [results,setResults] = useState([]);
  const [comics, setComics] = useState([])
  const [character, setCharacter] = useState([])
  
  const auth = "&ts=1&apikey=bc3a272645aaf663032ec67153bc2b8b&hash=816885116c4a1cb1a640b5508bcecc42"
  
  const invalidJpg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg"
  
  function pesquisaHandler(event){
    setPesquisa(event.target.value)
  }
  
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

  function searchComics(id){
    const searchComic = "https://gateway.marvel.com/v1/public/characters/"+id+"/comics?"+auth+"&limit=100";
    fetch(searchComic)
    .then(response => response.json())
    .then(data => {console.log(data);setComics(data.data.results);})
    .catch(err => console.log(err))
  }

  function showComicArea(id,info){
    console.log(id);
    setComics([])
    searchComics(id);
    setCharacter(info)
  }

    
  return (
    <div className="search-area">
      <h2 className='big-text'>Personagens</h2>
      <div className="search-space">
        <input value={pesquisa} type="text" placeholder='Nome' onChange={pesquisaHandler}/>
        <button onClick={searchCharacter}>Pesquisar</button>
      </div>
      <div className='search-grid'>
        {results.map(result => result.thumbnail.path+"/portrait_incredible.jpg" != '' ? <a href='#comic' onClick={() => showComicArea(result.id,[result.name,result.thumbnail.path+"/portrait_incredible."+result.thumbnail.extension])}className='marvel-card' key={result.id}>
        <p>{result.name}</p>
        <img src={result.thumbnail.path+"/portrait_incredible."+result.thumbnail.extension} alt="" />
        </a> : false)}
      </div>


      {character.length!=0?
        <div id='comic' className='comic-area'>
          <span onClick={() => setCharacter([])}>X</span>
          {comics.length==0?false:<div className="marvel-card">
            <p>{character[0]}</p>
            <img src={character[1]} alt="" />
          </div>}
          {comics.length==0?<div className="comic-amount">Loading...</div>:<p className='comic-amount'>Quantidade: {comics.length}</p>}
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
    </div>
  )
}

export default SearchArea
