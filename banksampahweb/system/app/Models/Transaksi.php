<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Transaksi extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'transaksi';

 
    public function sampah(){
        return $this->belongsTo(Sampah::class, 'id_sampah', 'id');
    }
    public function petugas(){
        return $this->belongsTo(Petugas::class, 'id_petugas', 'id');
    }
    public function pelanggan(){
        return $this->belongsTo(Pelanggan::class, 'id_pelanggan', 'id');
    }
}
