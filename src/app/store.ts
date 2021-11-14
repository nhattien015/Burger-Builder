import {configureStore} from '@reduxjs/toolkit';
import makeCakeSlice from '../features/makeCakeSlice'
import authSlice from '../features/user/authSlice'
import orderSlice from '../features/user/orderSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
      makeCake: makeCakeSlice,
      auth: authSlice,
      order: orderSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
    
})

sagaMiddleware.run(rootSaga);

export {store}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
