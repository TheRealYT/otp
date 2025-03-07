'use client';

import {useMemo, useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Loader2, RefreshCcw} from 'lucide-react';
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {DatePicker} from '@/components/ui/datepicker.tsx';
import {fetchDailySummary} from '@/lib/api.ts';
import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

import {getErrorMessage} from '@/lib/error.ts';

const chartConfig = {
    failed: {
        label: 'Failed',
        color: 'hsl(var(--chart-1))',
    },
    verified: {
        label: 'Verified',
        color: 'hsl(var(--chart-2))',
    },
    pending: {
        label: 'Pending',
        color: 'hsl(var(--chart-3))',
    },
    total: {
        label: 'Total',
        color: 'hsl(var(--chart-4))',
    },
} satisfies ChartConfig;

export default function OtpAreaChart() {
    const date1 = new Date(Date.now() - (86400_000 * 7));
    date1.setUTCHours(0, 0, 0, 0);

    const date2 = new Date();
    date2.setUTCDate(date2.getUTCDate());
    date2.setUTCHours(0, 0, 0, 0);

    const date = useRef<{ from: Date; to?: Date }>({
        from: date1,
        to: date2,
    });

    const {isFetching, refetch, isError, error, data: chartData} = useQuery({
        initialData: {result: []},
        queryKey: ['otp_daily_summary'],
        queryFn: () => fetchDailySummary(date.current.from, date.current.to),
        select: (data) => data.result,
        refetchOnWindowFocus: false,
    });

    const filteredData = useMemo(() => {
        return (chartData)
            .map(d => ({...d, total: d.pending + d.verified + d.failed}));
    }, [chartData]);

    const onDateChanged = (from: Date, to?: Date) => {
        date.current = {from, to};
        refetch();
    };

    return (
        <Card>
            <CardHeader className="flex gap-2 space-y-0 border-b py-5">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Status Detail</CardTitle>
                    <CardDescription>
                        OTP status per day
                    </CardDescription>
                </div>
                <div className="flex justify-end">
                    <DatePicker disabled={isFetching} onChange={onDateChanged} date={date.current}/>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {
                    !isFetching && filteredData.length > 0 ? <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <AreaChart data={filteredData}
                                       margin={{
                                           right: 24,
                                           left: 24,
                                       }}
                            >
                                <defs>
                                    <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-pending)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-pending)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillVerified" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-verified)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-verified)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillFailed" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-failed)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-failed)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-total)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-total)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                });
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area
                                    dataKey="failed"
                                    type="natural"
                                    fill="url(#fillFailed)"
                                    stroke="var(--color-failed)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="verified"
                                    type="natural"
                                    fill="url(#fillVerified)"
                                    stroke="var(--color-verified)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="pending"
                                    type="natural"
                                    fill="url(#fillPending)"
                                    stroke="var(--color-pending)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="total"
                                    type="natural"
                                    fill="url(#fillTotal)"
                                    stroke="var(--color-total)"
                                    stackId="a"
                                />
                                <ChartLegend content={<ChartLegendContent/>}/>
                            </AreaChart>
                        </ChartContainer>
                        :
                        <div
                            className="flex justify-center items-center aspect-auto h-[250px] w-full gap-x-2">
                            {isFetching ? <Loader2 className="animate-spin"/>
                                : isError ? <>{getErrorMessage(error)} <Button onClick={() => refetch()}
                                                                               variant="outline"
                                                                               size="icon"><RefreshCcw/></Button></> : 'No data'}
                        </div>
                }
            </CardContent>
        </Card>
    );
}
