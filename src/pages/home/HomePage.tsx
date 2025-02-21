import {FaTelegram} from 'react-icons/fa6';
import {Bot, CheckCircle2} from 'lucide-react';
import {motion, useTransform} from 'motion/react';
import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import FeaturesSection from '@/pages/home/FeaturesSection.tsx';
import ServicesSection from '@/pages/home/ServicesSection.tsx';
import useScrollProgress from '@/hooks/useScrollProgress.ts';
import PricingSection from '@/pages/home/PricingSection.tsx';
import HowSection from '@/pages/home/HowSection.tsx';
import TestimonySection from '@/pages/home/TestimonySection.tsx';
import ReqDialog from '@/pages/home/ReqDialog.tsx';
import LegalDialog from '@/pages/home/LegalDialog.tsx';

export default function HomePage() {
    const location = useLocation();
    const lastHash = useRef('');
    const ref = useRef(null);
    const scrollYProgress = useScrollProgress(ref);
    const value = useTransform(scrollYProgress, [1, 0], ['0%', '100%']);
    const margin = useTransform(scrollYProgress, [1, 0], [0, 400]);
    const margin2 = useTransform(scrollYProgress, [1, 0], [0, 100]);

    useEffect(() => {
        if (location.hash)
            lastHash.current = location.hash.slice(1);

        const elem = document.getElementById(lastHash.current);
        if (lastHash.current && elem) {
            setTimeout(() => {
                const rect = elem.getBoundingClientRect();
                scrollBy({top: rect.y - (lastHash.current == 'product' ? 6 : 100), behavior: 'smooth'});
                lastHash.current = '';
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        return scrollYProgress.on('change', (val) => {
            const nav = document.querySelector('nav');
            if (!nav)
                return;

            if (val == 0) {
                nav.classList.add('nav-on');
            } else {
                nav.classList.remove('nav-on');
            }
        });
    }, [scrollYProgress]);

    return (
        <>
            <ReqDialog/>
            <LegalDialog/>
            <section ref={ref}
                     className="h-screen min-h-[520px] flex flex-col items-center justify-center gap-y-6 relative overflow-hidden">
                <h1 className="font-extrabold max-sm:text-2xl max-md:text-3xl text-4xl lg:text-5xl">
                        <span
                            className="font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent shadow-md border rounded-full p-2">Unlimited</span> Phone
                    Number
                </h1>
                <h2 className="font-extrabold max-sm:text-2xl max-md:text-3xl text-4xl lg:text-5xl">
                    Verification
                </h2>
                <h3 className="font-extrabold max-sm:text-2xl max-md:text-3xl text-4xl lg:text-5xl">
                    Made Easy
                </h3>

                <motion.div
                    style={{marginBottom: margin}}
                    className="max-sm:scale-75 backdrop-blur-md rotate-[-10deg] bottom-20 left-[20%] absolute rounded-full border-[1px] shadow-md p-4 gap-4 flex justify-center items-center">
                    <Bot className="size-12 text-blue-600"/>
                    <p><span
                        className="font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">/start</span> the
                        bot</p>
                    <p className="absolute -top-4 size-8 flex items-center justify-center bg-background border rounded-full">1</p>
                </motion.div>

                <motion.div
                    style={{marginBottom: margin}}
                    className="max-sm:scale-50 mb-96 backdrop-blur-md rotate-[10deg] max-sm:top-32 max-ld:right-0 right-32 absolute rounded-full border-[1px] shadow-md p-4 gap-4 flex justify-center items-center">
                    <FaTelegram className="size-12 text-blue-600"/>
                    <p>Your OTP code is 632584</p>
                    <p className="absolute -top-4 size-8 flex items-center justify-center bg-background border rounded-full">2</p>
                </motion.div>

                <motion.div
                    style={{marginTop: margin2}}
                    className="max-sm:scale-50 backdrop-blur-md rotate-[-10deg] top-10 max-sm:top-14 max-sm:left-2 left-32 absolute rounded-full border-[1px] shadow-md p-4 gap-4 flex justify-center items-center">
                    <CheckCircle2 className="size-8 text-green-500"/>
                    <p>Phone Number Verified</p>
                    <p className="absolute -bottom-4 size-8 flex items-center justify-center bg-background border rounded-full">3</p>
                </motion.div>

                <div className="-z-10 backdrop-blur-[100px] absolute left-0 top-0 w-full h-full"/>
                <div className="-z-10 grid grid-cols-12 absolute top-0 left-0 size-full opacity-10 bg-pattern"/>
                <div className="-z-10 backdrop-blur-[4px] absolute left-0 top-0 w-full h-full"/>
                <div className="-z-20 absolute size-64 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"/>
            </section>

            <div className="h-1 relative overflow-hidden">
                <div className="-z-10 backdrop-blur-[100px] absolute left-0 top-0 w-full h-full"/>
                <motion.div style={{left: value}}
                            className="-z-20 absolute max-md:size-16 max-md:-top-8 size-64 -top-32 bg-gradient-to-r from-green-500 to-blue-500 bg-opacity-80 rounded-full"/>
            </div>

            <FeaturesSection/>

            <ServicesSection/>

            <PricingSection/>

            <HowSection/>

            <TestimonySection/>
        </>
    );
}