import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Package } from 'lucide-react';
import { index as boxes } from '@/routes/boxes';
import type { BreadcrumbItem } from '@/types';

type ItemType = {
    id: number;
    name: string;
    quantity: number;
    box: {
        id: number;
        name: string;
    };
};

type PaginatedData = {
    data: ItemType[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

type Props = {
    items: PaginatedData;
};

export default function AllItems({ items }: Props) {
    return (
        <>
            <Head title="All Items" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        All Items
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {items.total} {items.total === 1 ? 'item' : 'items'}{' '}
                        across all boxes
                    </p>
                </div>

                {items.data.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16">
                        <Package className="h-12 w-12 text-muted-foreground/60" />
                        <div className="text-center">
                            <h3 className="font-medium text-foreground">
                                No items yet
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Create a box and add items to get started.
                            </p>
                        </div>
                        <Link
                            href={boxes().url}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go to Boxes
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-hidden rounded-lg border border-border">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                            Box
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                            Quantity
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {items.data.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-3 text-sm font-medium text-foreground">
                                                <Link
                                                    href={`/boxes/${item.box.id}/items`}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                                <Link
                                                    href={`/boxes/${item.box.id}/items`}
                                                    className="hover:text-foreground transition-colors"
                                                >
                                                    {item.box.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                                                {item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {items.last_page > 1 && (
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {items.from} to {items.to} of{' '}
                                    {items.total} items
                                </p>
                                <div className="flex items-center gap-1">
                                    {items.links.map((link, index) => {
                                        if (link.url === null) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm text-muted-foreground"
                                                >
                                                    {link.label === 'pagination.previous'
                                                        ? '\u2039'
                                                        : link.label === 'pagination.next'
                                                          ? '\u203A'
                                                          : link.label}
                                                </span>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                                                    link.active
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'text-foreground hover:bg-muted'
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

AllItems.layout = {
    breadcrumbs: [
        {
            title: 'Boxes',
            href: '/boxes',
        },
        {
            title: 'All Items',
            href: '/items/all',
        },
    ] satisfies BreadcrumbItem[],
};
