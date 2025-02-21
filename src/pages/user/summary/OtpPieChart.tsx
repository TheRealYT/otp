'use client';

import {useMemo, useRef} from 'react';
import {Label, Pie, PieChart} from 'recharts';
import {useQuery} from '@tanstack/react-query';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {DatePicker} from '@/components/ui/datepicker.tsx';
import {fetchSummary} from '@/lib/api.ts';
import {Button} from '@/components/ui/button.tsx';
import {Loader2, RefreshCcw} from 'lucide-react';
import {useDateStore} from '@/store/date.ts';
import {getErrorMessage} from '@/lib/error.ts';

const chartConfig = {
    pending: {
        label: 'Pending',
        color: 'hsl(var(--chart-3))',
    },
    failed: {
        label: 'Failed',
        color: 'hsl(var(--chart-1))',
    },
    verified: {
        label: 'Verified',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export default function OtpPieChart() {
    const {date: savedDate, setDate} = useDateStore();

    const date = useRef<{ from: Date; to?: Date }>({
        from: savedDate.from ? new Date(savedDate.from) : new Date(new Date().setUTCHours(0, 0, 0, 0)),
        to: savedDate.to ? new Date(savedDate.to) : undefined,
    });

    const {isFetching, refetch, isError, error, data: chartData} = useQuery({
        initialData: {result: []},
        queryKey: ['otp_summary'],
        queryFn: () => fetchSummary(date.current.from, date.current.to),
        select: (data) => data?.result.map(d => ({...d, fill: `var(--color-${d.otp_status})`})),
        refetchOnWindowFocus: false,
    });

    const totalRequests = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0) ?? 0;
    }, [chartData]);

    const onDateChanged = (from: Date, to?: Date) => {
        date.current = {from, to};
        setDate(date.current);
        refetch();
    };

    return (
        <Card className="flex flex-col">
            <CardHeader
                className="flex gap-2 space-y-0 border-b py-5">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Status Summary</CardTitle>
                    <CardDescription>
                        OTP Status in aggregate
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {
                    !isFetching && chartData.length > 0 ?
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel/>}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="count"
                                    nameKey="otp_status"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({viewBox}) => {
                                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalRequests.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Total OTPs
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
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
            <CardFooter className="flex justify-end items-center gap-x-2">
                <DatePicker disabled={isFetching} onChange={onDateChanged} date={date.current}/>
            </CardFooter>
        </Card>
    );
}