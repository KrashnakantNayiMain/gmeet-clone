import React, { useEffect, useState } from 'react';
import './css/Main.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [code, setCode] = useState('');
  const navigator = useNavigate();
  const  handleNewMeeting = () => {
    localStorage.setItem('new-meeting', 1);
    navigator('/meeting/'+ uuidv4());
  };
  const handleJoin = () => {
    if(code) {
      localStorage.setItem('join-meeting', 1);
      navigator('/meeting/'+code);
    }
  };

  useEffect(()=>{
    localStorage.removeItem('new-meeting');
    localStorage.removeItem('join-meeting');
  }, []);

  return (
    <main className="main">
      <div className="main-content">
        <h1>Premium video meetings. Now free for everyone.</h1>
        <p>We re-engineered the service we built for secure business meetings, Google Meet, to make it free and available for all.</p>
        <div className="main-actions">
          <button onClick={handleNewMeeting}>New Meeting</button>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter a meeting code" />
          <button onClick={handleJoin} disabled={!code}>Join</button>
        </div>
      </div>
    </main>
  );
}

export default Main;
