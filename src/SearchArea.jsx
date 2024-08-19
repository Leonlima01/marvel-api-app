import { useState } from 'react'

function SearchArea() {
  
  const [pesquisa,setPesquisa] = useState("")
  const [results,setResults] = useState([]);
  const [comics, setComics] = useState([])
  const [character, setCharacter] = useState([])
  const [loading, setLoading] = useState(true)
  const [found, setFound] = useState(-1)
  
  const auth = "&ts=1&apikey=bc3a272645aaf663032ec67153bc2b8b&hash=816885116c4a1cb1a640b5508bcecc42"
  
  const invalidJpg = "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg"
  
  function pesquisaHandler(event){
    setPesquisa(event.target.value)
  }
  
  function searchCharacter(){
    if(pesquisa.trim()!=""){
      setCharacter([])
      const searchName = "https://gateway.marvel.com/v1/public/characters?nameStartsWith="+pesquisa.trim()+auth+"&limit=100";
      fetch(searchName)
      .then(response => response.json())
      .then(data => {
        setResults(data.data.results);
        setFound(data.data.total);
      }).catch(err => {
        console.log(err);
      });
    }
    else{
      setFound(-1)
    }
    setPesquisa(pesquisa.trim())
  }

  function searchComics(id){
    const searchComic = "https://gateway.marvel.com/v1/public/characters/"+id+"/comics?"+auth+"&limit=10";
    fetch(searchComic)
    .then(response => response.json())
    .then(data => {setComics(data.data.results);setLoading(false)})
    .catch(err => console.log(err))
  }

  function showComicArea(id,info){
    setLoading(true);
    setComics([]);
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
      {found==0?<h2 className='big-text not-found'>Nenhum personagem encontrado</h2>:false}
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
          {loading==true?<div className="comic-amount"><div className='loading'></div><p>Carregando...</p></div>:comics.length > 0 ? <p className='comic-amount'>Quantidade:{comics.length>99?"100+":comics.length}</p> : <p className='comic-amount'>Nenhum encontrado.</p>}
          <h2 className='big-text'>comics</h2>
          <div className="comic-grid">
            {comics.map(comic => <div key={comic.id} className='comic'>
              <img src={comic.thumbnail.path+"/portrait_medium."+comic.thumbnail.extension} alt="" />
              <div className="comic-info">
                <p>{comic.title}</p>
                <p>Páginas: {comic.pageCount}</p>
                <p>Preço: ${comic.prices[0].price}</p>
                <p><a target="_blank" href={comic.urls[0].url}>Página oficial</a></p>
              </div>
              {comic.description!=""?<p className='desc'>{comic.description}</p>:<p className='desc'>No description</p>}
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
