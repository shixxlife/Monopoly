import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Separate CSS file for styles

const Profile = () => {
    const navigate = useNavigate();
    const viewLeaderboard = () => {
        navigate('/leaderboard');
      };

    return (
        <div className="profile-container">
            <h1>Monopoly Profile</h1>
            <div className="profile-header">
                <img src="berucrying.jpg" alt="Profile Picture" className="profile-picture" />
                <div>
                    <div className="profile-name">aditi</div>
                    <div className="profile-id">ID: #420420</div>
                </div>
            </div>
            <div className="stats">
                <div className="stat">
                    <span>Matches Played:</span>
                    <span>150</span>
                </div>
                <div className="stat">
                    <span>Matches Won:</span>
                    <span>63</span>
                </div>
                <div className="stat">
                    <span>Win Rate:</span>
                    <span>42.0%</span>
                </div>
            </div>
            <button className="leaderboard-btn" onClick={viewLeaderboard}>
                View Leaderboard
            </button>
        </div>
    );
};

export default Profile;
