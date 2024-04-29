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
    public function up()
    {
        Schema::rename('fields', 'field_locations');

        Schema::create('fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_location_id')->constrained('field_locations');
            $table->integer('number');
            $table->string('name');
            $table->boolean('alcohol')->nullable();
            $table->boolean('private_property')->nullable();
            $table->boolean('pets')->nullable();
            $table->boolean('smoking')->nullable();
            $table->text('ground_rules')->nullable();
            $table->enum('sport', ['softball', 'basketball']);
            $table->boolean('lights')->nullable();
            $table->boolean('active');
            $table->timestamps();
        });

        Schema::table('field_locations', function (Blueprint $table) {
            $table->boolean('active')->after('zip')->nullable();
        });

        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign('schedules_field_id_foreign');
            $table->renameColumn('field_id', 'field_location_id');
            $table->foreign('field_location_id')
                ->references('id')
                ->on('field_locations')
                ->onDelete('cascade');
            $table->renameIndex('schedules_field_id_foreign', 'schedules_field_location_id_foreign');
        });

        Schema::table('schedules', function (Blueprint $table) {
            $table->foreignId('field_id')->nullable()->after('field_location_id')->constrained('fields');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropColumn(['field_id']);
        });

        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign(['field_location_id']);
            $table->dropIndex(['field_location_id']);
            $table->renameColumn('field_location_id', 'field_id');
            $table->foreign('field_id')
                ->references('id')
                ->on('fields')
                ->onDelete('cascade');
        });

        Schema::table('field_locations', function (Blueprint $table) {
            $table->dropColumn(['active']);
        });

        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('fields');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

        Schema::rename('field_locations', 'fields');
    }
};
