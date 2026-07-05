import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-background px-4 py-8 md:px-8">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-5">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex h-10 w-10 items-center justify-center">
                                <AppLogoIcon className="size-10 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1.5 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            {description && (
                                <p className="text-balance text-sm text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="rounded-lg border border-border bg-card px-6 py-8 shadow-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
