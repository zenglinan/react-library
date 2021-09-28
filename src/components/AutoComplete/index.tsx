import React, { FC, useState, useEffect, ChangeEvent, ReactElement, KeyboardEvent, useRef } from "react";
import classNames from "classnames";
import Input, { InputProps } from '../Input'
import Icon from '../Icon'
import Transition from '../Transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
    value: string;

}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps<T> extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>;
    onSelect?: (item: DataSourceType<T>) => void;
    renderOption?: (item: DataSourceType<T>) => ReactElement

}

function AutoComplete<T>(props: AutoCompleteProps<T>) {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
    const [inputValue, setInputValue] = useState(value);
    const [sugestions, setSugestions] = useState<DataSourceType<T>[]>([])
    const [isLoading, setLoading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false);
    const conmonentRef = useRef<HTMLDivElement>(null)
    const debouncedValue = useDebounce(inputValue, 500)

    useClickOutside(conmonentRef, () => { setSugestions([]) })
    useEffect(() => {
        if (debouncedValue && triggerSearch) {
            const results = fetchSuggestions(debouncedValue as string)
            if (results instanceof Promise) {
                console.log('jjjj')
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSugestions(data)
                })
            } else {
                setSugestions(results)
            }
        } else {
            setSugestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        triggerSearch.current = true;
        const value = e.target.value.trim()
        setInputValue(value)
    }
    const handleSelect = (item: DataSourceType<T>) => {
        triggerSearch.current = false;
        setInputValue(item.value)
        setSugestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const hightlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= sugestions.length) {
            index = sugestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.code) {
            case 'Enter':
                if (sugestions[highlightIndex]) {
                    handleSelect(sugestions[highlightIndex])
                }
                break
            case 'ArrowUp':
                hightlight(highlightIndex - 1)
                break
            case 'Escape':
                setSugestions([])
                break
            case 'ArrowDown':
                hightlight(highlightIndex + 1)
                break
            default:
                break
        }
    }
    const renderTemplate = (item: DataSourceType<T>) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <Transition wrapper={false} in={triggerSearch.current} timeout={300} animation='zoom-in-top'>
                <ul>
                    {
                        sugestions.map((item, index) => {
                            const cnames = classNames('suggestion-item', {
                                'item-highlighted': index === highlightIndex
                            })
                            return (
                                <li key={index} onClick={() => { handleSelect(item) }}>
                                    {renderTemplate(item)}
                                </li>
                            )
                        })
                    }
                </ul>
            </Transition>
        )
    }
    return (
        <div className='viking-auto-complete' ref={conmonentRef}>
            <Input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} {...restProps} />
            {
                (isLoading && <Icon icon='spinner' spin />)
            }
            {
                (sugestions.length > 0) && generateDropdown()
            }
        </div >
    )

}
export default AutoComplete
