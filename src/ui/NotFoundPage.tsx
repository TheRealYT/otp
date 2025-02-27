export default function NotFoundPage() {
    return <>
        <div className="-z-10 absolute left-0 top-0 size-full bg-[repeating-radial-gradient(transparent,white)] dark:bg-[repeating-radial-gradient(transparent,black)]"/>
        <div className="-z-20 fixed size-full left-0 top-0 bg-pattern opacity-40 dark:opacity-10"/>

        <section className="flex-1 h-[calc(100vh-8rem)] flex flex-col justify-center items-center relative">
            <h1 className="text-9xl font-extrabold">404</h1>
            <h2 className="text-3xl font-extrabold">Page Not Found</h2>
        </section>
    </>;
}