import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'

function Home({ userName }) {
  const [showModal, setShowModal] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);
  const navigate = useNavigate();

  const viewProfile = () => {
    navigate('/profile');
  };

  const viewRulebook = () => {
    navigate('/rulebook');
  };

  const viewLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleStartGame = () => {
    console.log('Starting game with', numPlayers, 'players');
    if (numPlayers < 2 || numPlayers > 6) {
      alert("Please select between 2 and 6 players.");
      return;
    }

    // Move the navigation logic inside the handleStartGame function
    switch(numPlayers) {
      case 2:
        navigate('/game2', { state: { numPlayers } });
        break;
      case 3:
        navigate('/game3', { state: { numPlayers } });
        break;
      case 4:
        navigate('/game', { state: { numPlayers } });
        break;
      case 5:
        navigate('/game5', { state: { numPlayers } });
        break;
      case 6:
        navigate('/game6', { state: { numPlayers } });
        break;
      default:
        alert("Unsupported number of players");
    }
  };

  const handlePlayClick = () => {
    console.log('Play button clicked, showing modal');
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="welcome">
        Welcome to Monopoly, <span>{userName || "Player"}</span>!
      </div>

      <button 
        className="button" 
        onClick={viewProfile}
      >
        View Profile
      </button>
      <button 
        className="button" 
        onClick={viewRulebook}
      >
        RuleBook
      </button>
      <button 
        className="button" 
        onClick={viewLeaderboard}
      >
        Leaderboard
      </button>
      <button 
        className="button" 
        onClick={handlePlayClick}
      >
        Play
      </button>

      <div className="footer">
        &copy; 2024 Monopoly Game | Have fun and play fair!
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span 
              className="close" 
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2>
              Select Number of Players
            </h2>
            <input
              type="number"
              className="player-input"
              min="2"
              max="6"
              value={numPlayers}
              onChange={(e) => {
                console.log('Number changed to:', e.target.value);
                setNumPlayers(Number(e.target.value));
              }}
            />
             <button 
              className="button" 
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Removed inline styles as they should be in the CSS file

export default Home;