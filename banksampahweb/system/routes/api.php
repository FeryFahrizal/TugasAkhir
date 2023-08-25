<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Pelangganauth;
use App\Http\Controllers\Api\Pelanggantransaksi;
use App\Http\Controllers\Api\Petugasauth;

Route::prefix('pelanggan')->group(function(){

    Route::controller(Pelangganauth::class)->group(function(){
      Route::post('registrasi','registrasi');
      Route::post('login','login');
      Route::get('ambil','ambil');
      Route::get('cekLogin/{id}','cekLogin');
      Route::post('updateProfile/{pelanggan}','updateProfile');
    });
    Route::controller(Pelanggantransaksi::class)->group(function(){
      Route::get('transaksi/{pelanggan}','transaksi');
      Route::get('transaksiBaru/{pelanggan}','transaksiBaru');
      Route::get('transaksiProses/{pelanggan}','transaksiProses');
      Route::get('transaksiSelesai/{pelanggan}','transaksiSelesai');
      Route::get('transaksiBatal/{pelanggan}','transaksiBatal');
      Route::get('batalkanTransaksi/{transaksi}','batalkanTransaksi');
      Route::get('selesaikanTransaksi/{transaksi}','selesaikanTransaksi');
      Route::post('kirimTransaksi','kirimTransaksi');
      Route::get('dataSampah','dataSampah');
    });
   
});
Route::prefix('petugas')->group(function(){

    Route::controller(Petugasauth::class)->group(function(){
      Route::post('login','login');
      Route::get('cekLogin/{id}','cekLogin');
      Route::get('cekPenjemputan/{id}','cekPenjemputan');
      Route::post('prosesJemput','prosesJemput');
      Route::get('histori/{id}','histori');
      Route::post('updateProfile','updateProfile');
    });
    
   
});
  