import React, { useEffect, useState } from 'react'
import './styles.css'
import { SHAPES } from '../../Utils/Constants'
import ColorCodeInput from '../ColorCodeInput/Index'
const Setting = ({ canvas }) => {
    const [selectedObject, setSelectedObject] = useState(null)
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [color, setColor] = useState('')
    const [diameter, setDiameter] = useState('')
    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (event) => {
                handleObjectSelection(event.selected[0])
            });
            canvas.on('selection:updated', (event) => {
                handleObjectSelection(event.selected[0])
            });
            canvas.on('selection:cleared', () => {
                setSelectedObject(null)
                clearSettings()
            });
            canvas.on('object:modified', (event) => {
                handleObjectSelection(event.target)
            });
            canvas.on('object:scaling', (event) => {
                handleObjectSelection(event.target)
            });

        }
    }, [canvas])
    const handleObjectSelection = (object) => {
        if (!object) return;
        setSelectedObject(object);
        if (object.type === SHAPES.rect) {
            setWidth(Math.round(object.width * object.scaleX))
            setHeight(Math.round(object.height * object.scaleX))
            setColor(object.fill);
            setDiameter('')
        }
        if (object.type === SHAPES.circle) {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill)
            setWidth('')
            setHeight('')
        }
    }
    const clearSettings = () => {
        setWidth('')
        setHeight('')
        setDiameter('')
        setColor('')
    }

    const handleHightChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const initValue = parseInt(value, 10)
        setHeight(initValue)
        if (selectedObject && selectedObject.type === SHAPES.rect && initValue >= 0) {
            selectedObject.set({ height: initValue / selectedObject.scaleY })
            canvas.renderAll()
        }
    }
    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const initValue = parseInt(value, 10)
        setDiameter(initValue)
        if (selectedObject && selectedObject.type === SHAPES.circle && initValue >= 0) {
            selectedObject.set({ radius: initValue / 2 / selectedObject.scaleX })
            canvas.renderAll()
        }
    }
    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, '');
        const initValue = parseInt(value, 10)
        setWidth(initValue)
        if (selectedObject && selectedObject.type === SHAPES.rect && initValue >= 0) {
            selectedObject.set({ width: initValue / selectedObject.scaleX })
            canvas.renderAll()
        }
    }
    const handleColorChange = (e) => {
        const { value } = e.target
        setColor(value)
        if (selectedObject) {
            selectedObject.set({ fill: value })
            canvas.renderAll()
        }
    }
    return (
        <div className="settingsPanel bg-light p-3">
            {selectedObject &&
                <>
                    {selectedObject.type === SHAPES.rect &&
                        <div className="input-wrapper  ">
                            <label className="input-label" htmlFor={'width'}>
                                W
                            </label>
                            <input
                                onChange={handleWidthChange}
                                type={'text'}
                                className="form-control  input"
                                value={width}
                                name={'width'}
                                id={'width'}
                            />
                        </div>}
                    {selectedObject.type === SHAPES.rect &&
                        <div className="input-wrapper  ">
                            <label className="input-label" htmlFor={'height'}>
                                H
                            </label>
                            <input
                                onChange={handleHightChange}
                                type={'text'}
                                className="form-control  input"
                                value={height}
                                name={'height'}
                                id={'height'}
                            />
                        </div>}
                    {selectedObject.type === SHAPES.circle &&
                        <div className="input-wrapper  ">
                            <label className="input-label" htmlFor={'diameter'}>
                                D
                            </label>
                            <input
                                onChange={handleDiameterChange}
                                type={'text'}
                                className="form-control  input"
                                value={diameter}
                                name={'diameter'}
                                id={'diameter'}
                            />
                        </div>}

                    <ColorCodeInput label={'Color'} id={'Color'} value={color} handleChange={handleColorChange} />

                </>
            }
        </div>
    )
}

export default Setting