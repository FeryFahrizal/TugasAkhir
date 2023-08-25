<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Transaksi;
use App\Models\Pelanggan;
use App\Models\Petugas;


class Petugasauth extends Controller
{

    function login(Request $request){
        if(Auth::guard('petugas')->attempt(['tlp'=> request('tlp'), 'password' => request('password')])){
            $data = Auth::guard('petugas')->user();
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $data,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' => null,
            ]);
        }
    }


    function cekLogin($id){
        $data = Petugas::find($id);
        if ($data == null) {
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
        }
       
    }

    function updateProfile(Request $request){
        $petugas = Petugas::where('id', $request->id)->get();
        if($request->password == null){
            $petugas[0]->nama = $request->nama;
            $petugas[0]->tlp = $request->tlp;
            $simpan = $petugas[0]->update();
            if ($simpan == 1) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile berhasil diupdate !',
                    'data' => $petugas[0],
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Not Found',
                    'data' => null,
                ]);
         
            }
        }else{
            $petugas[0]->nama = $request->nama;
            $petugas[0]->tlp = $request->tlp;
            $petugas[0]->password = bcrypt($request->password);
            $simpan = $petugas[0]->update();
            if ($simpan == 1) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile berhasil diupdate !',
                    'data' => $petugas[0],
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Not Found',
                    'data' => null,
                ]);
         
            }
        }
    }

    function cekPenjemputan($id){
        $data = Transaksi::with('sampah')
                        ->with('petugas')
                        ->with('pelanggan')
                        ->where('id_petugas', $id)
                        ->where('status', "Baru")
                        ->get();
        if ($data == null) {
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
        }
       
    }
    function prosesJemput(Request $req){

        $transaksi = Transaksi::where('id', $req->id)->get();
       
        $transaksi[0]->status = "Selesai";
        $transaksi[0]->berat = $req->berat;
        $transaksi[0]->total = $req->total;
        $x = $transaksi[0]->update();


        if ($x != 1) {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found',
                'data' =>  null,
            ]);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' =>  $transaksi,
            ]);
        }
       
    }
    function histori($id){
        $data = Transaksi::with('sampah')
                        ->with('petugas')
                        ->with('pelanggan')
                        ->where('id_petugas', $id)
                        ->get();
        if ($data == null) {
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
        }
       
    }
}
