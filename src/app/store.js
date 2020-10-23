import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../features/fabricCanvas/canvasSlice';

export default configureStore({
	reducer: {
		canvas: canvasReducer,
	},
});
