import * as fabric from 'fabric';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { LuShapes } from 'react-icons/lu';
import * as Tb from 'react-icons/tb';
import * as Icons from '../../Assets/Icons';
import { bringObjToCenter, createBlobWithImage, createStar, generatePolygonPoints } from '../../helpers/canvasHelpers';
import { generateRandomHex } from '../../Utils/common';
import { elementShapes } from '../../Utils/Constants';
import './styles.css';
import { CiText } from 'react-icons/ci';
import { handleObjectMoving } from '../../helpers/snappingHelper';
const Elements = ({ canvas }) => {
    const [imageOptionsTabKey, setImageOptionsTabKey] = useState("local");
    const [defaultFill] = useState(generateRandomHex())
    const [localAssets, setLocalAssets] = useState([]);
    const [guideLines, setGuideLines] = useState([]);
    const [sidebarOptions, setSideBarOptions] = useState({
        elements: false,
        image: false,
        text: false,
    })

    const handleElementBtnClick = (shape) => {

        if (canvas) {
            // const size = Math.round((canvas.getWidth() + canvas.getHeight() / 2) * 0.25); // Default size for shapes
            const size = 100;
            let x = (canvas.getWidth() - size) / 2; // Starting X coordinate
            let y = (canvas.getHeight() - size) / 2;; // Starting Y coordinate
            let fabricShape;
            switch (shape) {
                case "Circle":
                    fabricShape = new fabric.Circle({
                        radius: size / 2,
                        fill: defaultFill,
                    });
                    break;
                case "Square":
                    fabricShape = new fabric.Rect({
                        width: size,
                        height: size,
                        fill: defaultFill,
                    });
                    break;

                case "Rectangle":
                    fabricShape = new fabric.Rect({

                        width: size * 1.2,
                        height: size,
                        fill: defaultFill,
                    });
                    break;

                case "Triangle":
                    fabricShape = new fabric.Triangle({

                        width: size,
                        height: size,
                        fill: defaultFill,
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
                            fill: defaultFill,
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


                            fill: defaultFill,
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


                            fill: defaultFill,
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


                            fill: defaultFill,
                        }
                    );
                    break;

                case "Heptagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(7, size / 2), {

                        fill: defaultFill,
                    });
                    break;

                case "Octagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(8, size / 2), {

                        fill: defaultFill,
                    });
                    break;

                case "Nonagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(9, size / 2), {

                        fill: defaultFill,
                    });
                    break;

                case "Decagon":
                    fabricShape = new fabric.Polygon(
                        generatePolygonPoints(10, size / 2),
                        {


                            fill: defaultFill,
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


                            fill: defaultFill,
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


                            fill: defaultFill,
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

                            fill: defaultFill,
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
                            fill: defaultFill,
                        }
                    );
                    break;
                case "IsoscelesTriangle":
                    fabricShape = new fabric.Triangle({
                        width: 50,
                        height: 50,
                        fill: defaultFill,
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
                            fill: defaultFill,
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
                            fill: defaultFill,
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
                            fill: defaultFill,
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
                            fill: defaultFill,
                        }
                    );
                    break;

                case "Pentagram":
                    const pentVertices = createStar(5, size);
                    fabricShape = new fabric.Polygon(pentVertices, {
                        fill: defaultFill,
                    });
                    break;
                case "Hexagram":
                    // Comment: Hexagram is a six-pointed star and can be created by combining two triangles.
                    const vertices = createStar(6, size);
                    fabricShape = new fabric.Polygon(vertices, {
                        fill: defaultFill,
                    });
                    break;
                case "Octagram":
                    // Comment: Octagram is an eight-pointed star and can be created with overlapping squares.
                    const eightVertices = createStar(8, size);
                    fabricShape = new fabric.Polygon(eightVertices, {
                        fill: defaultFill,
                    });
                    break;
                case "Ellipse":
                    fabricShape = new fabric.Ellipse({
                        rx: 25,
                        ry: 15,
                        fill: defaultFill,
                    });
                    break;
                case "Parabola":
                    // Comment: Parabola is not natively supported in Fabric.js and requires a custom path.
                    fabricShape = new fabric.Path("M 0 50 Q 25 0 50 50", {
                        fill: "",
                        stroke: defaultFill,
                        strokeWidth: 2,
                    });
                    break;
                case "Hyperbola":
                    // Comment: Hyperbola is not natively supported in Fabric.js and requires a custom path.
                    fabricShape = new fabric.Path("M 0 25 Q 25 50 50 25", {
                        fill: "",
                        stroke: defaultFill,
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
                            fill: defaultFill,
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
                                fill: defaultFill,
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
                                fill: defaultFill,
                            }),
                            new fabric.Rect({
                                width: 40,
                                height: 10,
                                left: 0,
                                top: 15,
                                fill: defaultFill,
                            }),
                        ],
                        { left: x, top: y }
                    );
                    break;
                case "Heart":
                    fabricShape = new fabric.Path("M 0 30 Q 25 0 50 30 T 0 30 Z", {
                        fill: defaultFill,
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
                            fill: defaultFill,
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

                            fill: defaultFill,
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

                            fill: defaultFill,

                        }
                    );
                    break;

                default:
                    console.warn(`Shape not implemented: ${shape}`);
                    break;
            }
            if (fabricShape) {
                bringObjToCenter(canvas, fabricShape);
                canvas.setActiveObject(fabricShape);
                handleObjectMoving(canvas, fabricShape, guideLines, setGuideLines);
            }
        }
        handleSideBarClick("elements")
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
            // console.log("ImageOptions", {
            //     left: Math.abs((canvasW - (imgW * scale)) / 2), // Center horizontally
            //     top: Math.abs((canvasW - (imgH * scale)) / 2),
            //     width: (imgW * scale),// Center vertically
            //     height: (imgH * scale)
            // });

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
    // useEffect(() => {
    //     console.log("localAssets", localAssets);
    // }, [localAssets])
    const handleClickOnAddTextBox = (id = 'normal') => {
        if (canvas) {
            let fabricText = {}
            switch (id) {
                case 'normal':
                    fabricText = new fabric.IText('Add your Text here', {
                        fontSize: 16,
                        fill: '#000000', fontWeight: 'normal', fontFamily: "Roboto"
                    })

                    break;
                case 'heading':
                    fabricText = new fabric.IText('Heading Text', {
                        fontSize: 40,
                        fill: '#000000',
                        fontWeight: 'bold', fontFamily: "Roboto"
                    })

                    break;
                case 'subHeading':
                    fabricText = new fabric.IText('Sub Heading Text', {
                        fontSize: 28,
                        fill: '#000000',
                        fontWeight: 'bold', fontFamily: "Roboto"
                    })

                    break;
                case 'paragraph':
                    fabricText = new fabric.Textbox('Add your Paragraph Here', {
                        width: 250,
                        fontSize: 16,
                        fill: '#000000',
                        fontWeight: 'bold', fontFamily: "Roboto"
                    })

                    break;
                default:
                    break;
            }
            bringObjToCenter(canvas, fabricText);
            canvas.renderAll()
            canvas.setActiveObject(fabricText)
        }
    }
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
                    id={"TEXT"}
                    // onMouseOver={() => handleSideBarClick('text')}
                    onClick={() => handleSideBarClick('text')}
                    className={`elementBtn`}
                >
                    <Tb.TbTypography />
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
                    // onMouseOver={() => handleSideBarClick('text')}
                    onClick={() => handleSideBarClick('text')}
                    className={`elementBtn`}
                >
                    <Tb.TbPencilBolt />
                </button>
                <button
                    onClick={() => createBlobWithImage(canvas, "https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844226_960_720.png")}
                    className={`elementBtn`}
                >
                    <Tb.TbBackground />
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
            {sidebarOptions.text && <>
                <div className="card imageOptionsCard bg-dark">
                    <div className="shape-elements ">
                        <div className="px-2">
                            <button onClick={() => handleClickOnAddTextBox('normal')} className="btn mt-2 w-100 btn-warning ">
                                <CiText /> Add Text box
                            </button>
                        </div>

                        <hr className='text-light' />
                        <div className=" px-2 d-flex flex-column">
                            <button onClick={() => handleClickOnAddTextBox("heading")} className="btn  rounded btn-outline border-dark-bg font-dark-bg my-1 fs-1 fw-bold text-capitalize">Heading</button>
                            <button onClick={() => handleClickOnAddTextBox("subHeading")} className="btn  rounded btn-outline border-dark-bg font-dark-bg my-1 fs-3 fw-bold  text-capitalize">Sub Heading</button>
                            <button onClick={() => handleClickOnAddTextBox("paragraph")} className="btn  rounded btn-outline border-dark-bg font-dark-bg my-1 fs-6 text-capitalize">Paragraph</button>
                        </div>

                    </div>
                </div>
            </>}
        </div>
    )
}

export default Elements