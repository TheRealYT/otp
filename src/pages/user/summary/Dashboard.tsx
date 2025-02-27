import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import OtpPieChart from '@/pages/user/summary/OtpPieChart.tsx';
import OtpLineChart from '@/pages/user/summary/OtpLineChart.tsx';
import OtpAreaChart from '@/pages/user/summary/OtpAreaChart.tsx';
import {useAuthStore} from '@/store/auth.ts';
import useTitle from '@/hooks/useTitle.ts';

export default function Dashboard() {
    const {user} = useAuthStore();
    useTitle(`${user?.name} - ${user?.email} - Usage Overview`);
    useHeader('Overview');

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                <OtpPieChart/>
                <OtpLineChart title="Success rate" info="Verified OTPs per total requests"/>
                <OtpLineChart failRate title="Failure rate" info="Failed OTPs per total requests"/>
            </div>

            <OtpAreaChart/>
        </section>
    );
}