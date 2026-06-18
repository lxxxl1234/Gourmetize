<?php

use Illuminate\Support\Facades\Route;

// Rota de teste para ver se a API está respondendo
Route::get('/api/teste', function () {
    return response()->json(['message' => 'A API do Gourmetize está funcionando! 🚀']);
});