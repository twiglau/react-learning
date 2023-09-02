
import React from 'react';
// import About from './pages/about2'
import Home from './pages/home-3-react-redux-connect'
import About from './pages/about3'
import HomeSaga from './pages/home-6-redux-saga使用'
const App = () => {
  return (
    <div>
      app
      <Home />
      <About />
      {/* <HomeAsync /> */}
      {/* <HomeThunk /> */}
      <HomeSaga />
    </div>
  );
};
export default App;

