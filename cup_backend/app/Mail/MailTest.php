<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MailTest extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $text;
    public $unsuscribe;
    public function __construct($text,$unsuscribe)
    {
        //
          $this->text=$text;
          $this->unsuscribe = $unsuscribe;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(auth()->user()->email)
                    ->view('mail.test')
                    ->with([
                       'text' => $this->text,
                       'unsuscribe' => $this->unsuscribe,
                   ]);

    }
}
