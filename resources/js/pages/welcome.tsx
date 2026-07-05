import { Head, Link, usePage } from '@inertiajs/react';
import { login } from '@/routes';
import { register } from '@/routes';
import { index as boxes } from '@/routes/boxes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col bg-background">
                {/* Header */}
                <header className="border-b border-border/60">
                    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
                        <div className="text-lg font-semibold tracking-tight text-foreground">
                            Boxes
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={boxes().url}
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
                                >
                                    Boxes
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <main className="flex flex-1 items-center justify-center px-5">
                    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 py-16 lg:flex-row lg:py-24">
                        {/* Left content */}
                        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
                            <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Premium eyewear, starting at $95
                            </h1>
                            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                                Browse our collection of handcrafted frames.
                                Free shipping and free 30-day returns on every
                                order.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    href={register()}
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
                                >
                                    Get started
                                </Link>
                                <Link
                                    href={login()}
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-7 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
                                >
                                    Log in
                                </Link>
                            </div>
                            <p className="mt-6 text-xs text-muted-foreground">
                                Free shipping &bull; Free 30-day returns &bull;
                                2-year warranty
                            </p>
                        </div>

                        {/* Right - decorative */}
                        <div className="flex w-full max-w-md items-center justify-center lg:max-w-lg">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-border">
                                            <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-border">
                                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40" />
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Find your perfect fit
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-border/60">
                    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 text-xs text-muted-foreground">
                        <span>&copy; {new Date().getFullYear()} Boxes. All rights reserved.</span>
                        <div className="flex items-center gap-6">
                            <span>Free shipping</span>
                            <span>30-day returns</span>
                            <span>2-year warranty</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
