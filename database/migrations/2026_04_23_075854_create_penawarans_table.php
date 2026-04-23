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
        Schema::create('penawarans', function (Blueprint $table) {
        $table->id();
        $table->foreignId('prospek_id')->constrained()->cascadeOnDelete();
        $table->integer('harga');
        $table->text('catatan')->nullable();
        $table->enum('status', ['ditawar', 'pending', 'diterima', 'ditolak']);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penawarans');
    }
};
