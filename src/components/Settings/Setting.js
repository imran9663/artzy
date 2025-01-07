import { Gradient } from "fabric";
import React, { useEffect, useState } from "react";
import { Accordion, Dropdown } from "react-bootstrap";
import { BiChevronDown, BiSolidCircle, BiSolidRectangle, BiSolidSquare } from "react-icons/bi";
import { MdBlurOn } from "react-icons/md";
import { PiAngle } from "react-icons/pi";
import { RxBorderWidth } from "react-icons/rx";
import { TbFlipHorizontal, TbFlipVertical, TbJoinBevel, TbJoinRound, TbJoinStraight, TbPaletteFilled, TbRadiusTopLeft, TbSkewX, TbSkewY } from "react-icons/tb";
import { convertPaletteToFabricGradientV2 } from "../../Utils/common";
import { COLOR_TYPE, SHAPES } from "../../Utils/Constants";
import ColorCodeInput from "../UtilComponnents/ColorCodeInput/Index";
import NewInputField from "../UtilComponnents/NewInputField/Index";
import RangeSlider from "../UtilComponnents/RangeSlider/Index";
import "./styles.css";

const Setting = ({ canvas }) => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [shapeObject, setShapeObject] = useState(null);

    useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });
            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });
            canvas.on("selection:cleared", () => {
                setSelectedObject(null);
                clearSettings();
            });
            canvas.on("object:modified", (event) => {
                handleObjectSelection(event.target);
            });
            canvas.on("object:scaling", (event) => {
                handleObjectSelection(event.target);
            });
        }
    }, [canvas]);


    const [shadowObj, setShadowObj] = useState({
        x: 0,
        y: 0,
        blur: 0,
        color: "#FFFFFF00"
    })

    useEffect(() => {
        if (selectedObject) {
            const shadow = `${shadowObj.x} ${shadowObj.y} ${shadowObj.blur} ${shadowObj.color}`
            selectedObject.set({ shadow: shadow });
            setShapeObject({ ...shapeObject, shadow: shadow })
            canvas.renderAll();
        }

    }, [shadowObj])

    const handleObjectSelection = (object) => {
        if (!object) return;
        setSelectedObject(object);
        setShapeObject({ ...object, ...shadowObj });
        // setOpacity(object.opacity);
        ;


    };
    const clearSettings = () => {
        // setOpacity("");
    };


    const handleColorChange = (id, type, value) => {
        if (type === COLOR_TYPE.solid) {


            if (selectedObject) {
                if (id === "shadowColor") {
                    setShadowObj({ ...shadowObj, color: value })
                } else {
                    selectedObject.set({ [id]: value });
                    setShapeObject({ ...shapeObject, [id]: value })
                    canvas.renderAll();
                }

            }
        }
        if (type === COLOR_TYPE.gradient && id === 'fill') {
            if (selectedObject) {
                const gradient_fill = new Gradient(convertPaletteToFabricGradientV2(selectedObject, value));
                selectedObject.set({ fill: gradient_fill });
                setShapeObject({ ...shapeObject, fill: gradient_fill })
                canvas.renderAll();
            }
        }

    };
    const handleOpacityChange = (e) => {
        const { value } = e.target;
        // setOpacity(value);
        if (selectedObject) {
            selectedObject.set({ opacity: value });
            setShapeObject({ ...shapeObject, opacity: value })
            canvas.renderAll();
        }
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const parsedValue = value.replace(/,/g, "");
        const initValue = parseInt(parsedValue, 10) || 0;
        switch (id) {
            case 'top':
                if (selectedObject && initValue >= 0) {
                    selectedObject.set({ top: initValue });
                    setShapeObject({ ...shapeObject, top: Math.round(initValue) })
                    canvas.renderAll();
                }
                break;
            case 'left':
                if (selectedObject && initValue >= 0) {
                    selectedObject.set({ left: initValue });
                    setShapeObject({ ...shapeObject, left: Math.round(initValue) })
                    canvas.renderAll();
                }
                break;
            case 'width':
                if (
                    selectedObject &&
                    selectedObject.type === SHAPES.rect &&
                    initValue >= 0
                ) {
                    selectedObject.set({ width: initValue / selectedObject.scaleX });
                    setShapeObject({ ...shapeObject, width: initValue })
                    canvas.renderAll();
                }
                break;
            case 'height':
                if (
                    selectedObject &&
                    selectedObject.type === SHAPES.rect &&
                    initValue >= 0
                ) {
                    selectedObject.set({ height: initValue / selectedObject.scaleY });
                    setShapeObject({ ...shapeObject, height: initValue })
                    canvas.renderAll();
                }
                break;
            case 'radius':
                if (
                    selectedObject &&
                    selectedObject.type === SHAPES.circle &&
                    initValue >= 0
                ) {
                    selectedObject.set({ radius: initValue / 1 / selectedObject.scaleX });
                    setShapeObject({ ...shapeObject, radius: initValue / 1 / selectedObject.scaleX })
                    canvas.renderAll();
                }
                break;
            case "cornerRadius":
                if (
                    selectedObject &&
                    selectedObject.type === SHAPES.rect &&
                    initValue >= 0
                ) {
                    selectedObject.set({ rx: initValue, ry: initValue });
                    setShapeObject({ ...shapeObject, rx: initValue, ry: initValue })
                    canvas.renderAll();
                }
                break;
            case 'strokeWidth':
                if (selectedObject && value >= 0) {
                    selectedObject.set({ strokeWidth: Number(value) || 0 });
                    setShapeObject({ ...shapeObject, strokeWidth: Number(value) || 0 })
                    canvas.renderAll();
                }
                break;
            default:
                if (
                    selectedObject &&
                    initValue >= 0
                ) {
                    selectedObject.set({ [id]: initValue });
                    setShapeObject({ ...shapeObject, [id]: initValue })
                    canvas.renderAll();
                }
                break;
        }

    }
    const handleValueInputChange = (id, value) => {
        console.log("id, value", id, value);

        if (selectedObject) {
            if (id === 'strokeDashArray' && value !== "") {
                const strokeDashArr = value !== 'none' ? value.split(',') : null;
                selectedObject.set({ strokeDashArray: strokeDashArr });
                setShapeObject({ ...shapeObject, strokeDashArray: strokeDashArr })
                canvas.renderAll();
            }
            else {
                selectedObject.set({ [id]: value });
                setShapeObject({ ...shapeObject, [id]: value })
                canvas.renderAll();
            }
        }



    }
    const handleShadowChange = (e) => {
        const { id, value } = e.target
        setShadowObj({ ...shadowObj, [id]: value })
    }
    return (
        <>
            {selectedObject && (
                <div className="optionsWrapper">
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Position</Accordion.Header>
                            <Accordion.Body>
                                <div className="pt-1">
                                    <div className="options-row py-1">
                                        <NewInputField
                                            handleChange={handleInputChange}
                                            type={"text"}
                                            label={"T"}
                                            className="form-control  input"
                                            value={shapeObject.top}
                                            name={"top"}
                                            id={"top"}
                                        />
                                        <NewInputField
                                            value={selectedObject.left}
                                            name={"left"}
                                            id={"left"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={"L"}
                                        />

                                    </div>

                                    <div className="options-row">
                                        {selectedObject.type === SHAPES.rect && <NewInputField
                                            handleChange={handleInputChange}
                                            type={"text"}
                                            label={"W"}
                                            className="form-control  input"
                                            value={shapeObject.width}
                                            name={"width"}
                                            id={"width"}
                                            toolTip
                                            Title={'Width'}
                                        />}

                                        {selectedObject.type === SHAPES.rect &&
                                            <NewInputField
                                            value={shapeObject.height}
                                            name={"height"}
                                            id={"height"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={"H"}
                                                toolTip
                                                Title={'Height'}
                                            />}


                                    </div>
                                    <div className="options-row">
                                        {selectedObject.type === SHAPES.rect &&
                                            <NewInputField
                                                handleChange={handleInputChange}
                                                type={"text"}
                                                label={<TbRadiusTopLeft />}
                                                className="form-control  input"
                                                value={shapeObject.rx}
                                                name={"cornerRadius"}
                                                id={"cornerRadius"}
                                                toolTip
                                                Title={'Corner Radius'}
                                            />}
                                        {selectedObject.type === SHAPES.circle && (
                                            <NewInputField
                                                value={shapeObject.radius}
                                                name={"radius"}
                                                id={"radius"}
                                                type={"text"}
                                                handleChange={handleInputChange}
                                                label={"R"}
                                            />
                                        )}

                                        <NewInputField
                                            handleChange={handleInputChange}
                                            type={"text"}
                                            label={<PiAngle />}
                                            className="form-control  input"
                                            value={shapeObject.angle}
                                            name={"angle"}
                                            id={"angle"}
                                            toolTip
                                            Title={'Rotation'}
                                        />


                                    </div>
                                    <div className="options-row">
                                        <ColorCodeInput label={<TbPaletteFilled />} id={'fill'} showGradientPanel={true} value={shapeObject.fill} handleChange={handleColorChange} />
                                    </div>
                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Border</Accordion.Header>
                            <Accordion.Body>
                                <div className="pt-1">
                                    <div className="options-row">
                                        <ColorCodeInput label={<TbPaletteFilled />}
                                            id={'stroke'} showGradientPanel={false}
                                            value={shapeObject.stroke}
                                            handleChange={handleColorChange} />

                                    </div>
                                    <div className="options-row">

                                        <NewInputField
                                            value={shapeObject.strokeWidth}
                                            name={"strokeWidth"}
                                            id={"strokeWidth"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={<RxBorderWidth />}
                                            toolTip
                                            Title={'Border thickness'}
                                        />

                                    </div>
                                    <div className="options-row my-2">
                                        <Dropdown className="input font-dark-bg w-100">
                                            <Dropdown.Toggle variant="dark" size="small" className="btn d-flex flex-row justify-content-between align-items-center w-100 font-dark-bg p-0 dd-toggle-btn" data-bs-theme="dark" id="dropdown-basic">
                                                <p className="input-label font-dark-bg mb-0">Dash Type</p>
                                                <BiChevronDown />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="bg-dark font-dark-bg w-100">
                                                <Dropdown.Item active id="strokeDashArray" onClick={() => handleValueInputChange("strokeDashArray", 'none')} name='none' defaultChecked className="bg-dark dd-item" >
                                                    —
                                                </Dropdown.Item>
                                                <Dropdown.Item id="strokeDashArray" onClick={() => handleValueInputChange("strokeDashArray", "2,2")} name="2,2" className="bg-dark dd-item" >
                                                    ···
                                                </Dropdown.Item>
                                                <Dropdown.Item id="strokeDashArray" onClick={() => handleValueInputChange("strokeDashArray", "5,5")} name="5,5" className="bg-dark dd-item" >
                                                    - -
                                                </Dropdown.Item>
                                                <Dropdown.Item id="strokeDashArray" onClick={() => handleValueInputChange("strokeDashArray", "5,2,2,2")} name="5,2,2,2" className="bg-dark dd-item" >
                                                    -·-
                                                </Dropdown.Item>
                                                <Dropdown.Item id="strokeDashArray" onClick={() => handleValueInputChange("strokeDashArray", "5,2,2,2,2,2")} name="5,2,2,2,2,2" className="bg-dark dd-item" >
                                                    -··-
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>


                                    </div>
                                    <div className="options-row mt-1">
                                        <p className="input-label text-bg-dark mb-2">Line Cap</p>
                                        <div className="d-flex fle-row">
                                            <button onClick={() => handleValueInputChange('strokeLineCap', 'butt')} id='strokeLineCap' name={'butt'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Butt Join"} className="btn  text-bg-dark">
                                                <BiSolidRectangle />
                                            </button>
                                            <button onClick={() => handleValueInputChange('strokeLineCap', 'square')} id='strokeLineCap' name={'square'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Square Join"} className="btn text-bg-dark">
                                                <BiSolidSquare />
                                            </button>
                                            <button onClick={() => handleValueInputChange('strokeLineCap', 'round')} id='strokeLineCap' name={'round'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Round Join"} className="btn text-bg-dark">
                                                <BiSolidCircle />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="options-row mt-1">
                                        <p className="input-label text-bg-dark mb-2">Line Join</p>
                                        <div className="d-flex fle-row">
                                            <button onClick={() => handleValueInputChange('strokeLineJoin', 'miter')} id='strokeLineJoin' name={'miter'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Miter Join"} className="btn  text-bg-dark">
                                                <TbJoinStraight />
                                            </button>
                                            <button onClick={() => handleValueInputChange('strokeLineJoin', 'round')} id='strokeLineJoin' name={'round'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Round Join"} className="btn text-bg-dark">
                                                <TbJoinRound />
                                            </button>
                                            <button onClick={() => handleValueInputChange('strokeLineJoin', 'bevel')} id='strokeLineJoin' name={'bevel'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Bevel Join"} className="btn text-bg-dark">
                                                <TbJoinBevel />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Shadow</Accordion.Header>
                            <Accordion.Body>
                                <div className="pt-1">

                                    <div className="options-row ">

                                        <NewInputField
                                            value={shadowObj?.x}
                                            name={"x"}
                                            id={"x"}
                                            type={"text"}
                                            handleChange={handleShadowChange}
                                            label={'X'}
                                            toolTip
                                            Title={'Shadow X Offset'}
                                        />


                                        <NewInputField
                                            value={shadowObj?.y}
                                            name={"y"}
                                            id={"y"}
                                            type={"text"}
                                            handleChange={handleShadowChange}
                                            label={'Y'}
                                            toolTip
                                            Title={'Shadow X Offset'}
                                        />


                                        <NewInputField
                                            value={shadowObj?.blur}
                                            name={"blur"}
                                            id={"blur"}
                                            type={"text"}
                                            handleChange={handleShadowChange}
                                            label={<MdBlurOn />}
                                            toolTip
                                            Title={'Shadow Blur Radius'}
                                        />

                                    </div>
                                    <div className="options-row">

                                        <ColorCodeInput label={<TbPaletteFilled />} id={'shadowColor'} showGradientPanel={false} value={shadowObj?.color} handleChange={handleColorChange} />

                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Transformations</Accordion.Header>
                            <Accordion.Body>
                                <div className="pt-1">

                                    <div className="options-row ">

                                        <NewInputField
                                            value={shapeObject.scaleX}
                                            name={"scaleX"}
                                            id={"scaleX"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={'Sc X'}
                                            toolTip
                                            Title={'Scale X - Horizontal scaling'}
                                        />


                                        <NewInputField
                                            value={shapeObject.scaleY}
                                            name={"scaleY"}
                                            id={"scaleY"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={'Sc Y'}
                                            toolTip
                                            Title={'Scale Y- Vertical scaling'}
                                        />


                                    </div>
                                    <div className="options-row ">

                                        <NewInputField
                                            value={shapeObject.skewX}
                                            name={"skewX"}
                                            id={"skewX"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={<TbSkewX />}
                                            toolTip
                                            Title={'Skew Horizontal'}
                                        />


                                        <NewInputField
                                            value={shapeObject.skewY}
                                            name={"skewY"}
                                            id={"skewY"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={<TbSkewY />}
                                            toolTip
                                            Title={'Skew Horizontal'}
                                        />


                                    </div>
                                    <div className="options-row mt-1">
                                        <p className="input-label text-bg-dark mb-2">Flip</p>
                                        <div className="d-flex fle-row gap-2">
                                            <button
                                                onClick={() => handleValueInputChange('flipX', !shapeObject.flipX)}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Flip Horizontal"}
                                                id="flipX"
                                                className={shapeObject.flipX ? "btn  bg-warning text-dark" : "btn  text-bg-dark"}>
                                                <TbFlipHorizontal />
                                            </button>
                                            <button
                                                onClick={() => handleValueInputChange('flipY', !shapeObject.flipY)}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Flip Vertical"}
                                                id="flipY"
                                                className={shapeObject.flipY ? "btn  bg-warning text-dark" : "btn  text-bg-dark"}>
                                                <TbFlipVertical />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <div className="options-row">
                        <RangeSlider
                            name={"opacity"}
                            id={"opacity"}
                            label={"opacity"}
                            min={0}
                            max={1}
                            steps={0.01}
                            value={shapeObject.opacity}
                            handleChange={handleOpacityChange}
                        />
                    </div>





                </div>
            )}
        </>
    );
};

export default Setting;
