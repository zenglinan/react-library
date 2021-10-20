import React, { FC, useState, useCallback, DragEvent, useRef } from "react";
import classNames from 'classnames'

interface DraggerProps {
    onFile: (files: FileList) => void;
}

const Dragger: FC<DraggerProps> = (props) => {
    const { onFile, children } = props;
    const count = useRef(0)
    const [dragOver, setDragOver] = useState(false)
    const classes = classNames('viking-uploader-dragger', { 'is-dragover': dragOver })
    const handleDrop =
        (e: DragEvent<HTMLElement>) => {
            if (count.current > 0) {
                e.preventDefault();
                setDragOver(false);
                onFile(e.dataTransfer.files)
            }
        }
    const handleOver = (e) => {
        e.preventDefault();

    }
    const handleEnter = useCallback(
        (e: DragEvent<HTMLElement>) => {
            count.current = count.current + 1
            console.log(count, 'enter')
            if (count.current > 0) {
                e.preventDefault();
                setDragOver(true);
            }
        },
        [count]
    )
    const handleLeave = useCallback(
        (e: DragEvent<HTMLElement>) => {
            count.current = count.current - 1
            console.log(count, 'leave')
            if (count.current <= 0) {
                e.preventDefault();
                setDragOver(false);
            }
        },
        [count]
    )
    return (
        <div
            className={classes}
            onDragOver={handleOver}
            onDragEnter={handleEnter}
            onDragLeave={handleLeave}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger;