<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = ['consumer_id', 'producer_id', 'total_cents', 'status'];
    public function consumer(): BelongsTo { return $this->belongsTo(User::class, 'consumer_id'); }
    public function producer(): BelongsTo { return $this->belongsTo(User::class, 'producer_id'); }
    public function items(): HasMany { return $this->hasMany(OrderItem::class); }
}
