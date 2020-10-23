import { createSlice } from '@reduxjs/toolkit';

export const canvasSlice = createSlice({
	name: 'fabricCanvas',
	initialState: {
		canvasObject: {
			objects: [
				{
					type: 'circle',
					originX: 'center',
					originY: 'center',
					left: 50,
					top: 50,
					width: 100,
					height: 100,
					fill: '#FF00FF',
					stroke: null,
					strokeWidth: 1,
					strokeDashArray: null,
					strokeLineCap: 'butt',
					strokeLineJoin: 'miter',
					strokeMiterLimit: 10,
					scaleX: 1,
					scaleY: 1,
					angle: 0,
					flipX: false,
					flipY: false,
					opacity: 1,
					shadow: null,
					visible: true,
					clipTo: null,
					backgroundColor: '',
					fillRule: 'nonzero',
					globalCompositeOperation: 'source-over',
					transformMatrix: null,
					radius: 50,
					startAngle: 0,
					endAngle: 6.283185307179586,
				},
				{
					type: 'rect',
					originX: 'center',
					originY: 'center',
					left: 126,
					top: 210,
					width: 100,
					height: 100,
					fill: '#FF0000',
					stroke: null,
					strokeWidth: 1,
					strokeDashArray: null,
					strokeLineCap: 'butt',
					strokeLineJoin: 'miter',
					strokeMiterLimit: 10,
					scaleX: 1,
					scaleY: 1,
					angle: 0,
					flipX: false,
					flipY: false,
					opacity: 1,
					shadow: null,
					visible: true,
					clipTo: null,
					backgroundColor: '',
					fillRule: 'nonzero',
					globalCompositeOperation: 'source-over',
					transformMatrix: null,
					radius: 50,
					startAngle: 0,
					endAngle: 6.283185307179586,
				},
				{
					type: 'triangle',
					originX: 'center',
					originY: 'center',
					left: 250,
					top: 100,
					width: 100,
					height: 100,
					fill: '#00F00F',
					stroke: null,
					strokeWidth: 1,
					strokeDashArray: null,
					strokeLineCap: 'butt',
					strokeLineJoin: 'miter',
					strokeMiterLimit: 10,
					scaleX: 1,
					scaleY: 1,
					angle: 0,
					flipX: false,
					flipY: false,
					opacity: 1,
					shadow: null,
					visible: true,
					clipTo: null,
					backgroundColor: '',
					fillRule: 'nonzero',
					globalCompositeOperation: 'source-over',
					transformMatrix: null,
					radius: 50,
					startAngle: 0,
					endAngle: 6.283185307179586,
				},
			],
			background: '',
		},
	},
	reducers: {
		canvasChange: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state = { ...state, canvasObject: action.payload.canvasObject, selectedObject: action.payload.selectedObject };
		},
	},
});

export const { canvasChange } = canvasSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default canvasSlice.reducer;
