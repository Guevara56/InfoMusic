<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Usuario (nullable para pedidos sin cuenta)
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');

            // Estado del pedido
            $table->enum('status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled'])->default('pending');

            // Total
            $table->decimal('total', 10, 2);

            // Datos de contacto (para usuarios sin cuenta o como copia)
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();

            // Dirección de envío
            $table->string('address');
            $table->string('city');
            $table->string('postal_code');
            $table->string('country')->default('Spain');

            // Stripe
            $table->string('stripe_payment_id')->nullable();
            $table->string('stripe_payment_status')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};