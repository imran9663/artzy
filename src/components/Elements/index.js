import React, { useState } from 'react';
import './styles.css';
import { Circle, FabricImage, Line, Rect, Triangle } from 'fabric';
import { ACTIONS } from '../../Utils/Constants';
import { LuShapes } from 'react-icons/lu';
import { TbCircle, TbLine, TbPhotoPlus, TbSquare, TbTriangle } from 'react-icons/tb';
import { Form, Tab, Tabs } from 'react-bootstrap';
import { generateRandomHex } from '../../Utils/common';
import { elementStylesWhenSelected } from '../../Utils/elementOptions';
const Elements = ({ canvas }) => {
    const [imageOptionsTabKey, setImageOptionsTabKey] = useState("local");
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [localAssets, setLocalAssets] = useState([]);
    const [showElementOptions, setShowElementOptions] = useState(false)

    const handleElementBtnClick = (action) => {
        if (canvas) {
            switch (action) {
                case ACTIONS.RECTANGLE:
                    const newRect = new Rect({
                        top: (canvas.getWidth() - 50) / 2,
                        left: (canvas.getHeight() - 50) / 2,
                        width: 50,
                        height: 50,
                        strokeWidth: 0,
                        strokeUniform: true,
                        fill: generateRandomHex(),
                        ...elementStylesWhenSelected,
                    });

                    canvas.add(newRect);

                    canvas.setActiveObject(newRect);
                    break;
                case ACTIONS.CIRCLE:
                    const newCircleOptions = new Circle({
                        top: (canvas.getWidth() - 50) / 2,
                        left: (canvas.getHeight() - 50) / 2,
                        radius: 50,
                        fill: generateRandomHex(),
                        ...elementStylesWhenSelected,
                    });
                    canvas.add(newCircleOptions);
                    canvas.setActiveObject(newCircleOptions);
                    break;
                case ACTIONS.TRIANGLE:
                    const newTriangle = new Triangle({
                        top: (canvas.getWidth() - 50) / 2,
                        left: (canvas.getHeight() - 50) / 2,
                        width: 50,
                        height: 50,
                        fill: generateRandomHex(),
                        ...elementStylesWhenSelected,
                    });
                    canvas.add(newTriangle);
                    canvas.setActiveObject(newTriangle);
                    break;
                // case ACTIONS.ELLIPSE:
                //     const newEllipse = new Ellipse({
                //         top: (canvas.getWidth() - 50) / 2,
                //         left: (canvas.getHeight() - 50) / 2,
                //         rx: 60,
                //         ry: 50,
                //         fill: generateRandomHex(),
                //         ...elementStylesWhenSelected,
                //     });
                //     canvas.add(newEllipse);
                //     canvas.setActiveObject(newEllipse);
                //     break;
                case ACTIONS.LINE:
                    const newLine = new Line([50, 100, 200, 100], {
                        top: (canvas.getWidth() - 50) / 2,
                        left: (canvas.getHeight() - 50) / 2,
                        strokeWidth: 5,
                        stroke: generateRandomHex(),
                        ...elementStylesWhenSelected,
                    });
                    canvas.add(newLine);
                    canvas.setActiveObject(newLine);
                    break;
                // case ACTIONS.POLYGON:
                //     const newPolygon = new Polygon({
                //         top: (canvas.getWidth() - 50) / 2,
                //         left: (canvas.getHeight() - 50) / 2,
                //         points: [ // Array of points defining the polygon
                //             { x: 0, y: 0 },
                //             { x: 50, y: 100 },
                //             { x: 100, y: 0 }
                //         ],
                //         fill: generateRandomHex(),
                //         ...elementStylesWhenSelected,
                //     });
                //     canvas.add(newPolygon);
                //     canvas.setActiveObject(newPolygon);
                //     break;
                default:
                    break;
            }
        }
    };
    const handleChangeInput = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setLocalAssets([...localAssets, { src: url, name: file.name }]);
    };
    function handleImageToCanvas (imageUrl) {
        // Ensure the canvas object is initialized
        if (!canvas || !imageUrl) {
            console.error("Canvas or Image URL is missing.");
            return;
        }

        // Add the image to the canvas

        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.crossOrigin = "anonymous";

        imageElement.onload = () => {
            const imgW = imageElement.width;
            const imgH = imageElement.height;
            const canvasW = canvas.getWidth();
            const canvasH = canvas.getHeight();
            const scale = Math.min(canvasW / imgW, canvasH / imgH);
            canvas.renderAll();
            const fabricImage = new FabricImage(imageElement, {
                left: canvas.width / 2 - imgW / 2, // Center horizontally
                top: canvas.height / 2 - imgH / 2, // Center vertically
                scaleX: scale,
                scaleY: scale,
            });
            canvas.add(fabricImage);
            canvas.renderAll();
        };
    }
    const handleSideBarClick = (id = 'none') => {
        if (id === 'elements') {
            setShowElementOptions(!showElementOptions);
            setShowImageOptions(false)
        } else {
            setShowImageOptions(!showImageOptions)
            setShowElementOptions(false);
        }
    }
    return (
        <div className="elements-wrapper">
            <div className="elements">
                <button
                    id={'elements'}
                    onClick={() => handleSideBarClick('elements')}
                    className={`elementBtn`}
                ><LuShapes />
                </button>

                <button
                    id={"IMAGE"}
                    onClick={handleSideBarClick}
                    className={`elementBtn`}
                >
                    <TbPhotoPlus />
                </button>
            </div>
            {showElementOptions && <div className="card imageOptionsCard bg-dark">
                <div className="shape-elements">
                    <div className="shape-headings">
                        <p className="text-bg-dark pb-0">Elements</p>

                    </div>
                    <div className="d-flex flex-row flex-wrap">
                        <button
                            id={ACTIONS.RECTANGLE}
                            onClick={() => handleElementBtnClick(ACTIONS.RECTANGLE)}
                            className={'shape-element-btn'}
                        >
                            <TbSquare />
                        </button>
                        <button
                            id={ACTIONS.CIRCLE}
                            onClick={() => handleElementBtnClick(ACTIONS.CIRCLE)}
                            className={'shape-element-btn'}
                        >
                            <TbCircle />
                        </button>
                        <button
                            id={ACTIONS.CIRCLE}
                            onClick={() => handleElementBtnClick(ACTIONS.TRIANGLE)}
                            className={'shape-element-btn'}
                        >
                            <TbTriangle />
                        </button>


                        <button
                            id={ACTIONS.CIRCLE}
                            onClick={() => handleElementBtnClick(ACTIONS.LINE)}
                            className={'shape-element-btn'}
                        >
                            <TbLine />
                        </button>

                    </div>
                </div>
            </div>}
            {showImageOptions && (
                <div className="card imageOptionsCard ">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={imageOptionsTabKey}
                        onSelect={(k) => setImageOptionsTabKey(k)}
                        className="px-3 imageOptionsTabs"
                    >
                        <Tab eventKey="local" title="Local">
                            <div className="local-uploads d-flex flex-column ">
                                <Form.Group controlId="formFileSm" className="p-3 ">
                                    <Form.Control
                                        onChange={handleChangeInput}
                                        type="file"
                                        accept=".png,.jpg, .jpeg, .webp, .svg"
                                        size="sm"
                                    />
                                </Form.Group>
                                <div className="localUploads px-3 d-flex flex-column">
                                    <p className="text-left"> My Uploads</p>
                                    <div className="d-flex flex-row flex-wrap justify-content-start gap-1">
                                        {localAssets.map((image) => (
                                            <button
                                                onClick={() => handleImageToCanvas(image.src)}
                                                className="btn p-0"
                                            >
                                                <img
                                                    src={image.src}
                                                    className="rounded thumbnail"
                                                    alt=""
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="online" title="Online">
                            Tab content for Profile
                        </Tab>
                    </Tabs>
                </div>
            )}
        </div>
    )
}

export default Elements