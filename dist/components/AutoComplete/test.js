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
import React from 'react';
import AutoComplete from './index';
var SimpleComplete = function () {
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    //     'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    var lakersWithNumber = [
        { value: 'bradley', number: 11 },
        { value: 'pope', number: 1 },
        { value: 'caruso', number: 4 },
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 14 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 },
    ];
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query))
    // }适用于结构简单的lakers
    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query))
    // }适用于多级结构的laker
    var handleFetch = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query)
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var items = _a.items;
            console.log(items);
            if (items) {
                return items.slice(0, 10).map(function (item) { return (__assign({ value: item.login }, item)); });
            }
            else {
                return [];
            }
        });
    };
    //异步返回数据
    // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    //     return (
    //         <>
    //             <h2>Name: {item.value}</h2>
    //             <p>Number:{item.number}</p>
    //         </>
    //     )
    // }
    var renderOption = function (item) {
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null,
                "Name: ",
                item.login),
            React.createElement("p", null,
                "url:",
                item.url)));
    };
    return (React.createElement(AutoComplete, { fetchSuggestions: handleFetch, renderOption: renderOption, style: { width: '500px' } }));
};
export default SimpleComplete;
