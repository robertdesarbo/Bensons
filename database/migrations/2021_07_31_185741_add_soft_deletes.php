<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('leagues', function (Blueprint $table) {
            $table->softDeletes()->after('sport');
        });

        Schema::table('divisions', function (Blueprint $table) {
            $table->softDeletes()->after('league_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leagues', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('divisions', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
