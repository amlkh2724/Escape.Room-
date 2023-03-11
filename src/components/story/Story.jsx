import React, { useState, useEffect } from 'react';
import './Story.css';
import { Link } from 'react-router-dom';

const Story = () => {
  const [story, setStory] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);

  useEffect(() => {
    setStory `You're trapped in a small, windowless room with only one door. You have no idea how you got here or who put you here, but you know you need to escape.

    You quickly realize that the door is locked, and the only way out is to find a pin code to open the door. You start searching the room, looking for any clues or hidden objects that could help you escape.

    As you explore, you notice a panel on the wall with several buttons. Could these buttons be the key to solving the puzzle and escaping? You need to be quick because time is running out.

    Can you escape before it's too late?`;
  }, []);



  return (
    <>
    <div className="allTelevision">
      <div className="television">
        <div className="screen">
          <div className="storyContainer">
            <div className='fixStory'>{story[currentParagraph]}</div>
          </div>
        </div>
      </div>

    </div>
  <div className='linkroom1'><Link className='fixlink' to='/room1'>skip the story</Link></div>
  </>
  );
};

export default Story;
