import { Provider } from 'react-redux';
import Main from './Main';
import store from './redux/store';
import MapScreen from './screens/MapScreen';


function App() {
  return (
    <Provider store={store}>
      {/* <Main /> */}
      <MapScreen />
    </Provider>
  );
}

export default App;

