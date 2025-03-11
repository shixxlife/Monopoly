import {useState} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './Login';
import Home from './home';
import Leaderboard from './LeaderBoard';
import Profile from './Profile'
import Game from './players/game';
import Game2 from './players/Game2';
import Game3 from './players/Game3';
import Game5 from './players/Game5';
import Game6 from './players/Game6';
import Rulebook from './rulebook';
import Addfriend from './addfriend';

function App() {
  const [userName, setUserName] = useState(null);
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup/>}></Route>
          <Route 
            path='/login' 
            element={<Login setUserName={setUserName} />} 
          />
          <Route 
            path='/home' 
            element={<Home userName={userName} />
            } 
          />
          <Route path='/leaderboard' element={<Leaderboard/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route 
          path="/game" 
          element={<Game />} 
        />
        <Route path='/game2' element={<Game2/>}></Route>
        <Route path='/game3' element={<Game3/>}></Route>
        <Route path='/game5' element={<Game5/>}></Route>
        <Route path='/game6' element={<Game6/>}></Route>

        <Route path='/rulebook' element={<Rulebook/>}></Route>
        <Route path='/addfriend' element={<Addfriend/>}></Route>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
