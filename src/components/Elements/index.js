import * as fabric from 'fabric';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { LuShapes } from 'react-icons/lu';
import * as Tb from 'react-icons/tb';
import * as Icons from '../../Assets/Icons';
import { bringObjToCenter, createBlobWithImage, createStar, generatePolygonPoints, handleImageToCanvas } from '../../helpers/canvasHelpers';
import { generateRandomHex, rgbOrRgbaToHex } from '../../Utils/common';
import { elementShapes } from '../../Utils/Constants';
import './styles.css';
import { CiText } from 'react-icons/ci';
import { handleObjectMoving } from '../../helpers/snappingHelper';
import { getIconFromApi } from '../../apis';
import ColorCodeInput from '../UtilComponents/ColorCodeInput/Index';
import ColorPicker from 'react-best-gradient-color-picker';
const Elements = ({ canvas }) => {
    const initSideBarState = {
        elements: false,
        image: false,
        text: false,
        vector: false,
        background: false,
    }
    const [imageOptionsTabKey, setImageOptionsTabKey] = useState("local");
    const [iconSearch, setIconSearch] = useState('')
    const [iconsData, setIconsData] = useState([])
    const [defaultFill] = useState(generateRandomHex())
    const [localAssets, setLocalAssets] = useState([]);
    const [guideLines, setGuideLines] = useState([]);
    const [sidebarOptions, setSideBarOptions] = useState(initSideBarState)
    const [bgColor, setbgColor] = useState('#ffffff')
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

    const handleSideBarClick = (id = 'none') => {
        setSideBarOptions({
            elements: id === "elements" ? !sidebarOptions[id] : false,
            image: id === "image" ? !sidebarOptions[id] : false,
            text: id === "text" ? !sidebarOptions[id] : false,
            vector: id === "vector" ? !sidebarOptions[id] : false,
            background: id === "background" ? !sidebarOptions[id] : false,
        });

    }
    useEffect(() => {
        console.log("iconsData", iconsData);
    }, [iconsData])
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
        setSideBarOptions(initSideBarState)
    }

    const handleIconSearchInput = (e) => {
        const { value } = e.target;
        setIconSearch(value);
    }
    const handleSearchClick = async () => {
        const res = await getIconFromApi(iconSearch);
        if (res.status === 200) {
            console.log("data", res?.data?.hits);
            setIconsData(res?.data?.hits)
        }


    }
    const handleBgColorChange = (color) => {
        const hexColor = rgbOrRgbaToHex(color)
        setbgColor(hexColor);
        canvas.set({
            backgroundColor: hexColor
        })
        canvas.renderAll()
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
                    onClick={() => handleSideBarClick('vector')}
                    className={`elementBtn`}
                >
                    <Tb.TbVector />
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
                    onClick={() => handleSideBarClick('background')}

                    // onClick={() => createBlobWithImage(canvas, "https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844226_960_720.png")}
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
                                                onClick={() => handleImageToCanvas(canvas, image.src)}
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
            {sidebarOptions.vector && (
                <>
                    <div className="card imageOptionsCard bg-light">
                        <div style={{ overflowY: "scroll" }} className="shape-elements ">
                            <div className="px-2">
                                <div className="my-1 d-flex flex-row border  rounded">
                                    <input onChange={handleIconSearchInput} type="text" className="form-control border-outline-none bg-transparent" placeholder="search vectors" />
                                    <button disabled={iconSearch === ''} onClick={handleSearchClick} className="btn  border-outline-none border-start ">
                                        <Tb.TbSearch />
                                    </button>
                                </div>
                            </div>

                            <hr className='text-dark my-1 ' />
                            <div style={{ columnWidth: "100px" }} className="icons-display-wrapper ">
                                {iconsData.length > 0 && iconsData.map(icon => <button onClick={() => handleImageToCanvas(canvas, icon.largeImageURL)} className="btn p-0 m-0"> <img style={{ width: '100%' }} key={icon.id} src={icon.previewURL} className=" rounded m-1" alt={icon.user} /></button>
                                )}
                            </div>

                        </div>
                    </div>
                </>
            )}
            {sidebarOptions.background &&
                <>
                    <div className="card imageOptionsCard bg-light">
                        <div className="shape-elements ">



                            <div className="m-2">
                                <ColorPicker
                                    width={220}
                                    disableDarkMode
                                    value={bgColor}
                                    onChange={handleBgColorChange}
                                    hideColorTypeBtns={true}
                                />

                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Elements