import { useState , useEffect } from 'react'
import SearchArea from './SearchArea'
import Header from './Header'
import Footer from './Footer'
function App() {
  
  return(
    <div className='app'>
      <Header/>
      <SearchArea/>
      <Footer/>
    </div>
  )
}

export default App
