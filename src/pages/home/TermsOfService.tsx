import {EMAIL} from '@/constants.ts';

export default function TermsOfService() {
    return (
        <div>
            <p>By using <strong>Verify</strong>, you agree to the following terms and conditions.</p>

            <h3 className="font-semibold mt-4">1. Use of Service</h3>
            <ul className="list-disc pl-5">
                <li>You must comply with applicable laws.</li>
                <li>Do not use our service for illegal activities.</li>
            </ul>

            <h3 className="font-semibold mt-4">2. Account Responsibilities</h3>
            <ul className="list-disc pl-5">
                <li>You are responsible for maintaining account security.</li>
                <li>We reserve the right to suspend accounts violating policies.</li>
            </ul>

            <h3 className="font-semibold mt-4">3. Limitation of Liability</h3>
            <p>We are not liable for any damages resulting from service use.</p>

            <h3 className="font-semibold mt-4">4. Contact</h3>
            <p>Email us at <a href={`mailto:${EMAIL}`} className="text-blue-500">{EMAIL}</a> for any concerns.</p>
        </div>
    );
}
