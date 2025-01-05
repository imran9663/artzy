import React, { useEffect, useState } from 'react';
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker';
import { Tab, Tabs } from 'react-bootstrap';
import { BiX } from 'react-icons/bi';
import { hexToRgbaWithAlpha, isObjectEmpty, rgbOrRgbaToHex } from '../../../Utils/common';
import { COLOR_TYPE } from '../../../Utils/Constants';
import './style.css';
const ColorCodeInput = ({ label = "color", id, value, handleChange, showGradientPanel = false }) => {
    const [showPickerPopup, setShowPickerPopup] = useState(false);
    const defaultSolidColor = value;
    const [color, setcolor] = useState(value);
    const [key, setKey] = useState(COLOR_TYPE.solid);
    const { getGradientObject } = useColorPicker(color, setcolor);
    useEffect(() => {
        let gradientObject = getGradientObject();
        if (key === COLOR_TYPE.gradient && !isObjectEmpty(gradientObject) && gradientObject.colors.length < 2) {
            gradientObject.colors.push({ value: "#ffffff" })
            handleChange(COLOR_TYPE.gradient, gradientObject)
        }
        if (key === COLOR_TYPE.gradient && !isObjectEmpty(gradientObject) && gradientObject.colors.length > 1) {
            handleChange(COLOR_TYPE.gradient, gradientObject)
        }
    }, [color])

    useEffect(() => {
        if (key === COLOR_TYPE.gradient) {
            setcolor(`linear-gradient(90deg, ${hexToRgbaWithAlpha(value, 1)} 0%, rgba(255,255,255,1) 100%)`)
        } else {
            setcolor(defaultSolidColor);
        }

    }, [key])

    const handleColorChange = (newColor) => {
        if (key === COLOR_TYPE.solid) {
            setcolor(newColor);
            handleChange(COLOR_TYPE.solid, rgbOrRgbaToHex(newColor))
        } else {
            setcolor(newColor);
        }

    }
    return (
        <div className="customColorInput mt-3">
            <div className="w-100 d-flex flex-row justify-content-start align-items-center gap-1">
                <label htmlFor="colorCodePreview" className="input-label color-label text-light">{label}</label>
                {key === COLOR_TYPE.solid && <input type="text" onChange={(e) => handleChange(COLOR_TYPE.solid, e.target.value)} className="input " value={color} />}
                <button onClick={() => setShowPickerPopup(!showPickerPopup)} style={{ backgroundColor: value }} className="color-input-btn"></button>
            </div>


            {showPickerPopup &&
                <div className=" color-popover bg-dark rounded ">
                    <div className="d-flex  flex-row justify-content-end">
                        <div onClick={() => setShowPickerPopup(!showPickerPopup)} className="btn py-0 text-center text-white">
                            <BiX />
                        </div>
                    </div>
                    <Tabs
                        id="uncontrolled-tab-example"
                        className=" color-popover-tabs bg-dark"
                        activeKey={key}
                        onSelect={(k) => setKey(k)
                        }
                    >
                        <Tab eventKey={COLOR_TYPE.solid} className='bg-dark' title="Solid">
                            <div className="d-flex flex-column justify-content-center align-items-start p-3 ">
                                <ColorPicker
                                    width={192}
                                    height={128}
                                    hideControls
                                    hidePresets
                                    hideAdvancedSliders
                                    hideColorTypeBtns
                                    color={color}
                                    hideInputs
                                    onChange={handleColorChange} />
                                <div className="d-flex flex-row justify-content-center  mt-3 gap-2 ">
                                    <label className='text-white' htmlFor="hexCode">HEX</label>
                                    <input type="text" name='hexCode' onChange={(e) => handleChange(e.target.value)} className=" w-75 bg-dark text-light border border-white rounded-3  px-3" value={value} />
                                </div>
                            </div>

                        </Tab>
                        <Tab eventKey={COLOR_TYPE.gradient} disabled={!showGradientPanel} title="Gradient">
                            <div className="d-flex flex-row justify-content-center align-items-center p-3 ">
                                <ColorPicker
                                    width={192}
                                    hideAdvancedSliders
                                    height={128}
                                    value={color}
                                    hideColorGuide
                                    onChange={handleColorChange}
                                    hideColorTypeBtns={true}
                                />
                            </div>
                        </Tab>

                    </Tabs></div>
            }

        </div>

    )
}

export default ColorCodeInput