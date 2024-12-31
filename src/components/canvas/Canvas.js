import React, { useEffect, useRef, useState } from "react";
import {
    FaLongArrowAltRight,
    FaPencilAlt,
    FaRegCircle,
    FaRegSquare,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { FaArrowPointer } from "react-icons/fa6";
import {
    Arc,
    Arrow,
    Circle,
    Image,
    Layer,
    Line,
    Rect,
    Stage,
    Star,
    Text,
    Transformer,
} from "react-konva";
import { generateRandomHex, isObjectEmpty, randId } from "../../Utils/common";
import { ACTIONS } from "../../Utils/Constants";
import elementOptions from "../../Utils/elementOptions.json";
import "./style.css";
import { rectElemTypes } from "../../Utils/elementOptionTypes";
import ColorCodeInput from "../ColorCodeInut/Index";
import { BiDuplicate, BiSolidTrash } from "react-icons/bi";
const Canvas = () => {
    const width = 1080 / 2;
    const height = 1080 / 2;
    const stageRef = useRef();
    const TransformerRef = useRef();
    const elementRef = useRef({});
    const [action, setAction] = useState(ACTIONS.SELECT);
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState({});
    const [contextMenu, setcontextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
    });
    const handlePointerDown = (e) => {

    };
    const handlePointerMove = () => {
        const stage = stageRef.current;
    };

    const onElementClick = (e) => {
        const target = e.target;
        TransformerRef.current.nodes([elementRef.current[target.attrs.id]]);
        setSelectedElement(target.attrs);
    };
    const handleElementBtnClick = (action) => {
        // const stage = stageRef.current;
        // const { x, y } = stage.getPointerPosition();
        switch (action) {
            case ACTIONS.RECTANGLE:
                let newRecOptions = {};
                newRecOptions.x = (width - 50) / 2;
                newRecOptions.y = (height - 50) / 2;
                newRecOptions.width = 50;
                newRecOptions.height = 50;
                newRecOptions.fill = generateRandomHex();
                newRecOptions.id = uuidv4();
                newRecOptions.onClick = (e) => onElementClick(e);
                setElements([
                    ...elements,
                    {
                        type: "Rect",
                        props: { ...newRecOptions, ...elementOptions.rectangleOptions },
                    },
                ]);
                break;
            case ACTIONS.CIRCLE:
                const newCircleOptions = {};
                newCircleOptions.x = (width - 50) / 2;
                newCircleOptions.y = (height - 50) / 2;
                newCircleOptions.radius = 50;
                newCircleOptions.fill = generateRandomHex();
                newCircleOptions.id = uuidv4();
                newCircleOptions.onClick = (e) => onElementClick(e);
                setElements([
                    ...elements,
                    {
                        type: "Circle",
                        props: { ...newCircleOptions, ...elementOptions.circleOptions },
                    },
                ]);
                break;
            case ACTIONS.ARROW:
                const newArrowOptions = elementOptions.arrowOptions;
                newArrowOptions.x = (width - 50) / 2;
                newArrowOptions.y = (height - 50) / 2;
                newArrowOptions.fill = generateRandomHex();
                newArrowOptions.id = uuidv4();
                newArrowOptions.onClick = (e) => onElementClick(e);
                setElements([
                    ...elements,
                    {
                        type: "Arrow",
                        props: { ...newArrowOptions, ...elementOptions.arrowOptions },
                    },
                ]);
                break;
            default:
                break;
        }
    };
    const handleTransformEnd = (id) => {
        const node = elementRef.current[id];
        const updatedShapes = elements.map((shape) => {
            if (shape.props.id === id) {
                shape.props.x = node.x();
                shape.props.y = node.y();
                switch (shape.type) {
                    case "Rect":
                        shape.props.width = node.width() * node.scaleX(); // Adjust for scaling
                        shape.props.height = node.height() * node.scaleY(); // Adjust for scaling
                        break;
                    case 'Circle':
                        shape.props.radius = node.radius() * node.scaleX();
                    default:
                        break;
                }
            }
            return shape;
        });
        // console.log("updatedShapes", updatedShapes);
        setElements(() => updatedShapes);
        node.scaleX(1); // Reset scaling
        node.scaleY(1); // Reset scaling
    };
    const handleDragMove = (id) => {
        const node = elementRef.current[id];
        const updatedShapes = elements.map((shape) => {
            if (shape.props.id === id) {
                shape.props.x = node.x();
                shape.props.y = node.y();
            }
            return shape;
        });
        setElements(() => updatedShapes);
    };
    const handlePointerUp = () => {
        TransformerRef.current.nodes([]);
    };
    const handleContextMenu = (e) => {
        e.evt.preventDefault();
        setcontextMenu({
            ...contextMenu,
            show: true,
            x: Math.abs(e.target.width() - e.target.x()),
            y: Math.abs(e.target.height() - e.target.y()),
        });
    };
    const renderDesignElements = () => {
        return elements.map((element) => {
            const { type, props } = element;
            switch (type) {
                case "Rect":
                    return (
                        <Rect
                            onTransform={() => handleTransformEnd(element.props.id)}
                            // onDragEnd={() => handleDragMove(element.props.id)}
                            onDragMove={() => handleDragMove(element.props.id)}
                            onContextMenu={handleContextMenu}

                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                case "Text":
                    return (
                        <Text
                            onTransformEnd={() => handleTransformEnd(element.props.id)}
                            onContextMenu={handleContextMenu}
                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                case "Circle":
                    return (
                        <Circle
                            onTransformEnd={() => handleTransformEnd(element.props.id)}
                            onContextMenu={handleContextMenu}
                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                case "Arrow":
                    return (
                        <Arrow
                            onTransformEnd={() => handleTransformEnd(element.props.id)}
                            onContextMenu={handleContextMenu}
                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                case "Image":
                    return (
                        <Image
                            onTransformEnd={() => handleTransformEnd(element.props.id)}
                            onContextMenu={handleContextMenu}
                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                case "Star":
                    return (
                        <Star
                            onTransformEnd={() => handleTransformEnd(element.props.id)}
                            onContextMenu={handleContextMenu}
                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                case "Arc":
                    return (
                        <Arc
                            onTransformEnd={() => handleTransformEnd(element.props.id)}
                            onContextMenu={handleContextMenu}
                            ref={(node) => (elementRef.current[element.props.id] = node)}
                            key={element.props.id}
                            {...props}
                        />
                    );
                default:
                    return null; // Handle unknown types gracefully
            }
        });
    };
    const handleDeleteElement = () => {
        // console.log(" elements.props.id ", elements);
        // console.log(" selectedElement.id", selectedElement.id);
        setElements(elements.filter((ele) => ele.props.id !== selectedElement.id));
        TransformerRef.current.nodes([]);
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
    const handleClickOnCanvasStage = () => {
        setcontextMenu({ ...contextMenu, show: false });
    };

    // useEffect(() => {
    //     // console.log("selectedELE", selectedElement);
    //     console.log("TransformerRef", TransformerRef);
    // }, [TransformerRef]);

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
            <div className="canvasStage"
                onClick={handleClickOnCanvasStage}>
                <Stage
                    ref={stageRef}
                    height={height}
                    onPointerDown={handlePointerDown}
                    width={width}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    style={{ border: " solid 1px grey", background: "#fff" }}
                >
                    <Layer key={`layer-}`}>
                        {renderDesignElements()}
                        <Transformer keepRatio={false} ref={TransformerRef} />
                    </Layer>
                </Stage>
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
            <div className="elementOptions">
                {selectedElement !== null && (
                    <div className="optionsWrapper">
                        <p className="options-heading">Position</p>
                        <div className="position d-flex flex-row flex-wrap">
                            {rectElemTypes.position.map((elemType) => {
                                if (elemType.type == "text")
                                    return (
                                        <div className="input-wrapper  ">
                                            <label className="input-label" htmlFor={elemType.id}>
                                                {elemType.label}
                                            </label>
                                            <input
                                                type={elemType.type}
                                                className="form-control  input"
                                                value={selectedElement[elemType.id]}
                                                name={elemType.id}
                                                id={elemType.id}
                                                aria-describedby="helpId"
                                            />
                                        </div>
                                    );
                                if (elemType.type === "color")
                                    return (
                                        <ColorCodeInput
                                            id={elemType.id}
                                            label={elemType.label}
                                            value={selectedElement[elemType.id]}
                                        />
                                    );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Canvas;
