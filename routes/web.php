<?php

use App\Http\Controllers\BoxController;
use App\Http\Controllers\BoxPrintController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Boxes
    Route::get('boxes', [BoxController::class, 'index'])->name('boxes.index');
    Route::post('boxes', [BoxController::class, 'store'])->name('boxes.store');
    Route::put('boxes/{box}', [BoxController::class, 'update'])->name('boxes.update');
    Route::delete('boxes/{box}', [BoxController::class, 'destroy'])->name('boxes.destroy');
    Route::get('boxes/{box}/print', BoxPrintController::class)->name('boxes.print');

    // Items nested under boxes
    Route::get('boxes/{box}/items', [ItemController::class, 'index'])->name('boxes.items.index');
    Route::post('boxes/{box}/items', [ItemController::class, 'store'])->name('boxes.items.store');
    Route::put('items/{item}', [ItemController::class, 'update'])->name('items.update');
    Route::delete('items/{item}', [ItemController::class, 'destroy'])->name('items.destroy');

    // All items with pagination
    Route::get('items/all', [ItemController::class, 'all'])->name('items.all');
});

require __DIR__.'/settings.php';
