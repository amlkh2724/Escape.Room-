// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// function Room2({ setShowRoom3 }) {
//   const [isSolved, setIsSolved] = useState(false);

//   const handleSolve = () => {
//     setIsSolved(true);
//   }

//   return (
//     <div>
//       {!isSolved ? (
//         <div>
//           <h2>Room 2</h2>
//           <p>Solve the puzzle to escape!</p>
//           <button onClick={handleSolve}>Solve</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Room 2 Solved!</h2>
//           <p>You can now move to the next room.</p>
//           <button onClick={() => setShowRoom3(true)}></button>
//           <Link to={"/Room3"}>go to Room3</Link>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Room2;
