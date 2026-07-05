<?php

namespace App\Http\Controllers;

use App\Models\Box;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BoxController extends Controller
{
    /**
     * Display a listing of the user's boxes.
     */
    public function index(Request $request): Response
    {
        $boxes = $request->user()
            ->boxes()
            ->withCount('items')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('boxes/index', [
            'boxes' => $boxes,
        ]);
    }

    /**
     * Store a newly created box.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'weight' => 'nullable|numeric|min:0',
        ]);

        $box = $request->user()->boxes()->create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Box created.'),
        ]);

        return to_route('boxes.index');
    }

    /**
     * Update the specified box.
     */
    public function update(Request $request, Box $box): RedirectResponse
    {
        $this->authorize('update', $box);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'weight' => 'nullable|numeric|min:0',
        ]);

        $box->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Box updated.'),
        ]);

        return to_route('boxes.index');
    }

    /**
     * Remove the specified box.
     */
    public function destroy(Box $box): RedirectResponse
    {
        $this->authorize('update', $box);

        $box->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Box deleted.'),
        ]);

        return to_route('boxes.index');
    }
}
