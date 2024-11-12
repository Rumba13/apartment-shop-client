import './styles.scss';
import clsx from 'clsx';
import {CSSProperties} from "react";

type PropsType = {
    className?: string;
    icon: any;
    asImage?: boolean;
    style?: CSSProperties
};

export function SvgIcon({icon, className, asImage = false, style}: PropsType) {
    if (asImage) {
        return (
            <img
                className={clsx('svg-icon', className)}
                src={icon}
                style={{backgroundColor: 'transparent', ...style}}
                alt=""
            />
        );
    }

    return (
        <div
            className={clsx('svg-icon', className)}
            style={{
                backgroundColor: "currentcolor",
                maskImage: `url(${icon})`,
                WebkitMaskImage: `url(${icon})`, ...style
            }}
        />
    );
}
