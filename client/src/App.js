import './App.css';
import GameInfo from "./component/GameInfo"
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom"


function App(){

  return(
    <div className="App">
      <Routes>
        <Route exact path='/games/:id' element={<GameInfo/>}/>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
    </div>
    )
  }
export default App;