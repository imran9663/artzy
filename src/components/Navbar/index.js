import React, { useState } from 'react'
import './styles.css';
import logo from '../../Assets/Images/android-icon-72x72.png'
import * as Tb from 'react-icons/tb';
import { Dropdown } from 'react-bootstrap';
import NewInputField from '../UtilComponents/NewInputField/Index';
import { setupCanvas } from '../../helpers/canvasHelpers';

const NavBar = ({ canvas }) => {
    const [canvasSize, setCanvasSize] = useState({
        width: 540,
        height: 540,
    });
    const [fileName, setFileName] = useState(`File_${new Date().toJSON()}`)
    const handleSaveBtnClick = () => {
        const saveTo = canvas.toJSON();
        console.log("saveTo", saveTo);
    }
    const handleDeleteSelected = () => {
        const activeObj = canvas.getActiveObject();
        if (activeObj) {
            canvas.remove(activeObj)
        } else {
            console.log("no object selected");
        }
    }
    const handleDuplicateObject = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject) {
                activeObject.clone().then((clonedObj) => {
                    clonedObj.set({
                        left: activeObject.left + 20, // Offset left
                        top: activeObject.top + 20,  // Offset top
                        evented: true,
                    });
                    canvas.add(clonedObj);
                    canvas.setActiveObject(clonedObj);
                    canvas.renderAll();
                }
                ).catch((err) => {
                    console.log("cannot duplicate", err);

                })
            }
        }
    }
    const handleChangeName = (e) => {
        const { value } = e.target;
        setFileName(value)
    }



    const handleSizeChange = (e) => {
        const { value, id } = e.target;
        setCanvasSize({ ...canvasSize, [id]: Number(value) })
    }
    const handleResizeClick = () => {
        setupCanvas(canvas, 'canvasStage', canvasSize.width, canvasSize.height)
        // const parentElement = document.getElementById("canvasStage");
        // const newWidth = parentElement.offsetWidth;
        // const newHeight = parentElement.offsetHeight;

        // canvas.setDimensions({ width: newWidth, height: newHeight });
        // canvas.renderAll()
    }
    const downloadCanvas = (canvas, format = 'svg', filename = 'canvas') => {
        if (!canvas) return;

        let dataURL;
        if (format === 'png' || format === 'jpeg' || format === 'webp') {
            const backgroundColor = format === 'jpeg' ? '#ffffff' : null;
            dataURL = canvas.toDataURL({
                format,
                multiplier: 2, // Higher resolution
                enableRetinaScaling: true,
                withoutTransform: false,
                backgroundColor,
            });
        } else if (format === 'svg') {
            dataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                canvas.toSVG()
            )}`;
        } else if (format === 'json') {
            const json = canvas.toJSON();
            dataURL = `data:application/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(json, null, 2)
            )}`;
        }

        // Trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${filename}.${format}`;
        link.click();
    };
    return (
        <nav className="navbar navbar-expand-sm navbar-dark logo-navbar">
            <div className="logo-wrapper d-flex flex-row align-items-center gap-4">
                <img src={logo} alt className="img-fluid " />
                <div className="file_name_wrapper">
                    <NewInputField style={{ width: "15rem" }} id="file_name" value={fileName} handleChange={handleChangeName} />
                </div>
            </div>

            <div className="d-flex flex-row gap-2">
                <button type="button" disabled className="btn btn-dark btn-sm border ">
                    <Tb.TbArrowBackUp />
                </button>
                <button type="button" disabled className="btn btn-dark btn-sm border ">
                    <Tb.TbArrowForwardUp />
                </button>
                <button type="button" onClick={handleDuplicateObject} className="btn btn-dark btn-sm border ">
                    <Tb.TbCopyPlusFilled />
                </button>
                <button type="button" onClick={handleDeleteSelected} className="btn btn-dark btn-sm border ">
                    <Tb.TbTrash />
                </button>
            </div>
            <div className="d-flex flex-row gap-1">

                <Dropdown className=" font-dark-bg w-100">
                    <Dropdown.Toggle variant="warning" size="small" className="btn btn-warning dd-toggle-btn bg-warning" data-bs-theme="dark" id="dropdown-basic">
                        <Tb.TbArrowsDiagonal /><span >Resize</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-dark font-dark-bg w-100">
                        <div className="card">
                            <div className="mx-3 d-flex justify-content-center align-items-center">
                                <NewInputField name='canvasWidth' label="W" id='width' handleChange={handleSizeChange} />
                                <NewInputField name='canvasHeight' label="H" id='height' handleChange={handleSizeChange} />
                            </div>
                            <button onClick={handleResizeClick} className="btn mt-3 btn-sm btn-warning">
                                Resize
                            </button>


                        </div>

                    </Dropdown.Menu>
                </Dropdown>
                <button onClick={handleSaveBtnClick} type="button" className="btn btn-dark btn-sm border border-warning">
                    <Tb.TbDeviceFloppy />
                </button>
                <button onClick={() => downloadCanvas(canvas, 'png', fileName)} type="button" className="btn btn-dark btn-sm border border-warning">
                    <Tb.TbDownload />
                </button>
            </div>
        </nav>
    )
}

export default NavBar