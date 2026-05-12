<?php
// ── app/Models/Order.php ──────────────────────────────────────

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'status', 'total',
        'name', 'email', 'phone',
        'address', 'city', 'postal_code', 'country',
        'stripe_payment_id', 'stripe_payment_status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Labels de estado para mostrar en la UI
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pending'   => 'Pendiente',
            'paid'      => 'Pagado',
            'shipped'   => 'Enviado',
            'delivered' => 'Entregado',
            'cancelled' => 'Cancelado',
            default     => $this->status,
        };
    }
}