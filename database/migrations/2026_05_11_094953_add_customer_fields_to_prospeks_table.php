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
        Schema::table('prospeks', function (Blueprint $table) {
            if (!Schema::hasColumn('prospeks', 'jenis_customer')) {
                $table->string('jenis_customer')->nullable();
            }
            if (!Schema::hasColumn('prospeks', 'email')) {
                $table->string('email')->nullable();
            }
            if (!Schema::hasColumn('prospeks', 'alamat')) {
                $table->text('alamat')->nullable();
            }
            if (!Schema::hasColumn('prospeks', 'catatan')) {
                $table->text('catatan')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prospeks', function (Blueprint $table) {

            $table->dropColumn([
                'jenis_customer',
                'email',
                'alamat',
                'catatan',
            ]);

        });
    }
};