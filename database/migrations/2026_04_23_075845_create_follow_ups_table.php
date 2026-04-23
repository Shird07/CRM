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
        Schema::create('follow_ups', function (Blueprint $table) {
        $table->id();
        $table->foreignId('prospek_id')->constrained()->cascadeOnDelete();
        $table->date('tanggal');
        $table->text('catatan');
        $table->enum('status', ['menunggu', 'tertarik', 'tidak_tertarik']);
        $table->date('next_follow_up')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_ups');
    }
};
