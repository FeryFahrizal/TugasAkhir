<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pelanggan;
use App\Models\Sampah;
use App\Models\Petugas;
use App\Models\Transaksi;

class Pelanggantransaksi extends Controller{

    function dataSampah(){

        $data = Sampah::get();
        if (count($data) == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'Belum Ada Data Sampah',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $data,
            ]);
        };

    }
    
    function transaksi($pelanggan){

        $data = Transaksi::with('sampah')->with('petugas')->with('pelanggan')->where('id_pelanggan', $pelanggan)->get();
        if (count($data) == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $data,
            ]);
        };

    }
    function transaksiBaru($pelanggan){

        $data = Transaksi::with('sampah')->with('petugas')->with('pelanggan')->where('id_pelanggan', $pelanggan)->where('status', 'Baru')->get();
        if (count($data) == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $data,
            ]);
        };

    }
    function transaksiProses($pelanggan){

        $data = Transaksi::with('sampah')->with('petugas')->with('pelanggan')->where('id_pelanggan', $pelanggan)->where('status', 'Proses')->get();
        if (count($data) == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $data,
            ]);
        };

    }
    function transaksiSelesai($pelanggan){

        $data = Transaksi::with('sampah')->with('petugas')->with('pelanggan')->where('id_pelanggan', $pelanggan)->where('status', 'Selesai')->get();
        if (count($data) == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $data,
            ]);
        };

    }
    function transaksiBatal($pelanggan){

        $data = Transaksi::with('sampah')->with('petugas')->with('pelanggan')->where('id_pelanggan', $pelanggan)->where('status', 'Batal')->get();
        if (count($data) == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $data,
            ]);
        };

    }
    function kirimTransaksi(Request $request){

        $p = new Transaksi;
        $p->kode = $request->kode;
        $p->id_petugas = 0;
        $p->id_pelanggan = $request->id_pelanggan;
        $p->id_sampah = $request->id_sampah;
        $p->berat = $request->berat;
        $p->total = $request->total;
        $p->status = 'Baru';
        $simpan = $p->save();

        if ($simpan == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Pesanan berhasil dikirim !',
                'data' =>  $p,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }

    }
    function batalkanTransaksi(Transaksi $transaksi){

        
        $transaksi->status = 'Batal';
        $simpan = $transaksi->update();

        if ($simpan == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Transaksi berhasil dibatalkan',
                'data' => $transaksi,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Terjadi kesalahan saat membatalkan transaksi, Coba ulangi kembali !',
                'data' =>  null,
            ]);
        }

    }
    function selesaikanTransaksi(Transaksi $transaksi){

        
        $transaksi->status = 'Selesai';
        $simpan = $transaksi->update();

        if ($simpan == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Transaksi berhasil diselesaikan',
                'data' => $transaksi,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Terjadi kesalahan saat menyelesaikan transaksi, Coba ulangi kembali !',
                'data' =>  null,
            ]);
        }

    }
    
    
}
