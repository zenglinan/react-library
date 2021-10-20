var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Input from '../Input';
import Icon from '../Icon';
import Transition from '../Transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
function AutoComplete(props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), sugestions = _b[0], setSugestions = _b[1];
    var _c = useState(false), isLoading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var conmonentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 500);
    useClickOutside(conmonentRef, function () { setSugestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                console.log('jjjj');
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSugestions(data);
                });
            }
            else {
                setSugestions(results);
            }
        }
        else {
            setSugestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var handleChange = function (e) {
        triggerSearch.current = true;
        var value = e.target.value.trim();
        setInputValue(value);
    };
    var handleSelect = function (item) {
        triggerSearch.current = false;
        setInputValue(item.value);
        setSugestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var hightlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= sugestions.length) {
            index = sugestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.code) {
            case 'Enter':
                if (sugestions[highlightIndex]) {
                    handleSelect(sugestions[highlightIndex]);
                }
                break;
            case 'ArrowUp':
                hightlight(highlightIndex - 1);
                break;
            case 'Escape':
                setSugestions([]);
                break;
            case 'ArrowDown':
                hightlight(highlightIndex + 1);
                break;
            default:
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { wrapper: false, in: triggerSearch.current, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", null, sugestions.map(function (item, index) {
                var cnames = classNames('suggestion-item', {
                    'item-highlighted': index === highlightIndex
                });
                return (React.createElement("li", { key: index, onClick: function () { handleSelect(item); } }, renderTemplate(item)));
            }))));
    };
    return (React.createElement("div", { className: 'viking-auto-complete', ref: conmonentRef },
        React.createElement(Input, __assign({ value: inputValue, onKeyDown: handleKeyDown, onChange: handleChange }, restProps)),
        (isLoading && React.createElement(Icon, { icon: 'spinner', spin: true })),
        (sugestions.length > 0) && generateDropdown()));
}
export default AutoComplete;
