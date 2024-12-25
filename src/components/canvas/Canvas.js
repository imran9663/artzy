import React, { useEffect, useRef, useState } from "react";
import {
    FaLongArrowAltRight,
    FaPencilAlt,
    FaRegCircle,
    FaRegSquare
} from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { FaArrowPointer } from "react-icons/fa6";
import {
    Arc, Arrow, Circle,
    Image, Layer, Line, Rect, Stage, Star, Text,
    Transformer
} from "react-konva";
import { generateRandomHex, randId } from "../../Utils/common";
import { ACTIONS } from "../../Utils/Constants";
import { arrowOptions, circleOptions, rectangleOptions } from "../../Utils/elementObject";
import "./style.css";
const Canvas = () => {
    // Instagram post dimensions: 1080px by 1080px
    const width = 512;
    const height = 512;
    const stageRef = useRef();
    const TransformerRef = useRef();
    const [action, setAction] = useState(ACTIONS.SELECT);
    const [elements, setElements] = useState([]);
    const handlePointerDown = () => { };
    useEffect(() => {
        console.log("elements", elements);
    }, [elements]);
    const onElementClick = (e) => {
        const target = e.target;
        TransformerRef.current.nodes([target])
    }
    const handleElementBtnClick = (action) => {
        // const stage = stageRef.current;
        // const { x, y } = stage.getPointerPosition();
        switch (action) {
            case ACTIONS.RECTANGLE:
                rectangleOptions.x = (width - 50) / 2;
                rectangleOptions.y = (height - 50) / 2;
                rectangleOptions.width = 50;
                rectangleOptions.height = 50;
                rectangleOptions.fill = generateRandomHex();
                rectangleOptions.id = uuidv4();
                rectangleOptions.onClick = (e) => onElementClick(e)
                setElements([...elements, { "type": "Rect", props: rectangleOptions }])
                break;
            case ACTIONS.CIRCLE:

                circleOptions.x = (width - 50) / 2;
                circleOptions.y = (height - 50) / 2;
                circleOptions.radius = 50;
                circleOptions.fill = generateRandomHex();
                circleOptions.id = uuidv4();
                circleOptions.onClick = (e) => onElementClick(e)
                setElements([...elements, { "type": "Circle", props: circleOptions }])
                break;
            case ACTIONS.ARROW:
                arrowOptions.x = (width - 50) / 2;
                arrowOptions.y = (height - 50) / 2;
                arrowOptions.fill = generateRandomHex();
                arrowOptions.id = uuidv4();
                arrowOptions.onClick = (e) => onElementClick(e)
                setElements([...elements, { "type": "Arrow", props: arrowOptions }])
                break;
            default:
                break;
        }
    };
    const handlePointerUp = () => { };
    const renderDesignElements = () => {
        return elements.map((element, index) => {
            const { type, props } = element;
            switch (type) {
                case "Rect":
                    return (<Rect key={index} {...props} />
                    );
                case "Text":
                    return (<Text key={index} {...props} />);
                case "Circle":
                    return (<Circle key={index} {...props} />);
                case "Arrow":
                    return (<Arrow key={index} {...props} />);
                case "Image":
                    return (<Image key={index} {...props} />);

                case "Star":
                    return (<Star key={index} {...props} />);
                case "Arc":
                    return (
                        <Arc key={index} {...props} />
                    );

                default:
                    return null; // Handle unknown types gracefully
            }
        });
    };

    return (
        <div className="canvas">
            <div className="elements">
                <button
                    id={ACTIONS.SELECT}
                    onClick={() => handleElementBtnClick(ACTIONS.SELECT)}
                    className={`elementBtn ${action === ACTIONS.SELECT && "elementBtnSelected"
                        }`}
                >
                    <FaArrowPointer />
                </button>
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
                    className={`elementBtn ${action === ACTIONS.CIRCLE && "elementBtnSelected"
                        }`}
                >
                    <FaRegCircle />
                </button>
                <button
                    id={ACTIONS.ARROW}
                    onClick={() => handleElementBtnClick(ACTIONS.ARROW)}
                    className={`elementBtn ${action === ACTIONS.ARROW && "elementBtnSelected"
                        }`}
                >
                    <FaLongArrowAltRight />
                </button>
                <button
                    id={ACTIONS.PENCIL}
                    onClick={() => setAction(ACTIONS.PENCIL)}
                    className={`elementBtn ${action === ACTIONS.PENCIL && "elementBtnSelected"
                        }`}
                >
                    <FaPencilAlt />
                </button>
            </div>
            <div className="canvasStage">
                <Stage
                    ref={stageRef}
                    width={width}
                    height={height}
                    onPointerDown={handlePointerDown}
                    // onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    style={{ border: " solid 1px grey", background: "#fff" }}
                >
                    <Layer key={`layer-}`}>
                        {renderDesignElements()}
                        <Transformer ref={TransformerRef} />
                    </Layer>

                </Stage>
            </div>

            <div className="elementOptions">
                <div className="optionsWrapper">
                    <p className="options-heading">Position</p>
                    <div className="position d-flex flex-row flex-wrap">
                        <div className="  input-wrapper  ">
                            <label className="input-label" htmlFor='x' > x</label>
                            <input type="text" className="form-control  input" name='x' id='x' aria-describedby="helpId" />
                        </div>
                        <div className=" input-wrapper ">
                            <label className="input-label" htmlFor='y' > y</label>
                            <input type="text" className="form-control  input" name='y' id='y' aria-describedby="helpId" />
                        </div>
                        <div className=" input-wrapper ">
                            <label className="input-label" htmlFor='width' > w</label>
                            <input type="text" className="form-control  input" name='width' id='width' aria-describedby="helpId" />
                        </div>
                        <div className=" input-wrapper ">
                            <label className="input-label" htmlFor='height' > h </label>
                            <input type="text" className="form-control  input" name='height' id='height' aria-describedby="helpId" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Canvas;
