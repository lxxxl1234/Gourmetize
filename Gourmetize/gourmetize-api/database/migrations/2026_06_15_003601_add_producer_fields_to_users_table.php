<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Define o tipo de usuário (padrão 'consumer')
            $table->string('role')->default('consumer')->after('address');
            
            // Campos exclusivos do produtor (nullable para não afetar consumidores)
            $table->boolean('has_organic_certificate')->default(false)->after('role');
            $table->date('organic_expiry_date')->nullable()->after('has_organic_certificate');
            $table->string('organic_document_path')->nullable()->after('organic_expiry_date');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'has_organic_certificate', 'organic_expiry_date', 'organic_document_path']);
        });
    }
};