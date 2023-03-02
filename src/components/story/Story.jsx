import React from 'react';
import { useState, useEffect } from 'react';

const Story = () => {
    const [story, setStory] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setStory("You're trapped in a small, windowless room with only one door. You have no idea how you got here or who put you here, but you know you need to escape. You quickly realize that the door is locked, and the only way out is to find a key. You start searching the room, looking for any clues or hidden objects that could help you escape. As you explore, you notice a panel on the wall with several buttons. Could these buttons be the key to solving the puzzle and escaping? You need to be quick because time is running out. Can you escape before it's too late?");
        }, 4000);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStory('');
        }, 8000);

        return () => {
            clearTimeout(timer);
        };
    }, [story]);

    return (
        <div>{story}</div>
    );
};

export default Story;
