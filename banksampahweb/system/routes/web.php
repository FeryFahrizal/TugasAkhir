<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\Adminauthcontroller;
use App\Http\Controllers\Admin\Admindashboardcontroller;
use App\Http\Controllers\Admin\Adminpelanggancontroller;
use App\Http\Controllers\Admin\Adminpetugascontroller;
use App\Http\Controllers\Admin\Adminsampahscontroller;
use App\Http\Controllers\Admin\Admintransaksiscontroller;
use App\Http\Controllers\Admin\Adminprofilecontroller;



Route::controller(Adminauthcontroller::class)->group(function () {
    Route::get('/', 'login')->name('login');
    Route::post('/loginAksi', 'loginAksi');
    Route::get('/logout', 'logout');

});

Route::prefix('admin')->middleware('auth:admin')->group(function () {
    Route::controller(Admindashboardcontroller::class)->group(function () {
        Route::get('dashboard', 'index');
   
    });
    Route::controller(Adminpelanggancontroller::class)->group(function () {
        Route::get('pelanggan', 'index');
        Route::get('pelanggan/detail/{pelanggan}', 'detail');
        Route::get('pelanggan/add', 'add');
        Route::post('pelanggan/add', 'aksiTambah');
        Route::get('pelanggan/edit/{pelanggan}', 'edit');
        Route::post('pelanggan/edit/{pelanggan}', 'aksiEdit');
        Route::get('pelanggan/hapus/{pelanggan}', 'hapus');
    });
    Route::controller(Adminpetugascontroller::class)->group(function () {
        Route::get('petugas', 'index');
        Route::get('petugas/add', 'add');
        Route::post('petugas/add', 'aksiTambah');
        Route::get('petugas/edit/{petugas}', 'edit');
        Route::post('petugas/edit/{petugas}', 'aksiEdit');
        Route::get('petugas/hapus/{petugas}', 'hapus');
    });
    Route::controller(Adminsampahscontroller::class)->group(function () {
        Route::get('sampah', 'index');
        Route::get('sampah/add', 'add');
        Route::post('sampah/add', 'aksiTambah');
        Route::get('sampah/edit/{sampah}', 'edit');
        Route::post('sampah/edit/{sampah}', 'aksiEdit');
        Route::get('sampah/hapus/{sampah}', 'hapus');
    });
    Route::controller(Admintransaksiscontroller::class)->group(function () {
        Route::get('transaksi', 'index');
        Route::get('transaksi/detail/{transaksi}', 'detail');
        Route::get('transaksi/add', 'add');
        Route::post('transaksi/add', 'aksiTambah');
        Route::get('transaksi/edit/{transaksi}', 'edit');
        Route::post('transaksi/edit/{transaksi}', 'aksiEdit');
        Route::get('transaksi/hapus/{transaksi}', 'hapus');
        Route::post('transaksi/pilihPetugas/{transaksi}', 'pilihPetugas');
    });
    Route::controller(Adminprofilecontroller::class)->group(function () {
        Route::get('profile', 'index');
        Route::post('profile/update/{admin}', 'update');
    });
});