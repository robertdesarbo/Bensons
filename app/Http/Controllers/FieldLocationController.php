<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FieldLocation;

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

        $FieldLocation = FieldLocation::findOrFail($request->fieldLocation);
        $FieldLocation->fields()->delete();
        $FieldLocation->delete();
    }
}
