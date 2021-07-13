<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

use App\Models\FreeAgent;
use App\Models\FreeAgentDivision;

class AddUniqueEmailToFreeAgent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Get records from old column.
        $duplicate_free_agents = DB::table('free_agents')
                    ->select('id', DB::raw('count(`email`) as occurences'))
                    ->groupBy('email')
                    ->having('occurences', '>', 1)
                    ->get();

        foreach ($duplicate_free_agents as $duplicate) {
            FreeAgentDivision::where('free_agent_id', $duplicate->id)->delete();
            FreeAgent::where('id', $duplicate->id)->delete();
        }

        Schema::table('free_agents', function (Blueprint $table) {
            $table->unique('email');
            $table->enum('gender', ['male', 'female'])->after('email');
            $table->enum('status', ['looking', 'found'])->after('gender');
            $table->dropColumn('division_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('free_agent', function (Blueprint $table) {
            $table->dropUnique('email');
            $table->dropColumn('gender');
            $table->dropColumn('status');
            $table->foreignId('division_id')->constrained('divisions')->after('email');
        });
    }
}
