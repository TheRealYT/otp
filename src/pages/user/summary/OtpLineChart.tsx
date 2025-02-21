'use client';

import {CartesianGrid, Line, LineChart, XAxis} from 'recharts';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {useQuery} from '@tanstack/react-query';
import {Loader2, RefreshCcw} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';

import {getErrorMessage} from '@/lib/error.ts';

export default function OtpLineChart({failRate = false, title = '', info = ''}) {
    const chartConfig = {
        rate: {
            label: 'Rate',
            color: failRate ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    const {isFetching, refetch, isError, error, data: chartData} = useQuery({
        initialData: {result: []},
        queryKey: ['otp_daily_summary'],
        select: (data) => data?.result.map(d => {
            let sum = d.verified + d.failed;
            if (sum == 0)
                sum = 1;

            return {rate: (failRate ? d.failed : d.verified) / sum, date: d.date};
        }),
        enabled: false,
    });

    return (
        <Card className="flex flex-col">
            <CardHeader
                className="flex gap-2 space-y-0 border-b py-5">
                <div className="grid flex-1 gap-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {info}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="my-auto">
                {
                    !isFetching && chartData.length > 0 ?
                        <ChartContainer config={chartConfig} className="">
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    top: 24,
                                    left: 24,
                                    right: 24,
                                }}
                            >
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
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
                                    content={<ChartTooltipContent hideLabel
                                                                  formatter={a => 'Rate ' + (a * 100).toFixed(2) + '%'}/>}
                                />
                                <Line
                                    dataKey="rate"
                                    type="linear"
                                    stroke="var(--color-rate)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
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
            <CardFooter className="flex items-center">
            </CardFooter>
        </Card>
    );
}
