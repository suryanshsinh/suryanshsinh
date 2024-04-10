import {useEffect, useRef} from 'react';

export default function Cursor({cursor, mouseOver, mouseOut}) {
    const cursorVisible = useRef(true);

    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', mouseOver);
        document.addEventListener('mouseup', mouseOut);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseenter', mouseEnter);
        document.addEventListener('mouseleave', mouseLeave);

        animate();

        return () => {
            document.removeEventListener('mousedown', mouseOver);
            document.removeEventListener('mouseup', mouseOut);
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseenter', mouseEnter);
            document.removeEventListener('mouseleave', mouseLeave);
            cancelAnimationFrame(requestRef.current);
        };
    })

    const toggleVisibility = () => {
        if (cursorVisible.current) {
            cursor.current.style.opacity = 1;
        } else {
            cursor.current.style.opacity = 0;
        }
    }
    
    const mouseEnter = () => {
        cursorVisible.current = true;
        toggleVisibility();
    };
    
    const mouseLeave = () => {
        cursorVisible.current = false;
        toggleVisibility();
    };

    const mouseMove = (e) => {
        cursorVisible.current = true;
        toggleVisibility();

        endX.current = e.pageX;
        endY.current = e.pageY;
    
        cursor.current.style.top = endY.current + 'px';
        cursor.current.style.left = endX.current + 'px';
    }

    const animate = () => {
        _x.current += (endX.current - _x.current) / 5;
        _y.current += (endY.current - _y.current) / 5;
    
        cursor.current.style.top = _y.current + 'px';
        cursor.current.style.left = _x.current + 'px';
    
        requestRef.current = requestAnimationFrame(animate);
    };

    return (
        <div ref={cursor} className="cursor"></div>
    )
}