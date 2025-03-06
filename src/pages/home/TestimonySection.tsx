import InfiniteScrolling from '@/pages/home/InfiniteScrolling.tsx';

const testimonials = [
    {
        name: 'Alex R., Startup Founder',
        content: 'Setting up phone verification with Verify was incredibly easy. Their API worked flawlessly, and the documentation made integration smooth. Highly recommended!',
    },
    {
        name: 'Maria K., SaaS Product Manager',
        content: 'We switched to Verify for phone verification, and it has saved us a ton in SMS costs. The free API is a game-changer!',
    },
    {
        name: 'Daniel T., FinTech Developer',
        content: 'Our user verification process is now instant and secure. No more SMS delays or failed verifications. Verify just works!',
    },
    {
        name: 'Emma L., CTO at SecureAuth',
        content: 'We needed self-hosted verification, and Verify’s team handled everything. Now we have full control over our setup!',
    },
    {
        name: 'James W., Lead Engineer at GrowthTech',
        content: 'The API is super flexible and scales effortlessly. The best solution for businesses handling high verification traffic!',
    },
];

const items = testimonials.map(t => (
    <div className="flex flex-col justify-center items-center text-center border h-48 gap-y-4">
        <q className="px-4 italic">{t.content}</q>
        <p>{t.name}</p>
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
                <InfiniteScrolling className="group-hover:paused" items={items} visibleItems={visibleItems} time="60s"/>
            </div>

            <div className="relative group">
                <Shadow/>

                <div className="-z-10 backdrop-blur-[4px] absolute size-full left-0 top-0"/>
                <div className="-z-20 bg-pattern opacity-10 absolute size-full left-0 top-0"/>
                <InfiniteScrolling className="group-hover:paused" items={items} visibleItems={visibleItems} time="60s"
                                   reverse={true}/>
            </div>
        </section>
    );
}
