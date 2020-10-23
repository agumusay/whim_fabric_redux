import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import { Canvas } from './features/fabricCanvas/canvas';
import { useSelector, useDispatch } from 'react-redux';
import useDragging from './components/draggableComponent';
import { canvasChange } from './features/fabricCanvas/canvasSlice';
import { fabric } from 'fabric';
import './App.css';
import { Camera } from 'react-feather';
let fabricCanvas = new fabric.Canvas();
var listOfImages = [];

function App() {
	const [findImage, setFindImage] = useState(null);
	const canvasState = useSelector(canvasChange);

	const imageRefs = useRef([]);

	const dispatch = useDispatch();
	// const [dragRef, x, y, isDragging] = useDragging();
	let fabRef = useRef(React.createRef());
	const importAll = r => {
		return r.keys().map(r);
	};
	var imageOffsetX, imageOffsetY;

	const handleMouseDown = ev => {
		setFindImage(ev.target.id);
	};

	const handleDragStart = ev => {
		console.log(imageRefs.current[findImage]);
		const { offsetTop, offsetLeft } = imageRefs.current[findImage].current;

		imageOffsetX = ev.clientX - offsetLeft;
		imageOffsetY = ev.clientY - offsetTop;
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
		let img = imageRefs.current[findImage].current;

		let offset = fabricCanvas._offset;
		let y = ev.clientY - (offset.top + imageOffsetY);
		let x = ev.clientX - (offset.left + imageOffsetX);
		let svgObj = null;
		fabric.loadSVGFromURL(img.src, function (objects, options) {
			let obj = fabric.util.groupSVGElements(objects, options);
			fabricCanvas.add(obj).renderAll();
		});
		let newImage = new fabric.Image(img, {
			width: img.width,
			height: img.height,
			left: x,
			top: y,
		});
		fabricCanvas.add(newImage);
		fabricCanvas.renderAll();
		return false;
	};
	listOfImages = importAll(require.context('../public/images/', false, /\.(png|jpe?g|svg)$/));
	const handleDragEnd = ev => {};
	useEffect(() => {
		let fabricCanvasRef = fabRef.current;

		fabricCanvas.initialize(fabricCanvasRef, {
			height: 1248,
			width: 2000,
			backgroundColor: 'pink',
		});

		fabricCanvas.renderAll();
	}, []);
	imageRefs.current = listOfImages.map((ref, index) => (imageRefs.current[index] = React.createRef()));
	return (
		<div className='App'>
			<div className='images-tab' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll' }}>
				{listOfImages.map((image, index) => (
					<img
						id={index}
						ref={imageRefs.current[index]}
						key={index}
						src={image}
						style={{}}
						draggable='true'
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						onMouseDown={handleMouseDown}
						alt=''></img>
				))}
			</div>
			<div className='canvasContainer' onDragEnter={handleDragEnter} onDrop={handleDrop} onDragOver={handleDragOver}>
				<canvas ref={fabRef}></canvas>
			</div>
		</div>
	);
}
export default App;
