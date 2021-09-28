import React from 'react'
import AutoComplete, { DataSourceType } from './index'

interface LakerPlayerProps {
    value: string;
    number: number;
}
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const SimpleComplete = () => {
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    //     'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const lakersWithNumber = [
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
    ]
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query))
    // }适用于结构简单的lakers

    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query))
    // }适用于多级结构的laker

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                console.log(items)
                if (items) {
                    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
                } else {
                    return [];
                }
            })
    }
    //异步返回数据

    // const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    //     return (
    //         <>
    //             <h2>Name: {item.value}</h2>
    //             <p>Number:{item.number}</p>
    //         </>
    //     )
    // }

    const renderOption = (item: DataSourceType<GithubUserProps>) => {
        return (
            <>
                <h2>Name: {item.login}</h2>
                <p>url:{item.url}</p>
            </>
        )
    }
    return (
        <AutoComplete<GithubUserProps>
            fetchSuggestions={handleFetch}
            renderOption={renderOption}
            style={{ width: '500px' }}
        />
    )
}
export default SimpleComplete
