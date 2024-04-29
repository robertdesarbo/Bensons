<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('field_locations', function (Blueprint $table) {
            $table->dropColumn([
                'field_alpha_display',
                'total_fields',
                'alcohol',
                'private_property',
                'pets',
                'smoking',
                'ground_rules',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('field_locations', function (Blueprint $table) {
            $table->integer('total_fields')->default(1)->after('zip');
            $table->integer('field_alpha_display')->default(false)->after('total_fields');
            $table->boolean('alcohol')->nullable()->after('field_alpha_display');
            $table->boolean('private_property')->nullable()->after('alcohol');
            $table->boolean('pets')->nullable()->after('private_property');
            $table->boolean('smoking')->nullable()->after('pets');
            $table->text('ground_rules')->nullable()->after('smoking');
        });
    }
};
