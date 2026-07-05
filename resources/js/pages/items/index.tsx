import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import { ArrowLeft, Box, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { store } from '@/routes/boxes/items';
import { destroy, update } from '@/routes/items';
import { index as boxesIndex } from '@/routes/boxes';
import type { BreadcrumbItem } from '@/types';

type ItemType = {
    id: number;
    name: string;
    quantity: number;
    box_id: number;
};

type BoxType = {
    id: number;
    name: string;
};

type Props = {
    box: BoxType;
    items: ItemType[];
    boxes: BoxType[];
};

export default function ItemsIndex({ box, items, boxes }: Props) {
    setLayoutProps({
        breadcrumbs: [
            {
                title: 'Boxes',
                href: '/boxes',
            },
            {
                title: box.name,
                href: `/boxes/${box.id}/items`,
            },
        ] satisfies BreadcrumbItem[],
    });

    return (
        <>
            <Head title={`Items - ${box.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={boxesIndex().url}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input text-foreground transition-colors hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {box.name}
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {items.length}{' '}
                                {items.length === 1 ? 'item' : 'items'} in this
                                box
                            </p>
                        </div>
                    </div>

                    <Form
                        {...store.form({ box: box.id })}
                        transform={(data: Record<string, unknown>) => ({
                            ...data,
                            name: `New Item ${items.length + 1}`,
                            quantity: 1,
                        })}
                    >
                        <Button type="submit" className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Item
                        </Button>
                    </Form>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16">
                        <Box className="h-12 w-12 text-muted-foreground/60" />
                        <div className="text-center">
                            <h3 className="font-medium text-foreground">
                                No items yet
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Add items to this box to get started.
                            </p>
                        </div>
                        <Form
                            {...store.form({ box: box.id })}
                            transform={(data: Record<string, unknown>) => ({
                                ...data,
                                name: 'My First Item',
                                quantity: 1,
                            })}
                        >
                            <Button type="submit" variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Add First Item
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                box={box}
                                boxes={boxes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function ItemCard({
    item,
    box,
    boxes,
}: {
    item: ItemType;
    box: BoxType;
    boxes: BoxType[];
}) {
    const [selectedBoxId, setSelectedBoxId] = useState('');
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
                                {item.name}
                            </CardTitle>
                            <CardDescription>
                                Qty: {item.quantity}
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
                <Form
                    {...update.form({ item: item.id })}
                    transform={(data: Record<string, string>) => ({
                        name: data.name,
                        quantity: data.quantity,
                    })}
                    className="flex flex-col gap-2"
                >
                    {({ processing }) => (
                        <>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2">
                                    <Label
                                        htmlFor={`name-${item.id}`}
                                        className="sr-only"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id={`name-${item.id}`}
                                        name="name"
                                        defaultValue={item.name}
                                        className="h-8 text-sm"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={`qty-${item.id}`}
                                        className="sr-only"
                                    >
                                        Quantity
                                    </Label>
                                    <Input
                                        id={`qty-${item.id}`}
                                        name="quantity"
                                        type="number"
                                        min="1"
                                        step="1"
                                        defaultValue={item.quantity}
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
                            </div>
                        </>
                    )}
                </Form>

                <Form
                    {...destroy.form({ item: item.id })}
                    as="div"
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

                {boxes.length > 0 && (
                    <Form
                        {...update.form({ item: item.id })}
                        transform={(data: Record<string, string>) => ({
                            name: data.name,
                            quantity: data.quantity,
                            box_id: data.box_id,
                        })}
                        className="border-t pt-3"
                    >
                        <MoveToBoxForm
                            item={item}
                            boxes={boxes}
                            selectedBoxId={selectedBoxId}
                            setSelectedBoxId={setSelectedBoxId}
                        />
                    </Form>
                )}
            </CardContent>
        </Card>
    );
}

function MoveToBoxForm({
    item,
    boxes,
    selectedBoxId,
    setSelectedBoxId,
}: {
    item: ItemType;
    boxes: BoxType[];
    selectedBoxId: string;
    setSelectedBoxId: (val: string) => void;
}) {
    return (
        <>
            <input type="hidden" name="name" value={item.name} />
            <input type="hidden" name="quantity" value={item.quantity} />
            <input type="hidden" name="box_id" value={selectedBoxId} />

            <Label className="mb-1 block text-xs text-muted-foreground">
                Move to box
            </Label>
            <div className="flex items-end gap-2">
                <div className="flex-1">
                    <Select
                        value={selectedBoxId}
                        onValueChange={setSelectedBoxId}
                    >
                        <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select box..." />
                        </SelectTrigger>
                        <SelectContent>
                            {boxes.map((b) => (
                                <SelectItem
                                    key={b.id}
                                    value={String(b.id)}
                                    className="text-xs"
                                >
                                    {b.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    type="submit"
                    size="sm"
                    variant="outline"
                    className="h-8"
                    disabled={!selectedBoxId}
                >
                    Move
                </Button>
            </div>
        </>
    );
}

