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
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('division_id')->constrained('divisions');
            $table->boolean('active');
            $table->boolean('complete');
            $table->date('start_at');
            $table->integer('number_of_games');
            $table->integer('league_fee');
            $table->integer('offical_fee_per_game');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('seasons');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
