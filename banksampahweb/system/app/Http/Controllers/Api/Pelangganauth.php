<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Pelanggan;
use App\Models\Sampah;

class Pelangganauth extends Controller
{

    function login(Request $request){
        if(Auth::guard('pelanggan')->attempt(['tlp'=> request('tlp'), 'password' => request('password')])){
            $data = Auth::guard('pelanggan')->user();
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
    function registrasi(Request $request){

        $pelanggan =  new Pelanggan;

        $pelanggan->nama = $request->nama;
        $pelanggan->tlp = $request->tlp;
        $pelanggan->password = bcrypt($request->password);
        $pelanggan->alamat = $request->alamat;
        $pelanggan->lat = $request->lat;
        $pelanggan->lng = $request->lng;
        $simpan = $pelanggan->save();
        if ($simpan == 1) {
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $pelanggan,
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
        $data = Pelanggan::find($id);



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

    function updateProfile(Request $request , Pelanggan $pelanggan){
        if($request->password == null){
            $pelanggan->nama = $request->nama;
            $pelanggan->tlp = $request->tlp;
            $pelanggan->alamat = $request->alamat;
            $pelanggan->lat = $request->lat;
            $pelanggan->lng = $request->lng;
            $simpan = $pelanggan->save();
            if ($simpan == 1) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile berhasil diupdate !',
                    'data' => $pelanggan,
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Not Found',
                    'data' => null,
                ]);
         
            }
        }else{
            $pelanggan->nama = $request->nama;
            $pelanggan->tlp = $request->tlp;
            $pelanggan->password = bcrypt($request->password);
            $pelanggan->alamat = $request->alamat;
            $pelanggan->lat = $request->lat;
            $pelanggan->lng = $request->lng;
            $simpan = $pelanggan->save();
            if ($simpan == 1) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Profile berhasil diupdate !',
                    'data' => $pelanggan,
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

    
}
