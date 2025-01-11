import React, { useEffect, useState } from 'react'
import './style.css'
import { Canvas } from 'fabric';
import { BiArrowFromBottom, BiArrowFromTop, BiHide, BiShow } from 'react-icons/bi';
import { saveCanvasStateToLocalStorage } from '../../helpers/localstorageHelpers';
import { TbLayersOff, TbSquareOff } from 'react-icons/tb';
const Layers = ({ canvas }) => {
    const [layers, setLayers] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [layerOpacityMap, setLayerOpacityMap] = useState({
    })
    const moveSelectedLayer = (direction) => {
        if (!selectedLayer) return;
        const objects = canvas.getObjects();
        const object = objects.find((obj) => obj.id === selectedLayer.id); //get selected layer
        if (object) {
            const currentIndex = objects.indexOf(object);
            if (direction === 'up' && currentIndex < objects.length - 1) {
                const tempObj = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex + 1];
                objects[currentIndex + 1] = tempObj
            }
            else if (direction === 'down' && currentIndex > 0) {
                const tempObj = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex - 1];
                objects[currentIndex - 1] = tempObj
            }
        }
        const bgColor = canvas.backgroundColor;
        canvas.clear(); // clearing canvas so we can render the object as per new arrangement
        objects.forEach((obj) => canvas.add(obj));
        canvas.backgroundColor = bgColor;
        canvas.renderAll();

        // updating the Z- index as per new arrangement
        objects.forEach((obj, index) => {
            obj.zIndex = index
        })
        canvas.setActiveObject(object); //setting the selected object as active object
        canvas.renderAll();
        updateLayers() //update the list to reflect the new order

    }


    const hideSelectedLayer = () => {
        if (!selectedLayer) return;
        const object = canvas.getObjects().find((obj) => obj.id === selectedLayer.id)
        if (!object) return;
        if (object.opacity === 0) {
            object.opacity = object.prevOpacity || 1;
            object.prevOpacity = undefined;

        } else {
            object.prevOpacity = object.opacity || 1;
            object.opacity = 0
        }
        canvas.renderAll();
        updateLayers()
        setSelectedLayer({ ...selectedLayer, opacity: object.opacity })
    }
    const addIdToObject = (object) => {
        if (!object.id) {
            const timestamp = new Date().getTime();
            object.id = `${object.type}-${timestamp}`
        }
    }
    Canvas.prototype.updateZIndIces = function () {
        const objects = this.getObjects();
        objects.forEach((obj, index) => {
            addIdToObject(obj);
            obj.zIndex = index
        })
    }
    const updateLayers = () => {
        if (canvas) {
            canvas.updateZIndIces();
            const layeredObjects = canvas.getObjects()
                .filter((obj) => !(obj.id.startsWith('vertical-') || obj.id.startsWith('horizontal-')))
                .map((ele) => ({
                    id: ele.id,
                    zIndex: ele.zIndex,
                    type: ele.type,
                    opacity: ele.opacity
                }));
            setLayers([...layeredObjects].reverse())
        }
    }
    const handleObjectSelected = (e) => {
        const selectedObject = e.selected ? e.selected[0] : null;
        if (selectedObject) {
            setSelectedLayer({ id: selectedObject.id, opacity: selectedObject.opacity })
        } else {
            setSelectedLayer(null)
        }
    }
    const selectLayerInCanvas = (layerId) => {
        const object = canvas.getObjects().find((obj => obj.id === layerId));
        if (object) {
            canvas.setActiveObject(object);
            canvas.renderAll()
            setSelectedLayer({ id: object.id, opacity: object.opacity })
        }
    }
    useEffect(() => {
        if (canvas) {
            canvas.on('object:added', () => {
                updateLayers()
            })
            canvas.on('object:removed', () => {
                updateLayers()

            })
            canvas.on('object:modified', () => {
                updateLayers()
            })

            canvas.on("selection:created", (event) => {
                handleObjectSelected(event)
            })
            canvas.on("selection:updated", (event) => {
                handleObjectSelected(event)
            })
            canvas.on("selection:cleared", () => setSelectedLayer(null))
            updateLayers()
            return () => {
                canvas.off('object:added', updateLayers)
                canvas.off('object:removed', updateLayers)
                canvas.off('object:modified', updateLayers)

                canvas.off("selection:created", handleObjectSelected)
                canvas.off("selection:updated", handleObjectSelected)
                canvas.off("selection:cleared", () => setSelectedLayer(null))
            }
        }
    }, [canvas])


    return (
        layers.length > 0 ?
        <div className="layers-container">
            <div className="d-flex flex-row justify-content-end gap-1 mb-1">
                <div className="btn-group  btn-group-sm d-flex flex-row justify-content-end">
                    <button disabled={!selectedLayer || layers[0]?.id === selectedLayer.id}
                        onClick={() => moveSelectedLayer('up')} type="button" className="btn  btn-sm btn-light mx-1 bg-dark text-white border-0">
                        <BiArrowFromBottom />
                    </button>
                    <button disabled={!selectedLayer || layers[layers.length - 1]?.id === selectedLayer.id}
                        onClick={() => moveSelectedLayer('down')} type="button" className="btn  btn-sm btn-light mx-1 bg-dark text-white border-0">
                        <BiArrowFromTop />
                    </button>

                </div>

            </div>

                <ul className="list-group layers-group">
                {layers.map((layer) => (
                    <li

                        key={layer.id}
                        onClick={() => selectLayerInCanvas(layer?.id)}
                        className={`list-group-item  border-square 
                        py-2 px-2  text-capitalize border-0 border-bottom cursor-pointer text-white  border-bottom-white
                        ${layer?.id === selectedLayer?.id ? "bg-secondary" : "bg-dark"}`}>
                        <div className="d-flex mx-2 flex-row justify-content-between align-items-center">
                            <p className="fs-halfRem text-capitalize mb-0">
                                {layer.type}-{layer.zIndex}
                            </p>
                            <button onClick={hideSelectedLayer} type="button" className="btn   btn-sm btn-light p-0 bg-transparent border-0 text-white">
                                {layer?.opacity === 0 ? <BiHide /> : <BiShow />}
                            </button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
            : <>
                <>
                    <div className="noShape-selected d-flex flex-column  justify-content-center align-items-center">
                        <div className="noShape-icon">
                            <TbLayersOff />
                        </div>
                        <p className="noShape-selected-heading  text-center ">No Layers to Show</p>
                        <p className="noShape-selected-helper text-center "> Select the object to view Layers</p>
                    </div>
                </></>
    )
}

export default Layers