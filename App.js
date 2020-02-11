import React from 'react';
import MainStack from './components/MainStackNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './components/reducer/rootReducer';
const store = createStore(rootReducer);

function App(props) {
  console.disableYellowBox = true;

  return (
    <>
    <Provider store={store} >
    <MainStack/>
    </Provider>
    </>
  )
}

export default App;