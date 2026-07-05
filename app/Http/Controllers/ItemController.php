<?php

namespace App\Http\Controllers;

use App\Models\Box;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    /**
     * Display all items across all boxes with pagination.
     */
    public function all(Request $request): Response
    {
        $items = Item::query()
            ->with('box')
            ->whereHas('box', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('items/all', [
            'items' => $items,
        ]);
    }

    /**
     * Display the items for a given box.
     */
    public function index(Request $request, Box $box): Response
    {
        $this->authorize('view', $box);

        $items = $box->items()->orderBy('created_at', 'desc')->get();

        $boxes = $request->user()
            ->boxes()
            ->where('id', '!=', $box->id)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('items/index', [
            'box' => $box,
            'items' => $items,
            'boxes' => $boxes,
        ]);
    }

    /**
     * Store a newly created item in the box.
     */
    public function store(Request $request, Box $box): RedirectResponse
    {
        $this->authorize('update', $box);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
        ]);

        $box->items()->create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Item created.'),
        ]);

        return to_route('boxes.items.index', $box);
    }

    /**
     * Update the specified item.
     */
    public function update(Request $request, Item $item): RedirectResponse
    {
        $this->authorize('update', $item->box);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'box_id' => 'sometimes|integer|exists:boxes,id',
        ]);

        // If moving to a different box, authorize the target box too
        if (isset($validated['box_id']) && $validated['box_id'] !== $item->box_id) {
            $targetBox = Box::findOrFail($validated['box_id']);
            $this->authorize('update', $targetBox);
        }

        $item->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Item updated.'),
        ]);

        $redirectBox = isset($validated['box_id'])
            ? Box::find($validated['box_id'])
            : $item->box;

        return to_route('boxes.items.index', $redirectBox);
    }

    /**
     * Remove the specified item.
     */
    public function destroy(Item $item): RedirectResponse
    {
        $this->authorize('update', $item->box);

        $box = $item->box;
        $item->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Item deleted.'),
        ]);

        return to_route('boxes.items.index', $box);
    }
}
