
import React from 'react';
// import Home from './pages/home'
// import About from './pages/about'
// import Home from './pages/home2'
// import About from './pages/about2'
import Home from './pages/home-3-react-redux-connect'
import About from './pages/about3'
// import HomeAsync from './pages/home-4-常规异步操作'
import HomeThunk from './pages/home-5-redux-thunk使用'
const App = () => {
  return (
    <div>
      app
      <Home />
      <About />
      {/* <HomeAsync /> */}
      <HomeThunk />
    </div>
  );
};
export default App;

