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
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from '../menu';
import Icon from "../../Icon";
import Transition from '../../Transition';
var SubMenu = function (props) {
    var context = useContext(MenuContext);
    var index = props.index, title = props.title, children = props.children, className = props.className;
    var openSubmenu = context.defaultOpenSubMenus;
    var isSubMenuOpen = (index && context.mode === 'vertical') ? openSubmenu.includes(index) : false;
    var _a = useState(isSubMenuOpen), isOpen = _a[0], setIsOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': isOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.stopPropagation();
        e.preventDefault();
        setIsOpen(!isOpen);
        if (context.onSelect && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    var clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
    var timer;
    var handleMouse = function (toggle) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            setIsOpen(toggle);
        }, 300);
    };
    var mouseEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function () { handleMouse(true); },
        onMouseLeave: function () { handleMouse(false); }
    } : {};
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index + "-" + i });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
                return;
            }
        });
        var classes = classNames('viking-submenu', {
            'menu-opened': isOpen,
        });
        return (React.createElement(Transition, { wrapper: false, in: isOpen, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: classes }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, mouseEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
// JSX 的本质
// JSX => babel 转义成 React.createElement => 生成虚拟DOM => render 方法将虚拟DOM映射成真实DOM
