import {useState, useEffect, ReactNode} from 'react';
import {cn} from '@/lib/utils.ts';

export default function InfiniteScrolling({items, className, time, visibleItems, reverse = false}: {
    items: ReactNode[],
    className?: string,
    time: string,
    visibleItems: number | ((items: number) => number)
    reverse?: boolean
}) {
    const [itemWidth, setItemWidth] = useState(0);

    useEffect(() => {
        const calculate = () => {
            const screenWidth = window.innerWidth;
            const number = typeof visibleItems == 'function' ? visibleItems(screenWidth) : visibleItems;
            const newItemWidth = screenWidth / number;

            setItemWidth(newItemWidth);
        };

        calculate();

        window.addEventListener('resize', calculate);
        return () => window.removeEventListener('resize', calculate);
    }, [visibleItems]);

    return (
        <div className="overflow-hidden relative">
            <div
                style={{animationDuration: time}}
                className={cn('infinite-scroller flex w-max', reverse ? 'move-left' : 'move-right', className)}>

                {items.map((item, index) => (
                    <div
                        key={index}
                        className="inline-block"
                        style={{width: `${itemWidth}px`}}
                    >
                        <div>
                            {item}
                        </div>
                    </div>
                ))}

                {items.map((item, index) => (
                    <div
                        key={`duplicate-${index}`}
                        className="inline-block"
                        style={{width: `${itemWidth}px`}}
                    >
                        <div>
                            {item}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
