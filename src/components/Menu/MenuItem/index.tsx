import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from '../index'

export interface MenuItemProps {
    key?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
const MenuItem: React.FC<MenuItemProps> = props => {
    const { key, disabled, className, style, children } = props;
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.key === key

    })
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof key === 'string')) {
            context.onSelect(key);
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>{children}</li>
    )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem