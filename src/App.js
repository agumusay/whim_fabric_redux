import React, { useEffect, useState, useRef, createRef } from 'react';
import logo from './logo.svg';
import { Canvas } from './features/fabricCanvas/canvas';
import { useSelector, useDispatch } from 'react-redux';
import { canvasChange } from './features/fabricCanvas/canvasSlice';
import { fabric } from 'fabric';
import './App.css';

let fabricCanvas = new fabric.Canvas();
var listOfImages = [];

function App() {
	const canvasState = useSelector(canvasChange);
	const dispatch = useDispatch();
	const [findImage, setFindImage] = useState(null);
	const imageRefs = [];

	let fabRef = useRef(React.createRef());
	const importAll = r => {
		return r.keys().map(r);
	};
	var imageOffsetX, imageOffsetY;

	const handleMouseDown = ev => {
		setFindImage(ev.target.id);
	};

	const handleDragStart = ev => {
		console.log(imageRefs[findImage].current.getBoundingClientRect());
		const { top, left } = imageRefs[findImage].current.getBoundingClientRect();
		imageOffsetX = ev.clientX - left;
		imageOffsetY = ev.clientY - top;
	};
	const handleDragOver = ev => {
		if (ev.preventDefault) {
			ev.preventDefault();
		}
		ev.dataTransfer.dropEffect = 'copy';

		return false;
	};
	const handleDragEnter = ev => {};
	const handleDragLeave = ev => {};

	const handleDrop = ev => {
		ev.preventDefault();
		ev.stopPropagation();
		console.log(findImage);
		let img = imageRefs[findImage].current;

		let offset = fabricCanvas._offset;
		console.log(imageOffsetX, imageOffsetY);
		let y = ev.clientY - (offset.top + imageOffsetY);
		let x = ev.clientX - (offset.left + imageOffsetX);

		fabric.loadSVGFromURL(img.src, (objects, options) => {
			let svgImage = fabric.util.groupSVGElements(objects, options);
			svgImage.set({
				left: x,
				top: y,
			});
			svgImage.scale(0.3);
			fabricCanvas.add(svgImage).renderAll();
		});
		// let newImage = new fabric.Image(img, {
		// 	width: img.width,
		// 	height: img.height,
		// 	left: x,
		// 	top: y,
		// });
		// fabricCanvas.add(newImage);
		// fabricCanvas.renderAll();
		return false;
	};
	listOfImages = importAll(require.context('../public/images/', false, /\.(png|jpe?g|svg)$/));
	const handleDragEnd = ev => {};
	useEffect(() => {
		let fabricCanvasRef = fabRef.current;

		fabricCanvas.initialize(fabricCanvasRef, {
			height: 947,
			width: 1400,
			backgroundColor: 'pink',
		});

		fabricCanvas.renderAll();
	}, []);

	return (
		<div className='App'>
			<div
				className='images-tab'
				style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', justifyContent: 'center' }}>
				{listOfImages.map((image, index) => {
					const newRef = createRef();
					imageRefs.push(newRef);
					return (
						<img
							id={index}
							ref={newRef}
							key={index}
							src={image}
							style={{ width: 50, height: 50, margin: '2px' }}
							draggable='true'
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
							onMouseDown={handleMouseDown}
							alt=''></img>
					);
				})}
			</div>
			<div className='canvasContainer' onDragEnter={handleDragEnter} onDrop={handleDrop} onDragOver={handleDragOver}>
				<canvas ref={fabRef}></canvas>
			</div>
		</div>
	);
}
export default App;
