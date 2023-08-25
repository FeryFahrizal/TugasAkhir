<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Transaksi;

class Admindashboardcontroller extends Controller
{
    function index(){
        $data['baru'] = Transaksi::where('status', 'Baru')->count();
        $data['proses'] = Transaksi::where('status', 'Proses')->count();
        $data['selesai'] = Transaksi::where('status', 'Selesai')->count();
        $data['batal'] = Transaksi::where('status', 'Batal')->count();
      
        return view('admin.dashboard', $data);
    }
}
