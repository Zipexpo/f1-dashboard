import React, {useEffect} from 'react'
import './index.scss';

// adapt from https://codepen.io/codemzy/pen/YzELgbb
function DragDropFile({multiple,children, buttonRef,handleFile=()=>{}}) {

    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

// triggers the input when the button is clicked

    useEffect(()=>{
        if (buttonRef.current) {
            buttonRef.current.onclick=() => {
                inputRef.current.click();
            }
        }
    },[buttonRef.current])
    return (
        <form className="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} style={{margin:'auto'}}>
            <input ref={inputRef} type="file" className="input-file-upload" multiple={multiple} onChange={handleChange} />
            <label htmlFor="input-file-upload" className={`label-file-upload ${dragActive ? "drag-active" : ""}` }>
                <div>
                    {children}
                </div>
            </label>
            { dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </form>
    );
};

export default DragDropFile