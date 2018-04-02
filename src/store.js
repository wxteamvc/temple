'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage'
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist:['personalReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store)


