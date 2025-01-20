import { Canvas } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { setupCanvas } from "../../helpers/canvasHelpers";
import {
    clearGuideLines,
    handleObjectMoving,
} from "../../helpers/snappingHelper";
import Elements from "../Elements";
import Layers from "../Layers/Layers";
import NavBar from "../Navbar";
import Settings from "../Settings/Setting";
import "./style.css";
import Footer from "../Footer";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import { filterFonts } from "../../Utils/common";
import axios from "axios";
const MainCanvas = (props) => {
    const canvasRef = useRef(null);
    const stageRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [stageScale, setStageScale] = useState(1);
    const [canvasSize, setCanvasSize] = useState({
        width: 1920,
        height: 1080,
    });
    const [contextMenu, setcontextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
    });
    const [shapeOptionsTabKey, setShapeOptionsTabKey] = useState("styles");
    const [guideLines, setGuideLines] = useState([]);
    const [showSettingsPanel, setShowSettingsPanel] = useState(false);


    useEffect(() => {
        const fetchFonts = async () => {
            const googleApiKeys = process.env.REACT_APP_GOOGLE_FONTS_API_KEY;
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/webfonts/v1/webfonts?key=${googleApiKeys}`
                );
                if (response.status === 200) {
                    const filteredFonts = filterFonts(response.data.items);
                    filteredFonts.forEach((font) => loadFont(font.family));
                }

            } catch (error) {
                console.error("Error fetching Google Fonts:", error);
            }
        };
        fetchFonts();
    }, []);


    const loadFont = (font) => {
        const fontLink = document.createElement("link");
        fontLink.href = `https://fonts.googleapis.com/css2?family=${font.replace(
            " ",
            "+"
        )}:wght@400;700&display=swap`;
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
    };
    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current);
            const responsiveCanvas = setupCanvas(initCanvas, 'canvasStage', canvasSize.width, canvasSize.height);
            setCanvas(responsiveCanvas);
            initCanvas.on("selection:created", (event) => {
                setShowSettingsPanel(true);
            });
            initCanvas.on("selection:cleared", () => {
                setShowSettingsPanel(false)
            });
            initCanvas.on("object:moving", (event) => {
                handleObjectMoving(initCanvas, event.target, guideLines, setGuideLines, canvasSize);
            });
            initCanvas.on("object:modified", () => {
                clearGuideLines(initCanvas, guideLines, setGuideLines);
            });

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    const handleWheel = event => {
        event.preventDefault(); // Prevent default scroll behavior
        // Adjust scale based on scroll direction
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.min(Math.max(stageScale + delta, 0.5), 2); // Clamp scale between 0.5 and 3
        setStageScale(newScale); // Update scale state
    };

    return (
        <>
            <div id="layout" className="layout">
                <NavBar canvas={canvas} />
                <div className="canvas">
                    <Elements canvas={canvas} />

                    <div id="canvasStage" style={{ transform: `scale(${stageScale})`, zIndex: 0 }} onWheel={handleWheel} useRef={stageRef} className="canvasStage">
                        <canvas id="canvas" ref={canvasRef}></canvas>
                        {contextMenu.show && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: contextMenu.x,
                                    top: contextMenu.y,
                                    zIndex: 99
                                }}
                            >
                                {/* Content of your context menu */}
                                {/* <div className="list-group">
                                    <button
                                        onClick={handleDeleteSelected}
                                        type="button"
                                        className="context-menu-list list-group-item list-group-item-action "
                                    >
                                        <TbTrash />
                                        <span>Delete</span>
                                    </button>
                                    <button
                                        onClick={handleDeleteSelected}
                                        type="button"
                                        className="context-menu-list list-group-item list-group-item-action "
                                    >
                                        <TbCopyPlusFilled />
                                        <span>Duplicate</span>
                                    </button>
                                </div> */}
                            </div>
                        )}
                    </div>
                    <div className={`settingsPanel bg-dark ${showSettingsPanel && 'showPanel'}`}>
                        <button onClick={() => setShowSettingsPanel(!showSettingsPanel)} className="open-panel-btn text-warning btn  py-3 px-0 bg-dark">
                            {showSettingsPanel ? <TbChevronsRight /> : <TbChevronsLeft />}
                        </button>
                        <Tabs
                            id="shapeOptions"
                            activeKey={shapeOptionsTabKey}
                            onSelect={(k) => setShapeOptionsTabKey(k)}
                            className="px-3 shapeOptionsTabs"
                        >
                            <Tab eventKey="styles" title="Styles">
                                <Settings canvas={canvas} />
                            </Tab>
                            <Tab eventKey="layers" title="Layers">
                                <Layers canvas={canvas} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <Footer canvasZoom={stageScale} setCanvasZoom={setStageScale} />
            </div>
        </>
    );
};

export default MainCanvas;
