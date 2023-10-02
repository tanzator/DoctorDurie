import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//creating a redux store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Index from './src/reducers/Index';
import Router from './Router';
const ReduxThunk = require('redux-thunk').default;
const store = createStore(Index, applyMiddleware(ReduxThunk));


export default function App() {
    return (
      <SafeAreaProvider
          style={styles.container}
          edges={['right', 'left']}
      >
        <Provider store={store}>
          <Router/>
        </Provider>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
