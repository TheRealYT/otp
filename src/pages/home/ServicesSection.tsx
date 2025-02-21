import {PhoneCallIcon, Plug2Icon, ServerCogIcon} from 'lucide-react';
import {FaTelegram} from 'react-icons/fa6';
import {Button} from '@/components/ui/button.tsx';
import {Link} from 'react-router-dom';

const services = [
    {
        title: 'Custom Integration',
        detail: 'While our platform is free, we offer custom integration services to set up Telegram’s API directly on your own server. This ensures a tailored, secure, and scalable solution that fits your infrastructure.',
        icon: Plug2Icon,
    },
    {
        title: 'Seamless Deployment',
        detail: 'No need to worry about the technical setup. Our team will handle everything, from API configuration to server optimization, so you can focus on running your business.',
        icon: ServerCogIcon,
    },
    {
        title: 'Get Expert Support',
        detail: 'Need help with implementation? Our experts provide guidance, best practices, and troubleshooting assistance to ensure smooth integration and hassle-free operation.',
        icon: PhoneCallIcon,
    },
];

export default function ServicesSection() {
    return (
        <section className="mt-12" id="api">
            <div className="flex justify-center mb-6">
                <FaTelegram className="size-12 text-blue-600"/>
            </div>

            <h1 className="text-2xl font-bold text-blue-600 text-center">Use Telegram for Verification for Free</h1>
            <p className="mt-2 text-gray-700 text-center mb-12 max-md:px-6">Leverage Telegram for phone verification at zero
                cost.</p>

            {
                services.map((s, i) => (
                    <div key={s.title} className="flex flex-col py-6">
                        <div
                            className={'mx-auto max-md:px-6 max-md:gap-y-6 max-md:flex-col max-md:items-center max-md:text-center flex justify-between gap-x-6' + (i % 2 == 1 ? ' flex-row-reverse md:text-right' : '')}>
                            <div className="max-md:w-32 max-md:h-32 w-72 h-48 bg-gradient-to-br from-blue-500 to-blue-900 rounded-md flex justify-center items-center">
                                <s.icon className="size-16 text-blue-200"/>
                            </div>

                            <div
                                className="max-md:w-full w-96 flex flex-col justify-around">
                                <h2 className="font-bold max-md:mb-2 text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">{s.title}</h2>
                                <p className="font-semibold">{s.detail}</p>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="flex justify-center p-6 gap-4">
                <Button variant='outline' asChild>
                    <Link to="/signup">Try for Free</Link>
                </Button>

                <Button asChild>
                    <Link to="#req">Request Integration</Link>
                </Button>
            </div>
        </section>
    );
}
