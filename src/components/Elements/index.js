import * as fabric from 'fabric';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { LuShapes } from 'react-icons/lu';
import * as Tb from 'react-icons/tb';
import * as Icons from '../../Assets/Icons';
import { createStar, generatePolygonPoints } from '../../helpers/canvasHelpers';
import { generateRandomHex } from '../../Utils/common';
import { elementShapes } from '../../Utils/Constants';
import './styles.css';
const Elements = ({ canvas }) => {
    const [imageOptionsTabKey, setImageOptionsTabKey] = useState("local");
    const [defaultShapeFill] = useState(generateRandomHex())
    const [localAssets, setLocalAssets] = useState([]);
    const [sidebarOptions, setSideBarOptions] = useState({
        elements: false,
        image: false,
        text: false,
    })

    const handleElementBtnClick = (shape) => {

        if (canvas) {
            const size = (canvas.getWidth() + canvas.getHeight() / 2) * 0.3; // Default size for shapes
            let x = (canvas.getWidth() - size) / 2; // Starting X coordinate
            let y = (canvas.getHeight() - size) / 2;; // Starting Y coordinate
            let fabricShape;
            switch (shape) {
                case "Circle":
                    fabricShape = new fabric.Circle({
                        left: x,
                        top: y,
                        radius: size / 2,
                        fill: defaultShapeFill,
                    });
                    break;
                case "Square":
                    fabricShape = new fabric.Rect({

                        left: x,
                        top: y,
                        width: size,
                        height: size,
                        fill: defaultShapeFill,
                    });
                    break;

                case "Rectangle":
                    fabricShape = new fabric.Rect({

                        left: x,
                        top: y,
                        width: size * 1.2,
                        height: size,
                        fill: defaultShapeFill,
                    });
                    break;

                case "Triangle":
                    fabricShape = new fabric.Triangle({

                        left: x,
                        top: y,
                        width: size,
                        height: size,
                        fill: defaultShapeFill,
                    });
                    break;

                case "Rhombus":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size / 2, y: 0 },
                            { x: size, y: size / 2 },
                            { x: size / 2, y: size },
                            { x: 0, y: size / 2 },
                        ],
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Trapezoid":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size * 0.2, y: 0 },
                            { x: size * 0.8, y: 0 },
                            { x: size, y: size },
                            { x: 0, y: size },
                        ],
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Pentagon":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size / 2, y: 0 },
                            { x: size, y: size * 0.38 },
                            { x: size * 0.81, y: size },
                            { x: size * 0.19, y: size },
                            { x: 0, y: size * 0.38 },
                        ],
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Hexagon":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size * 0.5, y: 0 },
                            { x: size, y: size * 0.25 },
                            { x: size, y: size * 0.75 },
                            { x: size * 0.5, y: size },
                            { x: 0, y: size * 0.75 },
                            { x: 0, y: size * 0.25 },
                        ],
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Heptagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(7, size / 2), {

                        left: x,
                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;

                case "Octagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(8, size / 2), {

                        left: x,
                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;

                case "Nonagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(9, size / 2), {

                        left: x,
                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;

                case "Decagon":
                    fabricShape = new fabric.Polygon(
                        generatePolygonPoints(10, size / 2),
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Parallelogram":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size * 0.2, y: 0 },
                            { x: size, y: 0 },
                            { x: size * 0.8, y: size },
                            { x: 0, y: size },
                        ],
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Kite":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size / 2, y: 0 },
                            { x: size, y: size / 2 },
                            { x: size / 2, y: size },
                            { x: 0, y: size / 2 },
                        ],
                        {

                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "IsoscelesTrapezoid":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 10, y: 0 },
                            { x: 40, y: 0 },
                            { x: 50, y: 30 },
                            { x: 0, y: 30 },
                        ],
                        {
                            d: shape,
                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "ScaleneTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 50, y: 0 },
                            { x: 30, y: 40 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "IsoscelesTriangle":
                    fabricShape = new fabric.Triangle({
                        width: 50,
                        height: 50,
                        left: x,

                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;
                case "EquilateralTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 25, y: 0 },
                            { x: 50, y: 43 },
                            { x: 0, y: 43 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "RightTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 50, y: 0 },
                            { x: 0, y: 50 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "ObtuseTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 70, y: 0 },
                            { x: 20, y: 50 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "AcuteTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 10, y: 0 },
                            { x: 50, y: 0 },
                            { x: 30, y: 40 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "Pentagram":
                    const pentVertices = createStar(5, size);
                    fabricShape = new fabric.Polygon(pentVertices, {
                        left: x,

                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;
                case "Hexagram":
                    // Comment: Hexagram is a six-pointed star and can be created by combining two triangles.
                    const vertices = createStar(6, size);
                    fabricShape = new fabric.Polygon(vertices, {
                        left: x,

                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;
                case "Octagram":
                    // Comment: Octagram is an eight-pointed star and can be created with overlapping squares.
                    const eightVertices = createStar(8, size);
                    fabricShape = new fabric.Polygon(eightVertices, {
                        left: x,

                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;
                case "Ellipse":
                    fabricShape = new fabric.Ellipse({
                        rx: 25,
                        ry: 15,
                        left: x,

                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;
                case "Parabola":
                    // Comment: Parabola is not natively supported in Fabric.js and requires a custom path.
                    fabricShape = new fabric.Path("M 0 50 Q 25 0 50 50", {
                        left: x,

                        top: y,
                        fill: "",
                        stroke: defaultShapeFill,
                        strokeWidth: 2,
                    });
                    break;
                case "Hyperbola":
                    // Comment: Hyperbola is not natively supported in Fabric.js and requires a custom path.
                    fabricShape = new fabric.Path("M 0 25 Q 25 50 50 25", {
                        left: x,

                        top: y,
                        fill: "",
                        stroke: defaultShapeFill,
                        strokeWidth: 2,
                    });
                    break;
                case "Arrow":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 10 },
                            { x: 40, y: 10 },
                            { x: 40, y: 0 },
                            { x: 60, y: 20 },
                            { x: 40, y: 40 },
                            { x: 40, y: 30 },
                            { x: 0, y: 30 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "Crescent":
                    // Comment: Crescent requires two overlapping circles with different radii.
                    fabricShape = new fabric.Group(
                        [
                            new fabric.Circle({
                                radius: 20,
                                left: 10,
                                top: 10,
                                fill: defaultShapeFill,
                            }),
                            new fabric.Circle({
                                radius: 15,
                                left: 15,
                                top: 15,
                                fill: 'transparent',
                            }),
                        ],
                        { left: x, top: y }
                    );
                    break;
                case "Cross":
                    fabricShape = new fabric.Group(
                        [
                            new fabric.Rect({
                                width: 10,
                                height: 40,
                                left: 15,
                                top: 0,
                                fill: defaultShapeFill,
                            }),
                            new fabric.Rect({
                                width: 40,
                                height: 10,
                                left: 0,
                                top: 15,
                                fill: defaultShapeFill,
                            }),
                        ],
                        { left: x, top: y }
                    );
                    break;
                case "Heart":
                    fabricShape = new fabric.Path("M 0 30 Q 25 0 50 30 T 0 30 Z", {
                        left: x,

                        top: y,
                        fill: defaultShapeFill,
                    });
                    break;
                case "Quadrilateral":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 50, y: 10 },
                            { x: 40, y: 50 },
                            { x: 10, y: 40 },
                        ],
                        {
                            left: x,

                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;
                case "StraightArrow":
                    // A simple straight arrow using Polyline
                    fabricShape = new fabric.Polyline(
                        [
                            { x: 0, y: 0 },
                            { x: size, y: 0 },
                            { x: size - 10, y: -10 },
                            { x: size, y: 0 },
                            { x: size - 10, y: 10 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: "transparent",
                            stroke: "black",
                            strokeWidth: 2,
                        }
                    );
                    break;

                case "CurvedArrow":
                    // A curved arrow using Polyline
                    fabricShape = new fabric.Polyline(
                        [
                            { x: 0, y: 0 },
                            { x: size / 2, y: -size / 3 },
                            { x: size, y: 0 },
                            { x: size - 10, y: -10 },
                            { x: size, y: 0 },
                            { x: size - 10, y: 10 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: "transparent",
                            stroke: "black",
                            strokeWidth: 2,
                        }
                    );
                    break;

                case "DoubleArrow":
                    // Double-ended arrow using Polygon
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 10, y: -10 },
                            { x: 10, y: -5 },
                            { x: size - 10, y: -5 },
                            { x: size - 10, y: -10 },
                            { x: size, y: 0 },
                            { x: size - 10, y: 10 },
                            { x: size - 10, y: 5 },
                            { x: 10, y: 5 },
                            { x: 10, y: 10 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: defaultShapeFill,
                        }
                    );
                    break;

                case "BlockArrow":
                    // A block arrow using Polygon
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: size - 20, y: 0 },
                            { x: size - 20, y: -10 },
                            { x: size, y: 10 },
                            { x: size - 20, y: 30 },
                            { x: size - 20, y: 20 },
                            { x: 0, y: 20 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: defaultShapeFill,

                        }
                    );
                    break;

                default:
                    console.warn(`Shape not implemented: ${shape}`);
                    break;
            }
            if (fabricShape) {
                canvas.add(fabricShape);
                canvas.renderAll();
                canvas.setActiveObject(fabricShape);
            }
        }
    };
    const handleChangeInputBtnClick = (e) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.png, .jpeg, .jpg, .png, .svg, .webp';
        input.onchange = (event) => {
            if (input.files.length > 0) {
                const fileUrls = Array.from(input.files, (file) => {
                    const url = URL.createObjectURL(file);
                    return { src: url, name: file.name }
                });
                setLocalAssets([...localAssets, ...fileUrls])
            }
        }
        input.click()
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
            console.log("ImageOptions", {
                left: Math.abs((canvasW - (imgW * scale)) / 2), // Center horizontally
                top: Math.abs((canvasW - (imgH * scale)) / 2),
                width: (imgW * scale),// Center vertically
                height: (imgH * scale)
            });

            const fabricImage = new fabric.FabricImage(imageElement, {
                left: Math.abs((canvasW - (imgW * scale)) / 2), // Center horizontally
                top: Math.abs((canvasW - (imgH * scale)) / 2),
                scaleX: (scale),// Center vertically
                scaleY: (scale)

            });
            canvas.add(fabricImage);
            canvas.renderAll();
        };
    }
    const handleSideBarClick = (id = 'none') => {
        setSideBarOptions({
            elements: id === "elements" ? !sidebarOptions[id] : false,
            image: id === "image" ? !sidebarOptions[id] : false,
            text: id === "text" ? !sidebarOptions[id] : false,
        });

    }
    useEffect(() => {
        console.log("localAssets", localAssets);
    }, [localAssets])

    return (
        <div className="elements-wrapper">
            <div className="elements">
                <button
                    id={'elements'}
                    // onMouseOver={() => handleSideBarClick('elements')}
                    onClick={() => handleSideBarClick('elements')}
                    className={`elementBtn`}
                ><LuShapes />
                </button>

                <button
                    id={"IMAGE"}
                    // onMouseOver={() => handleSideBarClick('image')}
                    onClick={() => handleSideBarClick('image')}
                    className={`elementBtn`}
                >
                    <Tb.TbPhotoPlus />
                </button>
                <button
                    id={"TEXT"}
                    onMouseOver={() => handleSideBarClick('text')}
                    onClick={() => handleSideBarClick('text')}
                    className={`elementBtn`}
                >
                    <Tb.TbLetterT />
                </button>
                <button
                    id={"TEXT"}
                    onMouseOver={() => handleSideBarClick('text')}
                    onClick={() => handleSideBarClick('text')}
                    className={`elementBtn`}
                >
                    <Tb.TbPencilBolt />
                </button>
            </div>
            {sidebarOptions.elements && <div className="card imageOptionsCard bg-dark">
                <div className="shape-elements">
                    <div className="shape-headings">
                        <p className="text-bg-dark pb-0">Elements</p>

                    </div>
                    <div className="d-flex flex-row flex-wrap pb-3 shapes-wrapper-body">
                        {elementShapes.map(element => {
                            const IconComp = Icons[element]
                            return <button
                                id={element.toString()}
                                onClick={() => handleElementBtnClick(element.toString())}
                                className={'shape-element-btn'}
                            >
                                <IconComp />
                            </button>
                        })}
                    </div>
                </div>
            </div>}
            {sidebarOptions.image && (
                <div className="card imageOptionsCard ">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={imageOptionsTabKey}
                        onSelect={(k) => setImageOptionsTabKey(k)}
                        className="px-3 imageOptionsTabs"
                    >
                        <Tab eventKey="local" title="Local">
                            <div className="local-uploads d-flex flex-column ">

                                <div className="py-2 px-3 d-flex justify-content-center align-items-center">
                                    <button onClick={handleChangeInputBtnClick} className="btn w-100 btn-warning btn-sm">
                                        <Tb.TbFileUpload /> Upload files
                                    </button></div>

                                <div className="localUploads d-flex flex-column">
                                    <p className="text-left px-2"> My Uploads</p>
                                    <div className="localUploads-list d-flex flex-row flex-wrap justify-content-around gap-1">
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