<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lynns', function (Blueprint $table) {
            // this will create an id, a "published" column, and soft delete and timestamps columns
            createDefaultTableFields($table);

            $table->string('title', 200)->nullable();
            $table->string('subtitle', 200)->nullable();
            $table->text('description')->nullable();
            $table->integer('position')->unsigned()->nullable();

            $table->timestamp('publish_start_date')->nullable();

            // this will create the required columns to support nesting for this module
            $table->nestedSet();
        });

        Schema::create('lynn_translations', function (Blueprint $table) {
            createDefaultTranslationsTableFields($table, 'lynn');
        });

        Schema::create('lynn_slugs', function (Blueprint $table) {
            createDefaultSlugsTableFields($table, 'lynn');
        });

        Schema::create('lynn_revisions', function (Blueprint $table) {
            createDefaultRevisionsTableFields($table, 'lynn');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lynn_revisions');
        Schema::dropIfExists('lynn_translations');
        Schema::dropIfExists('lynn_slugs');
        Schema::dropIfExists('lynns');
    }
};
