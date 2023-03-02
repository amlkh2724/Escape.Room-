// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Room3({ setShowRoom4 }) {
//     const [isSolved, setIsSolved] = useState(false);

//     const handleSolve = () => {
//         setIsSolved(true);
//     }

//     return (
//         <div>
//             {!isSolved ? (
//                 <div>
//                     <h2>Room 3</h2>
//                     <p>Solve the puzzle to escape!</p>
//                     <button onClick={handleSolve}>Solve</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h2>Room 3 Solved!</h2>
//                     <p>You can now move to the next room.</p>
//                     <button onClick={() => setShowRoom4(true)}>{}</button>
//                     <Link to={"/Room4"}>go to Room4</Link>
//                 </div>
//             )}
//         </div>
//     )
// }
// export default Room3
