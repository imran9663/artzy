import { Canvas, Circle, Rect } from 'fabric';
import React, { useEffect, useRef, useState } from "react";
import { BiDuplicate, BiSolidTrash } from "react-icons/bi";
import {
    FaRegCircle,
    FaRegSquare
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { generateRandomHex } from "../../Utils/common";
import { ACTIONS } from "../../Utils/Constants";
import elementOptions from "../../Utils/elementOptions.json";
import Settings from '../Settings/Setting';
import "./style.css";
const MainCanvas = () => {
    const width = 1080 / 2;
    const height = 1080 / 2;
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null)
    const [action, setAction] = useState(ACTIONS.SELECT);
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState({});
    const [contextMenu, setcontextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width, height
            });
            initCanvas.backgroundColor = "#fff";
            initCanvas.renderAll();
            setCanvas(initCanvas)
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
                        fill: generateRandomHex()
                    })
                    canvas.add(newRect)
                    break;
                case ACTIONS.CIRCLE:
                    const newCircleOptions = new Circle({
                        top: (width - 50) / 2,
                        left: (height - 50) / 2,
                        radius: 50,
                        fill: generateRandomHex()
                    });
                    canvas.add(newCircleOptions)
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
        // const eleM = elements.filter((ele) => ele.props.id === selectedElement.id)
        // eleM[0].props.id = uuidv4();
        // const updatedELE = [...elements, eleM[0]]
        // console.log("eleM[0]", eleM[0]);
        // console.log("updatedELE", updatedELE);
        // setElements(() => [...elements, eleM[0]])
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



    return (
        <div className="canvas">
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

            <Settings canvas={canvas} />
        </div>
    );
};

export default MainCanvas;
