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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->morphs('payable');
            $table->string('method');
            $table->unsignedBigInteger('amount');

            // For all types
            $table->date('payment_date');
            $table->text('notes')->nullable();

            // For Credit
            $table->date('due_date')->nullable();
            $table->unsignedBigInteger('remaining_balance')->nullable();

            // For Transfer
            $table->foreignId('account_id')->nullable()->constrained()->onDelete('set null');

            // For Cheque
            $table->string('cheque_number')->nullable();
            $table->string('bank_name')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
