<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Field;
use Illuminate\Validation\Rule;

class FieldController extends Controller
{
    public function field(Request $request)
    {
        if ($request->field) {
            return Field::where('id', $request->field)->first();
        } else {
            return Field::get();
        }
    }

    public function addField(Request $request)
    {
        $validated = $request->validate([
            'field_location_id' => 'required',
            'name' => 'required',
            'number' => 'nullable|integer',
            'sport' => ['required', Rule::in(['softball', 'basketball'])],
            'active' => 'required|boolean',
            'lights' => 'required|boolean',
            'ground_rules' => 'nullable|string',
            'alcohol' => 'required|boolean',
            'private_property' => 'required|boolean',
            'pets' => 'required|boolean',
            'smoking' => 'required|boolean',
        ]);

         Field::create([
            'field_location_id' => $request->field_location_id,
            'name' => $request->name,
            'number' => $request->number,
            'sport' => $request->sport,
             'active' => $request->active,
            'lights' => $request->lights,
            'ground_rules' => $request->ground_rules,
            'alcohol' => $request->alcohol,
            'private_property' => $request->private_property,
            'pets' => $request->pets,
            'smoking' => $request->smoking,
        ]);
    }

    public function editField(Request $request)
    {
        $validated = $request->validate([
            'field' => 'required|exists:fields,id',
            'name' => 'required',
            'number' => 'nullable|integer',
            'sport' => ['required', Rule::in(['softball', 'basketball'])],
            'active' => 'required|boolean',
            'lights' => 'required|boolean',
            'ground_rules' => 'nullable|string',
            'alcohol' => 'required|boolean',
            'private_property' => 'required|boolean',
            'pets' => 'required|boolean',
            'smoking' => 'required|boolean',
        ]);

        $Field = Field::where('id', $request->field);

        $Field->update([
            'name' => $request->name,
            'number' => $request->number,
            'sport' => $request->sport,
            'active' => $request->active,
            'lights' => $request->lights,
            'ground_rules' => $request->ground_rules,
            'alcohol' => $request->alcohol,
            'private_property' => $request->private_property,
            'pets' => $request->pets,
            'smoking' => $request->smoking,
        ]);
    }

    public function removeField(Request $request)
    {
        $validated = $request->validate([
            'field' => 'required|exists:fields,id'
        ]);

        $Field = Field::findOrFail($request->field);
        $Field->delete();
    }
}
