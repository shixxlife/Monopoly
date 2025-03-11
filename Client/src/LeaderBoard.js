import React, { useEffect } from 'react';
import './Leaderboard.css'; // Move your CSS styles to a separate file, or use inline styling
import { useNavigate } from 'react-router-dom';

const friends = [
    { name: "Zameer Ahmed Khan", points: "28000", img: "img5.jpg" },
    { name: "Baba", points: "26800", img: "img6.jpg" },
    { name: "Selmon", points: "26300", img: "img4.jpg" },
    { name: "Vivian Siraj", points: "26000", img: "img7.jpg" },
    { name: "Nitya", points: "25650", img: "img1.jpg" },
    { name: "Dolly", points: "25420", img: "img8.jpg" },
    { name: "RaGa", points: "00000", img: "img3.jpg" }
];


const Leaderboard = () => {
    const navigate = useNavigate();
    const displayFriends = () => {
        return friends.map((friend, index) => (
            <li key={index} className="friend-item">
                <img src={friend.img} alt={friend.name} className="friend-img" />
                <span className="friend-name">{friend.name}</span>
                <span className="friend-points">{friend.points}</span>
            </li>
        ));
    };

    const handleAddFriend = () => {
        navigate('/addfriend');
    };

    return (
        <div className="container">
            <div className="header">
                <button onClick={handleAddFriend} className="add-friend-btn">Add Friends</button>
            </div>
            <div className="leaderboard">
                <h2>Friends Leaderboard</h2>
                <ul className="friend-list">
                    {displayFriends()}
                </ul>
            </div>
            <div className="message">You have {friends.length} friends in your leaderboard.</div>
        </div>
    );
};

export default Leaderboard;
