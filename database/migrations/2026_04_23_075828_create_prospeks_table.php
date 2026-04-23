<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('prospeks', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('no_hp');
            $table->string('produk');
            $table->foreignId('sales_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['baru', 'follow_up', 'deal', 'lose'])->default('baru');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prospeks');
    }
};
