import {useState, useEffect, ReactNode} from 'react';

export default function InfiniteScrolling({items, time, visibleItems, reverse = false}: {
    items: ReactNode[],
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
                className={'flex w-max hover:paused ' + (reverse ? 'move-left' : 'move-right')}>

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
