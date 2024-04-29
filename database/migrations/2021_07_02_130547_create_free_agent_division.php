<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFreeAgentDivision extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('division_free_agent', function (Blueprint $table) {
            $table->foreignId('free_agent_id')->constrained('free_agents');
            $table->foreignId('division_id')->constrained('divisions');
            $table->primary(['free_agent_id', 'division_id']);
            $table->timestamps();
        });

        $free_agents = DB::table('free_agents')->whereNotNull('division_id')->get();

        foreach ($free_agents as $free_agent) {
            // Insert the split values into new columns.
            DB::table('division_free_agent')->insert([
                'free_agent_id' => $free_agent->id,
                'division_id' => $free_agent->division_id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('division_free_agent');
    }
}
