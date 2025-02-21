import {EMAIL} from '@/constants.ts';

export default function PrivacyPolicy() {
    return (
        <div>
            <p>
                Welcome to <strong>Verify</strong>. Your privacy is important to us. This policy explains
                how we collect, use, and protect your data.
            </p>

            <h3 className="font-semibold mt-4">1. Information We Collect</h3>
            <ul className="list-disc pl-5">
                <li>Personal details (e.g., email, phone number).</li>
            </ul>

            <h3 className="font-semibold mt-4">2. How We Use Your Data</h3>
            <ul className="list-disc pl-5">
                <li>To provide and maintain our service.</li>
                <li>To improve user experience and security.</li>
                <li>To communicate updates and support.</li>
            </ul>

            <h3 className="font-semibold mt-4">3. Security Measures</h3>
            <p>We implement security protocols to protect your data but cannot guarantee 100% security.</p>

            <h3 className="font-semibold mt-4">4. Contact</h3>
            <p>Email us at <a href={`mailto:${EMAIL}`} className="text-blue-500">{EMAIL}</a> for any
                questions.</p>
        </div>
    );
}