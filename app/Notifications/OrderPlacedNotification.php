<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderPlacedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Order $order
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject('Pedido confirmado #' . $this->order->id)
            ->greeting('Hola ' . $notifiable->name . ' 👋')
            ->line('Tu compra se ha realizado correctamente.')
            ->line('Número de pedido: #' . $this->order->id)
            ->line('Total: ' . number_format($this->order->total, 2) . ' €')
            ->line('');

        foreach ($this->order->items as $item) {
            $mail->line(
                '• ' .
                $item->product_name .
                ' x' .
                $item->quantity .
                ' - ' .
                number_format($item->subtotal, 2) .
                ' €'
            );
        }

        return $mail
            ->line('')
            ->line('Dirección de envío:')
            ->line($this->order->address)
            ->line($this->order->city . ', ' . $this->order->postal_code)
            ->line($this->order->country)
            ->line('')
            ->line('Gracias por confiar en InfoMusic 🎵');
    }
}