import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from '../menu'

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
const MenuItem: React.FC<MenuItemProps> = props => {
    const { index: index, disabled, className, style, children } = props;
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index

    })
    const handleClick = () => {

        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
        console.log(44444, index)
        // console.log(context.index)
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>{children}</li>
    )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem