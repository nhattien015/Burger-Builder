import {configureStore} from '@reduxjs/toolkit';
import orderSlice from '../features/makeCakeSlice'
const store = configureStore({
    reducer: {
        order: orderSlice     
    }
})

export {store}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;