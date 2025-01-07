import { Canvas, Circle, Image as FabricImage, Rect, } from 'fabric';
import React, { useEffect, useRef, useState } from "react";
import { BiDuplicate, BiImageAdd, BiSolidTrash } from "react-icons/bi";
import {
    FaRegCircle,
    FaRegSquare
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { generateRandomHex } from "../../Utils/common";
import { ACTIONS } from "../../Utils/Constants";
import elementOptions, { elementStylesWhenSelected } from "../../Utils/elementOptions";
import Settings from '../Settings/Setting';
import "./style.css";
import { clearGuideLines, handleObjectMoving } from '../../helpers/snappingHelper';
import Layers from '../Layers/Layers';
import { Form, Tab, Tabs } from 'react-bootstrap';
import logo from '../../Assets/Images/android-icon-72x72.png'
const MainCanvas = () => {
    const width = 1080 / 2;
    const height = 1080 / 2;
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null)
    const [action, setAction] = useState(ACTIONS.SELECT);
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState({});
    const [showImageOptions, setShowImageOptions] = useState(false)
    const [contextMenu, setcontextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
    });
    const [imageOptionsTabKey, setImageOptionsTabKey] = useState('local');
    const [shapeOptionsTabKey, setShapeOptionsTabKey] = useState('styles');
    const [guideLines, setGuideLines] = useState([])
    const [localAssets, setLocalAssets] = useState([]);


    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width, height,
            });

            initCanvas.backgroundColor = "#fff";
            initCanvas.renderAll();
            setCanvas(initCanvas)
            initCanvas.on('object:moving', (event) => {
                handleObjectMoving(initCanvas, event.target, guideLines, setGuideLines)
            });
            initCanvas.on('object:modified', () => {
                clearGuideLines(initCanvas, guideLines, setGuideLines)
            })
            // initCanvas.on('mouse:wheel', function (opt) {
            //     var delta = opt.e.deltaY;
            //     var zoom = initCanvas.getZoom();
            //     zoom *= 0.999 ** delta;
            //     if (zoom > 20) zoom = 20;
            //     if (zoom < 0.01) zoom = 0.01;
            //     initCanvas.setZoom(zoom);
            //     opt.e.preventDefault();
            //     opt.e.stopPropagation();
            // })
            return () => {
                initCanvas.dispose()
            }
        }


    }, [])

    const handleElementBtnClick = (action) => {

        if (canvas) {
            switch (action) {
                case ACTIONS.RECTANGLE:
                    const newRect = new Rect({
                        top: (width - 50) / 2,
                        left: (height - 50) / 2,
                        width: 50,
                        height: 50,
                        strokeWidth: 0,
                        strokeUniform: true,
                        fill: generateRandomHex(),
                        ...elementStylesWhenSelected
                    })
                    canvas.add(newRect)
                    canvas.setActiveObject(newRect)
                    break;
                case ACTIONS.CIRCLE:
                    const newCircleOptions = new Circle({
                        top: (width - 50) / 2,
                        left: (height - 50) / 2,
                        radius: 50,
                        fill: generateRandomHex(),
                        ...elementStylesWhenSelected
                    });
                    canvas.add(newCircleOptions)
                    canvas.setActiveObject(newCircleOptions)
                    break;
                default:
                    break;
            }
        }

    };




    const handleDeleteElement = () => {

        setElements(elements.filter((ele) => ele.props.id !== selectedElement.id));
        setSelectedElement({});
    };
    const handleDuplicate = () => {
        const eleM = elements.find((ele) => ele.props.id === selectedElement.id);
        if (eleM) {
            // Create a duplicate object with a new id
            const duplicateElement = {
                ...eleM,
                props: {
                    ...eleM.props,
                    id: uuidv4(),
                },
            };

            // Update the elements array with the new element
            const updatedElements = [...elements, duplicateElement];
            // Update the state
            setElements(updatedElements);
        }

    }


    const handleImageOptions = () => {
        setShowImageOptions(!showImageOptions)
    }
    const handleChangeInput = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setLocalAssets([...localAssets, { src: url, name: file.name }])
    }
    function handleImageToCanvas (imageUrl) {
        // Ensure the canvas object is initialized
        if (!canvas || !imageUrl) {
            console.error("Canvas or Image URL is missing.");
            return;
        }

        // Add the image to the canvas

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.crossOrigin = 'anonymous';

        imageElement.onload = () => {
            const imgW = imageElement.width;
            const imgH = imageElement.height;
            const canvasW = canvas.width;
            const canvasH = canvas.height;
            const scale = Math.min(canvasW / imgW, canvasH / imgH);
            canvas.renderAll();
            const fabricImage = new FabricImage(imageElement, {
                left: canvas.width / 2 - imgW / 2, // Center horizontally
                top: canvas.height / 2 - imgH / 2, // Center vertically
                scaleX: scale,
                scaleY: scale
            })
            canvas.add(fabricImage);
            canvas.renderAll()
        }
    }
    return (
        <>


        <div className="canvas">
                <div className="d-flex flex-column h-100 ">
                    <img src={logo} alt="" className="img-fluid mr-2" />
                    <div className="elements-wrapper">
                        <div className="elements">
                            <button
                                id={ACTIONS.RECTANGLE}
                                onClick={() => handleElementBtnClick(ACTIONS.RECTANGLE)}
                                className={`elementBtn ${action === ACTIONS.RECTANGLE && "elementBtnSelected"
                                    }`}
                            >
                                <FaRegSquare />
                            </button>
                            <button
                                id={ACTIONS.CIRCLE}
                                onClick={() => handleElementBtnClick(ACTIONS.CIRCLE)}
                                className={`elementBtn ${action === ACTIONS.CIRCLE && "elementBtnSelected"}`}
                            >
                                <FaRegCircle />
                            </button>
                            <button
                                id={'IMAGE'}
                                onClick={handleImageOptions}
                                className={`elementBtn`}
                            >
                                <BiImageAdd />
                            </button>

                        </div>
                        {showImageOptions && <div className="card imageOptionsCard ">
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={imageOptionsTabKey}
                                onSelect={(k) => setImageOptionsTabKey(k)}
                                className="px-3 imageOptionsTabs"
                            >
                                <Tab eventKey="local" title="Local">
                                    <div className="local-uploads d-flex flex-column ">
                                        <Form.Group controlId="formFileSm" className="p-3 ">
                                            <Form.Control onChange={handleChangeInput} type="file" accept=".png,.jpg.jpeg.webp.svg" size="sm" />
                                        </Form.Group>
                                        <div className="localUploads px-3 d-flex flex-column">
                                            <p className="text-left"> My Uploads</p>
                                            <div className="d-flex flex-row flex-wrap justify-content-start gap-1">
                                                {localAssets.map(image =>
                                                    <button onClick={() => handleImageToCanvas(image.src)} className="btn p-0">
                                                        <img
                                                            src={image.src}
                                                            className="rounded thumbnail"
                                                            alt=""
                                                        />
                                                    </button>
                                                )}


                                            </div>
                                        </div>
                                    </div>

                                </Tab>
                                <Tab eventKey="online" title="Online">
                                    Tab content for Profile
                                </Tab>

                            </Tabs>

                        </div>}
                    </div>
</div>
           


            <div className="canvasStage"
            >
                <canvas id="canvas" ref={canvasRef}></canvas>
                {contextMenu.show && (
                    <div
                        style={{
                            position: "absolute",
                            left: contextMenu.x,
                            top: contextMenu.y,
                        }}
                    >
                        {/* Content of your context menu */}
                        <div className="list-group">
                            <button
                                onClick={handleDeleteElement}
                                type="button"
                                className="context-menu-list list-group-item list-group-item-action "
                            >
                                <BiSolidTrash />
                                <span>Delete</span>
                            </button>
                            <button
                                onClick={handleDuplicate}
                                type="button"
                                className="context-menu-list list-group-item list-group-item-action "
                            >
                                <BiDuplicate />
                                <span>Duplicate</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="settingsPanel bg-dark">
                <Tabs
                    id="shapeOptions"
                    activeKey={shapeOptionsTabKey}
                    onSelect={(k) => setShapeOptionsTabKey(k)}
                    className="px-3 shapeOptionsTabs">
                    <Tab eventKey="styles" title="Styles">
                        <Settings canvas={canvas} />

                    </Tab>
                    <Tab eventKey="layers" title="Layers">
                        <Layers canvas={canvas} />
                    </Tab>
                </Tabs>
            </div>
            </div>
        </>
    );
};

export default MainCanvas;
