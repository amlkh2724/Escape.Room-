


import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Registster';
import Home from './pages/Home/Home';
import Room1 from './pages/Room1/Room1';
import Story from './components/Story/Story';


function App() {
  
  const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/home', element: <Home /> },
    { path: '/story', element: <Story /> },
    { path: '/room1', element: <Room1 /> },
  ]);
  // const [username, setUserName] = useState("");

  const [, setShowRoom1] = useState(false);
  // const [isComplete, setIsComplete] = useState(false);

  return (
    <RouterProvider router={router}>
      <div>
        {(
          <div>
         <Home  setShowRoom1={setShowRoom1} />
          </div>
        )}
      </div>
    </RouterProvider>
  );
}



export default App;














// import React, { useState } from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Login from './pages/Login/Login';
// import Register from './pages/Register/Registster';
// import Home from './pages/Home/Home';
// import Room1 from './pages/Room1/Room1';
// import FirstChallenge from './components/GetTheCode/FirstChallenge';
// // import Room2 from './pages/Room2/Room2';
// // import Room3 from './pages/Room3/Room3';
// // import Room4 from './pages/Room4/Room4';

// const router = createBrowserRouter([
//   { path: '/', element: <Login /> },
//   { path: '/register', element: <Register /> },
//   { path: '/home', element: <Home /> },
//   { path: '/Room1', element: <Room1 /> },
//   // { path: '/Room2', element: <Room2 /> },
//   // { path: '/Room3', element: <Room3 /> },
//   // { path: '/Room4', element: <Room4 /> },
// ]);

// function App() {
//   const [userName, setUserName] = useState('');
//   const [showLogin, setShowLogin] = useState(true);
//   const [showRoom1, setShowRoom1] = useState(false);
//   // const [showRoom2, setShowRoom2] = useState(false);
//   // const [showRoom3, setShowRoom3] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);

//   return (
//     <RouterProvider router={router}>
//       <div>
//         <Login setUserName={userName} setShowLogin={setShowLogin} />
//         {(
//           <div>
//             <Home userName={userName} setShowRoom1={setShowRoom1} />
//             {/* {showRoom1 && <Room1 setShowRoom2={setShowRoom2} />} */}
//             {/* {showRoom2 && <Room2 setShowRoom3={setShowRoom3} />}
//             {showRoom3 && <Room3 setShowRoom4={setIsComplete} />} */}
//             <FirstChallenge isComplete={isComplete} setIsComplete={setIsComplete} />
//           </div>
//         )}
//       </div>
//     </RouterProvider>
//   );
// }

// export default App;













