import React, { useEffect, useRef } from 'react'
import * as fabric from 'fabric'
const Dummy = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: 540, height: 540,
            })
            // const text = new fabric.Text('Hello Fabric.js', {
            //     left: 100,
            //     top: 100,
            //     fontSize: 20,
            //     fill: 'blue',
            // });
            // initCanvas.add(text);
            const iText = new fabric.IText('Editable Text', {
                left: 100,
                top: 150,
                fontSize: 24,
                fill: 'green',
                fontStyle: 'italic',
            });
            initCanvas.add(iText);
            const textBox = new fabric.Textbox('This is a multiline\nText Box.', {
                left: 100,
                top: 200,
                width: 200,
                fontSize: 18,
                fill: 'purple',
            });
            initCanvas.add(textBox);
            const text = new fabric.Text('Hello Fabric.js', {
                left: 100,
                top: 100,
                fontSize: 20,
                fill: 'blue',
            });
            initCanvas.add(text);
            const text1 = new fabric.Text('Group Text 1', { left: 0, top: 0, fontSize: 16, fill: 'red' });
            const text2 = new fabric.Text('Group Text 2', { left: 0, top: 30, fontSize: 16, fill: 'blue' });

            const group = new fabric.Group([text1, text2], {
                left: 100,
                top: 300,
            });
            initCanvas.add(group);
            initCanvas.renderAll()


            return () => {
                initCanvas.dispose()
            }
        }


    }, [])

    return (
        <div classname="d-flex flex-column w-100 h-100">
            <nav className="navbar navbar-expand navbar-light bg-dark text-light">
                <div className="nav navbar-nav">
                    <a className="nav-item nav-link active  text-light" href="#" aria-current="page">Dummy <span className="visually-hidden">(current)</span></a>

                </div>
            </nav>
            <div className="d-flex w-100 h-100 justify-content-center align-items-center " >
                <canvas ref={canvasRef} id="canvas"></canvas>
            </div>
        </div>

    )
}

export default Dummy