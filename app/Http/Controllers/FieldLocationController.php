<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FieldLocation;
use Illuminate\Validation\ValidationException;

class FieldLocationController extends Controller
{
    public function fieldLocation(Request $request)
    {
        if ($request->fieldLocation) {
            return FieldLocation::with('fields')
                ->where('id', $request->fieldLocation)
                ->first();
        } else {
            return FieldLocation::with('fields')->get();
        }
    }

    public function addFieldLocation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'state' => 'required',
            'city' => 'required',
            'zip' => 'required',
        ]);

         FieldLocation::create([
            'name' => $request->name,
            'address' => $request->address,
            'state' => $request->state,
            'city' => $request->city,
            'zip' => $request->zip,
        ]);
    }

    public function editFieldLocation(Request $request)
    {
        $validated = $request->validate([
            'fieldLocation' => 'required|exists:field_locations,id',
            'name' => 'required',
            'address' => 'required',
            'state' => 'required',
            'city' => 'required',
            'zip' => 'required',
        ]);

        $FieldLocation = FieldLocation::where('id', $request->fieldLocation);

        $FieldLocation->update([
            'name' => $request->name,
            'address' => $request->address,
            'state' => $request->state,
            'city' => $request->city,
            'zip' => $request->zip,
        ]);
    }

    public function removeFieldLocation(Request $request)
    {
        $validated = $request->validate([
            'fieldLocation' => 'required|exists:field_locations,id'
        ]);

        $FieldLocation = FieldLocation::withCount(array('schedule as active_games' => function($query) {
            $query->active();
        }))
        ->withCount('schedule')
        ->findOrFail($request->fieldLocation);

        if($FieldLocation->active_games) {
            throw ValidationException::withMessages(['server' => 'This field has an active game']);
        } else if($FieldLocation->schedule_count > 0) {
            // Hide field since it was used in the past
            $FieldLocation->delete();
        } else {
            // Field was never used, OK to delete
            $FieldLocation->fields()->delete();
            $FieldLocation->forcedelete();
        }
    }
}
