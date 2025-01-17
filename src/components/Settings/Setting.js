import { Gradient } from "fabric";
import React, { useEffect, useState } from "react";
import { Accordion, Dropdown } from "react-bootstrap";
import { BiChevronDown, BiFontFamily, BiSolidCircle, BiSolidRectangle, BiSolidSquare } from "react-icons/bi";
import * as Md from "react-icons/md";
import { PiAngle } from "react-icons/pi";
import { RxBorderWidth } from "react-icons/rx";
import * as Tb from "react-icons/tb";
import { convertPaletteToFabricGradientV2 } from "../../Utils/common";
import { COLOR_TYPE, SHAPES } from "../../Utils/Constants";
import ColorCodeInput from "../UtilComponents/ColorCodeInput/Index";
import NewInputField from "../UtilComponents/NewInputField/Index";
import RangeSlider from "../UtilComponents/RangeSlider/Index";
import "./styles.css";
import CustomDropDown from "../UtilComponents/CustomDropDown";

const Setting = ({ canvas }) => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [shapeObject, setShapeObject] = useState(null);
    const [selectedFont, setSelectedFont] = useState("Roboto");
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
    const handleFontChange = (font) => {
        updateFont(font);
        setSelectedFont(() => font);
    };

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
    const handleSlideChange = (e) => {
        const { value, id } = e.target;
        if (selectedObject) {
            selectedObject.set({ [id]: value });
            setShapeObject({ ...shapeObject, [id]: value })
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
    const updateFont = async (font) => {
        try {
            await document.fonts.load(`16px ${font}`);
            if (selectedObject) {
                selectedObject.set({ "fontFamily": font });
                canvas.renderAll();
            }
        } catch (error) {
            console.log(`Failed to load  ${font}:`, error);
        }


    }
    const isTextType = (type) => {
        return type.includes(SHAPES.iText) || type.includes(SHAPES.textbox)
    }
    const handleChangeFontSize = (id) => {
        const currentFontSize = selectedObject.get('fontSize');

        switch (id) {
            case 'inc':
                if (
                    selectedObject
                ) {
                    selectedObject.set({ fontSize: currentFontSize + 1 });
                    setShapeObject({ ...shapeObject, fontSize: currentFontSize + 1 })
                    canvas.renderAll();
                }
                break;
            case 'dec':
                if (
                    selectedObject
                ) {
                    selectedObject.set({ fontSize: currentFontSize - 1 });
                    setShapeObject({ ...shapeObject, fontSize: currentFontSize - 1 })
                    canvas.renderAll();
                }
                break;
            default:
                break;
        }
    }
    const handleFontBtnClick = (id) => {
        if (selectedObject) {
            const getFontProp = selectedObject.get(id)
            switch (id) {
                case 'fontWeight':
                    if (getFontProp === 'normal') {
                        selectedObject.set({ [id]: 'bold' });
                        setShapeObject({ ...shapeObject, [id]: 'bold' })
                        canvas.renderAll();
                    } else {
                        selectedObject.set({ [id]: 'normal' });
                        setShapeObject({ ...shapeObject, [id]: 'normal' })
                        canvas.renderAll();
                    }
                    break;
                case 'fontStyle':
                    if (getFontProp === 'normal') {
                        selectedObject.set({ [id]: 'italic' });
                        setShapeObject({ ...shapeObject, [id]: 'italic' })
                        canvas.renderAll();
                    } else {
                        selectedObject.set({ [id]: 'normal' });
                        setShapeObject({ ...shapeObject, [id]: 'normal' })
                        canvas.renderAll();
                    }
                    break;
                case 'underline':
                    selectedObject.set({ [id]: !getFontProp });
                    setShapeObject({ ...shapeObject, [id]: !getFontProp })
                    canvas.renderAll();
                    break;
                case 'linethrough':
                    selectedObject.set({ [id]: !getFontProp });
                    setShapeObject({ ...shapeObject, [id]: !getFontProp })
                    canvas.renderAll();
                    break;
            }
        }

    }
    const handleAlignmentClick = (value) => {
        selectedObject.set({ textAlign: value });
        setShapeObject({ ...shapeObject, textAlign: value })
        canvas.renderAll();
    }
    const handleObjectAlignClick = (id, value) => {
        if (selectedObject) {
            const objWidth = selectedObject.width;
            const objHeight = selectedObject.height;
            const zoom = canvas.getZoom();

            const canvasWidth = canvas.getWidth() / zoom;
            const canvasHeight = canvas.getHeight() / zoom;

            const top = selectedObject.top;
            const left = selectedObject.left;
            const right = left + (selectedObject.width * selectedObject.scaleX);
            const bottom = top + (selectedObject.height * selectedObject.scaleY);

            const centerX = left + (selectedObject.width * selectedObject.scaleX) / 2;
            const centerY = top + (selectedObject.height * selectedObject.scaleY) / 2;
            if (id === 'originX' && value === 'left') {
                //horizontal left
                selectedObject.set({ left: 0 });
                setShapeObject({ ...shapeObject, left: 0 })
            }
            if (id === 'originX' && value === 'right') {
                //horizontal right
                selectedObject.set({ left: 0 });
                setShapeObject({ ...shapeObject, left: canvasWidth - objWidth })
            }

            canvas.renderAll();
        }
    }
    return (
        <>
            {selectedObject ? (
                <div className="optionsWrapper">
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="-1" >
                            <Accordion.Header>Alignment</Accordion.Header>
                            <Accordion.Body>

                                <div className="options-row py-1  d-flex gap-3">
                                    <div className="w-100 d-flex flex-row justify-content-between align-items-center py-2">
                                        <button onClick={() => handleObjectAlignClick('originX', 'left')} className={`btn btn-sm  ${shapeObject.originX === 'left' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg'}`}><Md.MdAlignHorizontalLeft /></button>
                                        <button onClick={() => handleObjectAlignClick('originX', 'center')} className={`btn btn-sm  ${shapeObject.originX === 'center' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg'}`}><Md.MdAlignHorizontalCenter /></button>
                                        <button onClick={() => handleObjectAlignClick('originX', 'right')} className={`btn btn-sm  ${shapeObject.originX === 'right' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg'}`}><Md.MdAlignHorizontalRight /></button>
                                    </div>

                                </div>
                                <div className="options-row py-1  d-flex gap-3">
                                    <div className="w-100 d-flex flex-row justify-content-between align-items-center py-2">
                                        <button onClick={() => handleObjectAlignClick('originY', 'top')} className={`btn btn-sm  ${shapeObject.originY === 'top' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg'}`}><Md.MdAlignVerticalTop /></button>
                                        <button onClick={() => handleObjectAlignClick('originY', 'center')} className={`btn btn-sm  ${shapeObject.originY === 'center' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg'}`}><Md.MdAlignVerticalCenter /></button>
                                        <button onClick={() => handleObjectAlignClick('originY', 'bottom')} className={`btn btn-sm  ${shapeObject.originY === 'bottom' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg'}`}><Md.MdAlignVerticalBottom /></button>
                                    </div>

                                </div>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="0">
                            <>
                                {isTextType(selectedObject.type) ?
                                    <Accordion.Header>Text Styles</Accordion.Header> : <Accordion.Header>Position</Accordion.Header>}
                            <Accordion.Body>
                                <div className="pt-1">
                                        {/* <div className="options-row py-1">
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

                                    </div> */}

                                    <div className="options-row">
                                            {!isTextType(selectedObject.type) && selectedObject.type !== SHAPES.circle && <NewInputField
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

                                            {!isTextType(selectedObject.type) && selectedObject.type !== SHAPES.circle &&
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
                                            {!isTextType(selectedObject.type) && selectedObject.type !== SHAPES.circle &&
                                            <NewInputField
                                                handleChange={handleInputChange}
                                                type={"text"}
                                            label={<Tb.TbRadiusTopLeft />}
                                                className="form-control  input"
                                                value={shapeObject.rx}
                                                name={"cornerRadius"}
                                                id={"cornerRadius"}
                                                toolTip
                                                Title={'Corner Radius'}
                                            />}
                                            {!isTextType(selectedObject.type) && selectedObject.type === SHAPES.circle && (
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
                                        {isTextType(selectedObject.type) && <div className="options-row py-1  d-flex gap-3">
                                            <div className="w-50">
                                                <CustomDropDown selectedFont={selectedFont} onSelect={handleFontChange} />
                                            </div>
                                            <div className="w-50 d-flex flex-row ">
                                                <button onClick={() => { handleChangeFontSize('dec') }} className="btn btn-sm font-dark-bg p-0 px-1 "><Tb.TbMinus /></button>
                                                <input type="number" value={shapeObject.fontSize} onChange={handleInputChange} className="input  input-number-type" name="" id="fontSize" />
                                                <button onClick={() => { handleChangeFontSize('inc') }} className="btn btn-sm font-dark-bg p-0 px-1 "><Tb.TbPlus /></button>
                                            </div>
                                        </div>
                                        }
                                        <div className="options-row">
                                            <ColorCodeInput label={isTextType(selectedObject.type) ? <Tb.TbTextColor /> : <Tb.TbPaletteFilled />} id={'fill'} showGradientPanel={true} value={shapeObject.fill} handleChange={handleColorChange} />
                                        </div>
                                        {isTextType(selectedObject.type) &&
                                            <>
                                                <div className="options-row py-1  d-flex gap-3">
                                                    <div className="w-100 d-flex flex-row justify-content-between align-items-center py-2">
                                                        <button onClick={() => handleFontBtnClick('fontWeight')} className={`btn btn-sm ${shapeObject.fontWeight === 'bold' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg '}`}><Tb.TbBold /></button>
                                                        <button onClick={() => handleFontBtnClick('fontStyle')} className={`btn btn-sm ${shapeObject.fontStyle === 'italic' ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg '}`}><Tb.TbItalic /></button>
                                                        <button onClick={() => handleFontBtnClick('underline')} className={`btn btn-sm ${shapeObject.underline ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg '}`}><Tb.TbUnderline /></button>
                                                        <button onClick={() => handleFontBtnClick('linethrough')} className={`btn btn-sm ${shapeObject.linethrough ? 'btn-warning text-dark' : 'btn-outline-warning font-dark-bg '}`}><Tb.TbStrikethrough /></button>
                                                    </div>
                                                </div>
                                                <div className="options-row">
                                                    <ColorCodeInput label={<Tb.TbSquareRoundedLetterA />} id={'textBackgroundColor'} showGradientPanel={false} value={shapeObject.textBackgroundColor} handleChange={handleColorChange} />
                                                </div>
                                            </>
                                        }

                                        {isTextType(selectedObject.type) &&
                                            <>
                                                <div className="options-row py-1  d-flex gap-3">

                                                <div className="w-100 d-flex flex-row justify-content-between align-items-center py-2">
                                                    <button onClick={() => handleAlignmentClick('left')} className="btn btn-sm font-dark-bg btn-outline-warning"><Tb.TbAlignLeft2 /></button>
                                                    <button onClick={() => handleAlignmentClick('center')} className="btn btn-sm font-dark-bg btn-outline-warning"><Tb.TbAlignCenter /></button>
                                                    <button onClick={() => handleAlignmentClick('right')} className="btn btn-sm font-dark-bg btn-outline-warning"><Tb.TbAlignRight2 /></button>
                                                    <button onClick={() => handleAlignmentClick('justify')} className="btn btn-sm font-dark-bg btn-outline-warning"><Tb.TbAlignJustified /></button>
                                                </div>

                                            </div>
                                            <div className="options-row">
                                                <RangeSlider
                                                    name={"Line height"}
                                                    id={"lineHeight"}
                                                    label={<Tb.TbLineHeight />}
                                                    min={0}
                                                    max={2.5}
                                                    steps={0.01}
                                                    value={shapeObject.lineHeight}
                                                    handleChange={handleSlideChange}
                                                />
                                            </div>
                                            <div className="options-row">
                                                <RangeSlider
                                                    name={'Character Spacing'}
                                                    id={"charSpacing"}
                                                    label={<Tb.TbLetterSpacing />}
                                                    min={1}
                                                    max={1000}
                                                    steps={10}
                                                    value={shapeObject.charSpacing}
                                                    handleChange={handleSlideChange}
                                                />
                                            </div>
                                            </>
                                        }
                                </div>
                                </Accordion.Body></>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Border</Accordion.Header>
                            <Accordion.Body>
                                <div className="pt-1">
                                    <div className="options-row">
                                        <ColorCodeInput label={<Tb.TbPaletteFilled />}
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
                                                <Tb.TbJoinStraight />
                                            </button>
                                            <button onClick={() => handleValueInputChange('strokeLineJoin', 'round')} id='strokeLineJoin' name={'round'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Round Join"} className="btn text-bg-dark">
                                                <Tb.TbJoinRound />
                                            </button>
                                            <button onClick={() => handleValueInputChange('strokeLineJoin', 'bevel')} id='strokeLineJoin' name={'bevel'}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Bevel Join"} className="btn text-bg-dark">
                                                <Tb.TbJoinBevel />
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
                                            label={<Md.MdBlurOn />}
                                            toolTip
                                            Title={'Shadow Blur Radius'}
                                        />

                                    </div>
                                    <div className="options-row">

                                        <ColorCodeInput label={<Tb.TbPaletteFilled />} id={'shadowColor'} showGradientPanel={false} value={shadowObj?.color} handleChange={handleColorChange} />

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
                                            label={<Tb.TbSkewX />}
                                            toolTip
                                            Title={'Skew Horizontal'}
                                        />


                                        <NewInputField
                                            value={shapeObject.skewY}
                                            name={"skewY"}
                                            id={"skewY"}
                                            type={"text"}
                                            handleChange={handleInputChange}
                                            label={<Tb.TbSkewY />}
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
                                                <Tb.TbFlipHorizontal />
                                            </button>
                                            <button
                                                onClick={() => handleValueInputChange('flipY', !shapeObject.flipY)}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title={"Flip Vertical"}
                                                id="flipY"
                                                className={shapeObject.flipY ? "btn  bg-warning text-dark" : "btn  text-bg-dark"}>
                                                <Tb.TbFlipVertical />
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
                            handleChange={handleSlideChange}
                        />
                    </div>
                </div>
            ) :
                <>
                    <div className="noShape-selected d-flex flex-column  justify-content-center align-items-center">
                        <div className="noShape-icon ">
                            <Tb.TbSquareOff />
                        </div>
                        <p className="noShape-selected-heading  text-center ">No Object Selected</p>
                        <p className="noShape-selected-helper text-center "> Select the object to view Styles</p>
                    </div>
                </>}
        </>
    );
};

export default Setting;
