import React, {useCallback, useEffect} from 'react';
import {useMotionValue} from 'framer-motion';

const useScrollProgress = (targetRef: React.RefObject<HTMLElement | null>) => {
    const scrollProgress = useMotionValue(1);

    const handleProgress = useCallback(() => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const elementTop = Math.abs(rect.top);
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            let progress;
            if (elementTop <= 0 && elementTop + elementHeight >= viewportHeight)
                progress = 1;
            else if (elementTop < viewportHeight && elementTop + elementHeight > 0)
                progress = Math.max(0, Math.min(1, ((viewportHeight - elementTop) / elementHeight)));
            else
                progress = 0;

            scrollProgress.set(progress);
        }
    }, [scrollProgress, targetRef]);

    useEffect(() => {
        window.addEventListener('scroll', handleProgress);

        const timeout = setTimeout(handleProgress, 1000);

        return () => {
            clearInterval(timeout);
            window.removeEventListener('scroll', handleProgress);
        };
    }, [handleProgress]);

    return scrollProgress;
};

export default useScrollProgress;