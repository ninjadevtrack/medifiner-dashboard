import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default function configureStore(initialState) {
  const middlewares = [thunk];
  let enhancer;
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension(),
    );
  } else {
    enhancer = compose(applyMiddleware(...middlewares));
  }

  const store = createStore(
    reducers,
    initialState,
    enhancer,
  );

  if (typeof window !== 'undefined') {
    window.store = store;
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = reducers;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
