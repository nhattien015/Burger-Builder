import { FC } from 'react';
import { useSpring, animated, SpringComponentProps, SpringProps } from 'react-spring';
interface Props{
    children: any,
    animateStyle: object 
}    

const AnimatedComponent : FC<Props> = ({children, animateStyle})=>{
    const styles = useSpring(animateStyle);
    return (
        <animated.div style={styles}>
            {children}
        </animated.div>
    )
}

export { AnimatedComponent };