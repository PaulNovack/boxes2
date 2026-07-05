import { Form, Head, Link } from '@inertiajs/react';
import { Box, Package, Plus, Printer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { destroy, store, update } from '@/routes/boxes';
import { index as viewItems } from '@/routes/boxes/items';
import type { BreadcrumbItem } from '@/types';

type BoxType = {
    id: number;
    name: string;
    weight: string | null;
    items_count: number;
};

type Props = {
    boxes: BoxType[];
};

export default function BoxesIndex({ boxes }: Props) {
    return (
        <>
            <Head title="Boxes" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Boxes
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your boxes and their contents
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        transform={(data: Record<string, unknown>) => ({
                            ...data,
                            name: `New Box ${boxes.length + 1}`,
                            weight: null,
                        })}
                        className="inline"
                    >
                        <Button type="submit" className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Box
                        </Button>
                    </Form>
                </div>

                {boxes.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16">
                        <Box className="h-12 w-12 text-muted-foreground/60" />
                        <div className="text-center">
                            <h3 className="font-medium text-foreground">
                                No boxes yet
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Create your first box to get started.
                            </p>
                        </div>
                        <Form
                            {...store.form()}
                            transform={(data: Record<string, unknown>) => ({
                                ...data,
                                name: 'My First Box',
                                weight: null,
                            })}
                        >
                            <Button type="submit" variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Create First Box
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {boxes.map((box) => (
                            <BoxCard key={box.id} box={box} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function BoxCard({ box }: { box: BoxType }) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Box className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-base">
                                {box.name}
                            </CardTitle>
                            <CardDescription>
                                {box.items_count}{' '}
                                {box.items_count === 1 ? 'item' : 'items'}
                                {box.weight && (
                                    <>
                                        {' '}&middot; {box.weight} lbs
                                    </>
                                )}
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <Form
                    {...update.form({ box: box.id })}
                    transform={(data: Record<string, string>) => ({
                        name: data.name,
                        weight: data.weight,
                    })}
                    className="flex flex-col gap-2"
                >
                    {({ processing }) => (
                        <>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2">
                                    <Label
                                        htmlFor={`name-${box.id}`}
                                        className="sr-only"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id={`name-${box.id}`}
                                        name="name"
                                        defaultValue={box.name}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={`weight-${box.id}`}
                                        className="sr-only"
                                    >
                                        Weight
                                    </Label>
                                    <Input
                                        id={`weight-${box.id}`}
                                        name="weight"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        defaultValue={box.weight ?? ''}
                                        placeholder="lbs"
                                        className="h-8 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="flex-1"
                                    disabled={processing}
                                >
                                    Save
                                </Button>
                                <Link
                                    href={viewItems({ box: box.id }).url}
                                    className="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
                                >
                                    <Package className="mr-1.5 h-3.5 w-3.5" />
                                    Items
                                </Link>
                                <a
                                    href={`/boxes/${box.id}/print`}
                                    className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Printer className="mr-1.5 h-3.5 w-3.5" />
                                    Print
                                </a>
                            </div>
                        </>
                    )}
                </Form>

                <Form
                    {...destroy.form({ box: box.id })}
                    as="div"
                    className="mt-1"
                >
                    <Button
                        type="submit"
                        variant="destructive"
                        size="sm"
                        className="w-full"
                    >
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                        Delete
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
}

BoxesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Boxes',
            href: '/boxes',
        },
    ] satisfies BreadcrumbItem[],
};
