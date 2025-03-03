import {ArrowUpRight} from 'lucide-react';
import {Separator} from '@/components/ui/separator.tsx';
import {Button} from '@/components/ui/button.tsx';
import {FaTelegram, FaXTwitter} from 'react-icons/fa6';
import {Link} from 'react-router-dom';
import {COMPANY, EMAIL} from '@/constants.ts';

const social = [
    {
        name: 'Telegram',
        icon: FaTelegram,
        link: 'https://t.me/ytDevelopment',
    },
    {
        name: 'X.com',
        icon: FaXTwitter,
        link: 'https://x.com/Yonathan0x7',
    },
];

export default function Footer() {
    return (
        <footer className="mt-12 border-t max-md:px-6 p-24 pb-6">
            <div className="grid max-md:grid-cols-1 grid-cols-2">
                <div className="flex flex-col justify-between max-md:gap-y-4">
                    <h1 className="font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        Empowering seamless verification,
                        <br/>
                        <span className="text-foreground">built for efficiency</span>
                    </h1>

                    <div className="flex items-center gap-x-2">
                        <img src="/logo.svg" className="size-6" alt="Verify Logo"/>
                        <p
                            className="font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                            {COMPANY}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col max-md:flex-row max-md:justify-between items-end max-md:mt-8 gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <div className="text-right max-md:text-left">
                            <p>Have questions or ideas?</p>
                            <p>We'd love to hear from you!</p>
                        </div>
                        <Button variant="outline" asChild>
                            <a href={`mailto:${EMAIL}`}>Get In Touch <ArrowUpRight/></a>
                        </Button>
                    </div>

                    <div className="flex gap-x-2 mt-auto">
                        {
                            social.map(s => (
                                <Button key={s.name} size="icon" variant="outline" className="rounded-full" asChild>
                                    <a href={s.link} title={s.name} target="_blank">
                                        <s.icon/>
                                    </a>
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <Separator className="my-6 max-md"/>

            <div className="max-md:flex-col-reverse max-md:gap-y-6 flex items-center justify-between">
                <p>&copy; {COMPANY}</p>

                <div>
                    <Button variant="ghost" asChild>
                        <Link to="#tos">Terms of Service</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="#pp">Privacy Policy</Link>
                    </Button>
                </div>
            </div>
        </footer>
    );
}