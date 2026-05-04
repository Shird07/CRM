<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('prospeks', function (Blueprint $table) {
            $table->id();

            // DATA CUSTOMER
            $table->string('nama');
            $table->string('no_hp');

            // RELASI
            $table->foreignId('sales_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('region_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('product_id')
                ->nullable()
                ->constrained('products')
                ->nullOnDelete();

            // PIPELINE CRM (INI YANG UTAMA)
            $table->enum('stage', [
                'lead',
                'follow_up',
                'negosiasi',
                'deal',
                'win',
                'lose'
            ])->default('lead');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prospeks');
    }
};