import React, { useContext, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from '../menu'
import { MenuItemProps } from "../MenuItem";
import Icon from "../../Icon";
import Transition from '../../Transition'


export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}
const SubMenu: React.FC<SubMenuProps> = props => {
    const context = useContext(MenuContext)
    const { index, title, children, className } = props;
    const openSubmenu = context.defaultOpenSubMenus as Array<string>
    const isSubMenuOpen = (index && context.mode === 'vertical') ? openSubmenu.includes(index) : false

    const [isOpen, setIsOpen] = useState(isSubMenuOpen)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': isOpen,
        'is-vertical': context.mode === 'vertical'
    })

    const handleClick = e => {
        e.stopPropagation()
        e.preventDefault()
        setIsOpen(!isOpen)

        if (context.onSelect && (typeof index === 'string')) {
            context.onSelect(index);
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
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: `${index}-${i}` })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
                return;
            }
        })
        const classes = classNames('viking-submenu', {
            'menu-opened': isOpen,
        })
        return (
            <Transition wrapper={false} in={isOpen} timeout={300} animation='zoom-in-top'>
                <ul className={classes}>
                    {childrenComponent}
                </ul>
            </Transition>

        )
    }
    return (
        <li key={index} className={classes} {...mouseEvents} >
            <div className='submenu-title' {...clickEvents} >
                {title}
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            {renderChildren()}
        </li>
    )

}
SubMenu.displayName = 'SubMenu'
export default SubMenu



// JSX 的本质
// JSX => babel 转义成 React.createElement => 生成虚拟DOM => render 方法将虚拟DOM映射成真实DOM