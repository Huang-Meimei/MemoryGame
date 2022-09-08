import { configureStore } from '@reduxjs/toolkit';
import dashBoard from './slice/dashBoard';

export default configureStore({
    reducer: {
        dashBoard,
    }
});

