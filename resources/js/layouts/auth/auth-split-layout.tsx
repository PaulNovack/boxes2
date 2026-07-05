import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-12 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/60" />
                <div className="relative z-20 flex flex-col justify-between h-full">
                    <Link
                        href={home()}
                        className="flex items-center text-lg font-medium"
                    >
                        <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                        <span className="text-white/90">{name}</span>
                    </Link>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold tracking-tight text-white">
                            {title || 'Welcome back'}
                        </h2>
                        <p className="text-sm text-white/80 leading-relaxed max-w-sm">
                            {description || 'Premium eyewear, starting at $95'}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm text-balance text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="rounded-lg border border-border bg-card px-6 py-8 shadow-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
