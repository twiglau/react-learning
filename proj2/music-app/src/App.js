import React from 'react';
import {Provider} from 'react-redux';
import store from './store'

import TWMain from '@/pages/main'
function App(){
  return (
    <Provider store={store}>
       <TWMain />
    </Provider>
  )
}

export default App;