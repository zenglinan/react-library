import React, { useState, useCallback, useRef } from "react";
import classNames from 'classnames';
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var count = useRef(0);
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames('viking-uploader-dragger', { 'is-dragover': dragOver });
    var handleDrop = function (e) {
        if (count.current > 0) {
            e.preventDefault();
            setDragOver(false);
            onFile(e.dataTransfer.files);
        }
    };
    var handleOver = function (e) {
        e.preventDefault();
    };
    var handleEnter = useCallback(function (e) {
        count.current = count.current + 1;
        console.log(count, 'enter');
        if (count.current > 0) {
            e.preventDefault();
            setDragOver(true);
        }
    }, [count]);
    var handleLeave = useCallback(function (e) {
        count.current = count.current - 1;
        console.log(count, 'leave');
        if (count.current <= 0) {
            e.preventDefault();
            setDragOver(false);
        }
    }, [count]);
    return (React.createElement("div", { className: classes, onDragOver: handleOver, onDragEnter: handleEnter, onDragLeave: handleLeave, onDrop: handleDrop }, children));
};
export default Dragger;
