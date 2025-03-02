import InfiniteScrolling from '@/pages/home/InfiniteScrolling.tsx';

const testimonials = [
    {
        name: 'John',
        content: 'Lorem ipsum dolor sit amet',
    },
    {
        name: 'Doe',
        content: 'Lorem ipsum dolor sit amet',
    },
    {
        name: 'Jane',
        content: 'Lorem ipsum dolor sit amet',
    },
    {
        name: 'Tom',
        content: 'Lorem ipsum dolor sit amet',
    },
    {
        name: 'Tim',
        content: 'Lorem ipsum dolor sit amet',
    },
];

const items = testimonials.map(t => (
    <div className="flex flex-col justify-center items-center border h-48">
        <p>{t.name}</p>
        <p>{t.content}</p>
    </div>
));

const visibleItems = (w: number) => w / 400;

function Shadow() {
    return <>
        <div
            className="z-10 absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-[hsl(var(--background))] to-transparent"/>
        <div
            className="z-10 absolute right-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent to-white dark:to-[hsl(var(--background))]"/>
    </>;
}

export default function TestimonySection() {
    return (
        <section className="mt-12 pb-12">
            <h1 className="mb-12 text-center font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Testimonials
            </h1>

            <div className="relative group">
                <Shadow/>

                <div className="-z-10 backdrop-blur-[4px] absolute size-full left-0 top-0"/>
                <div className="-z-20 bg-pattern opacity-10 absolute size-full left-0 top-0"/>
                <InfiniteScrolling className="group-hover:paused" items={items} visibleItems={visibleItems} time="30s"/>
            </div>

            <div className="relative group">
                <Shadow/>

                <div className="-z-10 backdrop-blur-[4px] absolute size-full left-0 top-0"/>
                <div className="-z-20 bg-pattern opacity-10 absolute size-full left-0 top-0"/>
                <InfiniteScrolling className="group-hover:paused" items={items} visibleItems={visibleItems} time="30s" reverse={true}/>
            </div>
        </section>
    );
}
