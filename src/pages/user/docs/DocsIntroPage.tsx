import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import Highlight from '@/pages/user/docs/Highlight.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Link} from 'react-router-dom';
import {ArrowRightCircle} from 'lucide-react';

const BOT_USERNAME = 'PhoneVerifierBot';
const BOT_LINK = `https://t.me/${BOT_USERNAME}`;

export default function DocsIntroPage() {
    useHeader('', ['Docs', 'Introduction']);

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="inline-flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                OTP API Documentation Introduction
            </h1>

            <p>Welcome to the OTP API documentation! To interact with the OTP (One-Time Password) API, you must include
                an Authorization header with a Bearer token in your requests. This token is required to authenticate and
                authorize your access to the API endpoints.</p>


            <p>
                <b>IMPORTANT</b>:
                Before using the OTP API, please ensure that your target user has an active Telegram account and has
                started the bot.

                To do this, provide your users with the following Telegram bot username and ask them to start the bot to
                establish the necessary connection for OTP generation and verification.

                Once they’ve started the bot, you can proceed with sending OTPs and verifying them seamlessly. Make sure
                to verify that the user has interacted with the bot to avoid errors in processing their requests.

                <br/>

                <Button variant="link" className="p-0 mr-2" asChild>
                    <a href={BOT_LINK} target="_blank">{BOT_LINK}</a>
                </Button>

                <Highlight value={<div className="text-sm py-2">Bot username: @<b>{BOT_USERNAME}</b></div>}/>
            </p>

            <br/>
            <p className="font-semibold">How to Obtain the Bearer Token:</p>
            <ol className="list-decimal pl-12">
                <li>Go to the API {'>'} API Keys page in your account.</li>
                <li>Generate a new API key (Bearer token).</li>
                <li>Copy the generated token and use it in the Authorization header of your requests.</li>
            </ol>

            <p>
                <Highlight value={`Authorization: Bearer <YOUR_TOKEN_HERE>`}/>
            </p>

            <br/>
            <p>
                All requests should include the necessary JSON body that contains the required parameters, depending on
                the OTP service you are using (e.g., sending an OTP, verifying an OTP). Ensure your request is formatted
                as application/json for compatibility.
                This API allows for secure OTP generation and verification to enhance authentication in your
                application. <br/><br/>Let’s get started!
            </p>

            <div className="flex-1">
                <Button variant="outline" asChild>
                    <Link to="../docs/errors"><ArrowRightCircle/> Checkout Error Responses</Link>
                </Button>
            </div>
        </section>
    );
}