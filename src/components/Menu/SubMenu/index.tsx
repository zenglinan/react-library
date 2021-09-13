import React, { useContext, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from '../index'
import { MenuItemProps } from "../MenuItem";
import { nanoid } from "nanoid";

export interface SubMenuProps {
    key?: string;
    title: string;
    className?: string;
}
const SubMenu: React.FC<SubMenuProps> = props => {
    const context = useContext(MenuContext)
    const { key, title, children, className } = props;
    const openSubmenu = context.defaultOpenSubMenus as Array<string>
    const isSubMenuOpen = (key && context.mode === 'vertical') ? openSubmenu.includes(key) : false
    const [isOpen, setIsOpen] = useState(isSubMenuOpen)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.key === key,
    })

    const handleClick = e => {
        e.stopPropagation()
        e.preventDefault()
        setIsOpen(!isOpen)
        if (context.onSelect && (typeof key === 'string')) {
            context.onSelect(key);
        }
    }
    const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
    let timer;
    const handleMouse = (toggle: boolean) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setIsOpen(toggle)
        }, 300)
    }
    const mouseEvents = context.mode !== 'vertical' ? {
        onMouseEnter: () => { handleMouse(true) },
        onMouseLeave: () => { handleMouse(false) }
    } : {};
    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, child => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { key: nanoid() })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
                return;
            }
        })
        const classes = classNames('viking-submenu', { 'menu-opened': isOpen })
        return (
            <ul className={classes}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={key} className={classes} {...mouseEvents} >
            <div className='submenu-title' {...clickEvents} >
                {title}
            </div>
            {renderChildren()}
        </li>
    )

}
SubMenu.displayName = 'SubMenu'
export default SubMenu



// JSX 的本质
// JSX => babel 转义成 React.createElement => 生成虚拟DOM => render 方法将虚拟DOM映射成真实DOM