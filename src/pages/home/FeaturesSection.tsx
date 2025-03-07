import {BadgeDollarSign, CodeIcon, GlobeIcon, InfinityIcon, ShieldCheckIcon, ZapIcon} from 'lucide-react';
import {useEffect, useRef} from 'react';

const features = [
    {
        title: 'Unlimited Verifications',
        detail: 'No restrictions on the number of verifications, allowing seamless authentication for any number of users.',
        icon: InfinityIcon,
    },
    {
        title: 'Zero Cost',
        detail: 'Completely free to use, eliminating the need for costly SMS-based verification services.',
        icon: BadgeDollarSign,
    },
    {
        title: 'Fast & Reliable',
        detail: 'Delivers verification codes instantly with no delays, ensuring a smooth user experience.',
        icon: ZapIcon,
    },
    {
        title: 'Secure',
        detail: 'Uses Telegram’s encrypted infrastructure, making verification safer and more private.',
        icon: ShieldCheckIcon,
    },
    {
        title: 'Global Access',
        detail: 'Works in any country where Telegram is available, supporting international users effortlessly.',
        icon: GlobeIcon,
    },
    {
        title: 'Easy Integration',
        detail: 'Simple API calls allow quick and hassle-free implementation into any system.',
        icon: CodeIcon,
    },
];

export default function FeaturesSection() {
    const elem = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: MouseEvent) => {
        if (!elem.current)
            return;

        elem.current.style.left = (e.clientX - 64) + 'px';
        elem.current.style.top = (e.clientY - 128) + 'px';
    };

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);

        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <section id="product"
                 className="min-h-screen grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 relative gap-1 overflow-hidden p-1">
            <div className="-z-10 backdrop-blur-[100px] absolute left-0 top-0 size-full"/>
            <div ref={elem}
                 className="-z-20 absolute top-[calc(50%-4rem)] size-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"/>

            {
                features.map(f => (
                    <div key={f.title}
                         className="min-h-64 border-green-500 border-opacity-30 rounded-md group bg-background relative flex flex-col justify-center items-center text-center">
                        <div
                            className="group-hover:absolute group-hover:z-10 flex flex-col justify-center items-center gap-y-2">
                            <f.icon className="size-12 text-blue-500 group-hover:size-32 group-hover:opacity-10"/>
                            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">{f.title}</h1>
                        </div>

                        <div className="absolute left-0 top-0 size-full flex items-center justify-center">
                            <p className="px-2 z-10 opacity-0 group-hover:opacity-100 font-semibold transition-[opacity]">
                                {f.detail}
                            </p>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}