<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmail
{
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Verifica tu cuenta de InfoMusic')
            ->greeting('¡Bienvenido a InfoMusic!')
            ->line('Gracias por registrarte en InfoMusic.')
            ->line('Antes de comenzar, necesitamos verificar tu dirección de correo electrónico.')
            ->action(
                'Verificar correo',
                $this->verificationUrl($notifiable)
            )
            ->line('Si no has creado esta cuenta, puedes ignorar este mensaje.')
            ->salutation('Equipo de InfoMusic');
    }
}