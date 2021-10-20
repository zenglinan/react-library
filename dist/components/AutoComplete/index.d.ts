import { ReactElement } from "react";
import { InputProps } from '../Input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps<T> extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>;
    onSelect?: (item: DataSourceType<T>) => void;
    renderOption?: (item: DataSourceType<T>) => ReactElement;
}
declare function AutoComplete<T>(props: AutoCompleteProps<T>): JSX.Element;
export default AutoComplete;
