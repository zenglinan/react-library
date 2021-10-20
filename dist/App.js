import React, { useState } from 'react';
import Button from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon';
import Test from './components/Test';
import Transition from './components/Transition';
import Input from './components/Input';
import SimpleComplete from './components/AutoComplete/test';
var App = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(''), title = _b[0], setTitle = _b[1];
    return (React.createElement("div", { className: "App" },
        React.createElement(Test, null),
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: 'coffee', theme: 'danger' }),
            React.createElement(Menu, null,
                React.createElement(MenuItem, null, "5555"),
                React.createElement(SubMenu, { title: 'hh' },
                    React.createElement(MenuItem, null, "link1"),
                    React.createElement(MenuItem, null, "link2"),
                    React.createElement(MenuItem, null, "link3")),
                React.createElement(MenuItem, null, "hhhhh"),
                React.createElement(MenuItem, null, "22222")),
            React.createElement(Button, { size: 'lg', onClick: function () { setShow(!show); } }, "Toggle"),
            React.createElement(Transition, { wrapper: false, in: show, timeout: 300, animation: 'zoom-in-top' },
                React.createElement("div", null,
                    React.createElement(Button, { disabled: true }, "Disabled Button"),
                    React.createElement(Button, { btnType: 'primary', size: 'lg' }, "Large Primary"),
                    React.createElement(Button, { btnType: 'danger', size: 'sm' }, "Small Danger"),
                    React.createElement(Button, { btnType: 'link', href: 'http://www.baidu.com' }, "Baidu Link"),
                    React.createElement(Button, { btnType: 'link', disabled: true, href: 'http://www.baidu.com' }, "Baidu Link"),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload"),
                    React.createElement(Button, { btnType: 'primary', size: 'lg' }, "Large Primary"))),
            React.createElement(Input, { placeholder: '\u8BF7\u8F93\u5165\u5185\u5BB9', icon: 'search', defaultValue: 'google', prepend: 'http://', style: { width: '300px', } }),
            React.createElement(SimpleComplete, null))));
};
export default App;
