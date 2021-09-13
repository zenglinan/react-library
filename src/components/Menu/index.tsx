import React, { FC, useState, createContext, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'
import { nanoid } from 'nanoid'

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultKey?: string;
  className?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  /**点击菜单项触发的回掉函数 */
  onSelect?: (selectedKey: string) => void;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  key?: string;
  onSelect?: (selecteKey: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ key: '0' })

export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultKey, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultKey)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (key: string) => {
    setActive(key)
    if (onSelect) {
      onSelect(key)
    }
  }
  const passedContext: IMenuContext = {
    key: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  //避免menu组件下面包含非menuItem组件
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { key: nanoid() })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
        return;
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultKey: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu;