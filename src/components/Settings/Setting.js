import React, { useEffect, useState } from "react";
import "./styles.css";
import { COLOR_TYPE, SHAPES } from "../../Utils/Constants";
import RangeSlider from "../UtilComponnents/RangeSlider/Index";
import NewInputField from "../UtilComponnents/NewInputField/Index";
import ColorCodeInput from "../UtilComponnents/ColorCodeInput/Index";
import { convertPaletteToFabricGradient, convertPaletteToFabricGradientV2, htmlGradientToFabricGradient } from "../../Utils/common";
import { Gradient } from "fabric";

const Setting = ({ canvas }) => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [color, setColor] = useState("");
    const [opacity, setOpacity] = useState("");
    const [diameter, setDiameter] = useState("");
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
    const handleObjectSelection = (object) => {
        if (!object) return;
        setSelectedObject(object);
        setOpacity(object.opacity);
        setColor(object.fill);

        if (object.type === SHAPES.rect) {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleX));
            setDiameter("");
        }
        if (object.type === SHAPES.circle) {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setWidth(0);
            setHeight(0);
        }
    };
    const clearSettings = () => {
        setWidth(0);
        setHeight(0);
        setDiameter("");
        setColor("");
        setOpacity("");
    };

    const handleHightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const initValue = parseInt(value, 10);
        setHeight(initValue);
        if (
            selectedObject &&
            selectedObject.type === SHAPES.rect &&
            initValue >= 0
        ) {
            selectedObject.set({ height: initValue / selectedObject.scaleY });
            canvas.renderAll();
        }
    };
    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const initValue = parseInt(value, 10);
        setDiameter(initValue);
        if (
            selectedObject &&
            selectedObject.type === SHAPES.circle &&
            initValue >= 0
        ) {
            selectedObject.set({ radius: initValue / 2 / selectedObject.scaleX });
            canvas.renderAll();
        }
    };
    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const initValue = parseInt(value, 10);
        setWidth(initValue);
        if (
            selectedObject &&
            selectedObject.type === SHAPES.rect &&
            initValue >= 0
        ) {
            selectedObject.set({ width: initValue / selectedObject.scaleX });
            canvas.renderAll();
        }
    };
    const handleColorChange = (type, value) => {

        if (type === COLOR_TYPE.solid) {
            setColor(value);
            if (selectedObject) {
                selectedObject.set({ fill: value });
                canvas.renderAll();
            }
        }
        if (type === COLOR_TYPE.gradient) {
            setColor(value);
            if (selectedObject) {

                const gradient_fill = new Gradient(convertPaletteToFabricGradientV2(selectedObject, value));
                console.log("gradient_fill", gradient_fill);
                selectedObject.set({ fill: gradient_fill });
                canvas.renderAll();
            }
        }

    };
    const handleOpacityChange = (e) => {
        const { value } = e.target;
        setOpacity(value);
        if (selectedObject) {
            selectedObject.set({ opacity: value });
            canvas.renderAll();
        }
    };
    return (
        <>
            {selectedObject && (
                <div className="optionsWrapper">
                    <div className="d-flex justify-content-between">
                        {selectedObject.type === SHAPES.rect && (
                            <NewInputField
                                handleChange={handleWidthChange}
                                type={"text"}
                                label={"W"}
                                className="form-control  input"
                                value={width}
                                name={"width"}
                                id={"width"}
                            />
                        )}
                        {selectedObject.type === SHAPES.rect && (
                            <NewInputField
                                value={height}
                                name={"height"}
                                id={"height"}
                                type={"text"}
                                handleChange={handleHightChange}
                                label={"H"}
                            />
                        )}
                    </div>

                    {selectedObject.type === SHAPES.circle && (
                        <NewInputField
                            handleChange={handleDiameterChange}
                            type={"text"}
                            label={"Diameter"}
                            className="form-control  input"
                            value={diameter}
                            name={"diameter"}
                            id={"diameter"}
                        />
                    )}

                    <RangeSlider
                        name={"opacity"}
                        id={"opacity"}
                        label={"opacity"}
                        min={0}
                        max={1}
                        steps={0.1}
                        value={opacity}
                        handleChange={handleOpacityChange}
                    />

                    <ColorCodeInput label="Color" id={'fill'} showGradientPanel={true} value={color} handleChange={handleColorChange} />

        </div>
            )}
        </>
    );
};

export default Setting;
