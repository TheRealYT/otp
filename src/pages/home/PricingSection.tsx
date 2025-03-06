import {Button} from '@/components/ui/button.tsx';
import {CheckIcon} from 'lucide-react';
import {Link} from 'react-router-dom';

const prices = [
    {
        title: 'Basic',
        btn: 'Sign Up Free',
        url: '/signup',
        features: [
            'Unlimited Requests',
            'Completely Free',
            'No Bot Creation',
            'Ready-to-Use API',
            'Usage Summary Graph',
        ],
    },
    {
        title: 'Custom',
        btn: 'Request',
        url: '#req',
        features: [
            'Self-Hosting',
            'Full Control',
            'Private & Secure',
            'Scalability',
            'Custom Features',
            'Dedicated Support',
        ],
    },
];

export default function PricingSection() {
    return (
        <section className="mt-12" id="pricing">
            <h1 className="mb-12 text-center font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Pricing Plans
            </h1>

            <div className="max-ld:justify-items-center max-ld:gap-y-12 max-ld:grid max-sm:grid-cols-1 max-ld:grid-cols-2 max-ld:gap-x-2 flex justify-center gap-x-12">
                <div className="max-sm:row-start-2 max-ld:my-auto max-sm:text-center text-right">
                    <h2 className="mb-2 font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        Basic Plan
                    </h2>
                    <p className="w-64">
                        The Basic Plan is like a free demo, but with no limits. You can just use our API docs for easy
                        integration. It’s completely free, and you get access to an interactive usage graph to track
                        your verification requests. Perfect if you need a quick and hassle-free solution!
                    </p>
                </div>

                {
                    prices.map((p) => (
                        <div key={p.title}
                             className="text-white flex flex-col h-96 w-64 bg-gradient-to-br from-blue-500 to-green-900 rounded-md p-4">

                            <h3 className="self-center font-bold">{p.title}</h3>

                            <ul className="p-4">
                                {
                                    p.features.map((f, i) => <li key={i} className="flex gap-x-2 mb-2"><CheckIcon/> {f}
                                    </li>)
                                }
                            </ul>

                            <div className="mt-auto">
                                <Button variant="secondary" className="w-full" asChild>
                                    <Link to={p.url}>{p.btn}</Link>
                                </Button>
                            </div>
                        </div>
                    ))
                }

                <div className="max-ld:my-auto max-sm:text-center">
                    <h2 className="mb-2 font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        Custom Plan
                    </h2>
                    <p className="w-64">The Custom Plan gives you full control over the verification process by
                        running Telegram’s API on your own server. We handle the setup, ensuring seamless integration,
                        better security, and scalability. Ideal for businesses that need private infrastructure, custom
                        features, and dedicated support.
                    </p>
                </div>
            </div>
        </section>
    );
}
