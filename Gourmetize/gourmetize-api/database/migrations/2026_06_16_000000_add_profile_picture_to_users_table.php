<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Adiciona a coluna de foto de perfil na tabela de usuários.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Salva o caminho da imagem (nullable para não afetar usuários antigos)
            $table->string('profile_picture')->nullable()->after('name');
        });
    }

    /**
     * Remove a coluna se a migration for revertida.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('profile_picture');
        });
    }
};
