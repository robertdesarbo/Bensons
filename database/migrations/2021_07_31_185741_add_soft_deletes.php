<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Carbon\Carbon;

use App\Models\Team;

class AddSoftDeletes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
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
     *
     * @return void
     */
    public function down()
    {
        Schema::table('leagues', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('divisions', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
