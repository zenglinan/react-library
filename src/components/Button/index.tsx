import classNames from 'classnames'
import React from 'react'
import "./_style.scss"
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

//把原先标签上可以添加的props都给集合在一起，包括自己定义的和系统定义的
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
    const { btnType, disabled, size, children, href, className, ...restProps } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a href={href} className={classes} {...restProps}>{children}</a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
}

export default Button
