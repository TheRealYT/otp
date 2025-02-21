const steps = [
    {
        step: '1',
        title: 'Sign up',
        detail: 'Create a free account in seconds. No setup required.',
    },
    {
        step: '2',
        title: 'Get API Key',
        detail: 'Generate your unique API key from the dashboard.',
    },
    {
        step: '3',
        title: 'Start Verifying',
        detail: 'Check the docs in your dashboard.',
    },
];

export default function HowSection() {
    return (
        <section className="mt-12">
            <h1 className="mb-12 text-center font-bold text-2xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                How It Works?
            </h1>

            <div className="flex max-md:flex-col max-md:items-center justify-center">
                {
                    steps.map(s => (
                        <div
                            key={s.step}
                            className="cursor-pointer bg-background hover:shadow-md transition-transform hover:scale-110 hover:z-10 relative rounded-md border h-32 w-64 flex flex-col justify-center items-center text-center px-3">
                            <p className="absolute max-md:-top-3 max-md:left-[unset] -left-3 flex justify-center items-center bg-background text-foreground size-6 border rounded-full">
                                {s.step}
                            </p>

                            <p className="mb-2 font-bold">{s.title}</p>
                            <p>{s.detail}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
