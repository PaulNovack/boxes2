import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-muted px-4 py-8 md:px-8">
            <div className="flex w-full max-w-md flex-col gap-8">
                <Link
                    href={home()}
                    className="flex items-center justify-center gap-2 self-center font-medium"
                >
                    <div className="flex h-10 w-10 items-center justify-center">
                        <AppLogoIcon className="size-10 fill-current text-black dark:text-white" />
                    </div>
                </Link>

                <div className="rounded-lg border border-border bg-card shadow-sm">
                    <div className="px-8 pt-8 pb-2 text-center">
                        {title && (
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="mt-1.5 text-balance text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="px-8 py-6">{children}</div>
                </div>
            </div>
        </div>
    );
}
