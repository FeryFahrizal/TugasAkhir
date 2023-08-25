<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pelanggan;

class Adminpelanggancontroller extends Controller
{
    function index(){
        $data['list'] = Pelanggan::get();
        return view('admin.pelanggan.index', $data);
    }
    function detail(Pelanggan $pelanggan){
        $data['list'] = $pelanggan;
        return view('admin.pelanggan.detail', $data);
    }
    function add(){
        
        return view('admin.pelanggan.add');
    }
    function aksiTambah(Request $request){
        $request->validate([
            'nama' => 'required|unique:pelanggan',
            'tlp' => 'required',
            'password' => 'required',
            'alamat' => 'required',
        ]);

        $p = new Pelanggan;
        $p->nama = $request->nama;
        $p->tlp = $request->tlp;
        $p->password = bcrypt($request->password);
        $p->alamat = $request->alamat;
        $p->lat = $request->lat;
        $p->lng = $request->lng;
        $simpan = $p->save();

        if ($simpan == 1) {
            return redirect('admin/pelanggan')->with('success', 'Data berhasil ditambahkan');
        }else{
            
            return back()->with('danger', 'Data gagal ditambahkan, coba ulangi kembali');
        }
    }

    function edit(Pelanggan $pelanggan){
        $data['list'] = $pelanggan;
        return view('admin.pelanggan.edit', $data);
    }

    function aksiEdit(Pelanggan $pelanggan, Request $request){

        if ($request->password == null) {
            $pelanggan->nama = $request->nama;
            $pelanggan->tlp = $request->tlp;
            $pelanggan->alamat = $request->alamat;
            $pelanggan->lat = $request->lat;
            $pelanggan->lng = $request->lng;
            $pelanggan->update();
            return back()->with('success', 'Data berhasil diupdate');
        }else{
            $pelanggan->nama = $request->nama;
            $pelanggan->tlp = $request->tlp;
            $pelanggan->password = bcrypt($request->password);
            $pelanggan->alamat = $request->alamat;
            $pelanggan->lat = $request->lat;
            $pelanggan->lng = $request->lng;
            $pelanggan->update();
            return back()->with('success', 'Data berhasil diupdate');
        }

        


    }

    function hapus(Pelanggan $pelanggan){
        $hapus =  $pelanggan->delete();
        if ($hapus) {
            return back()->with('success', 'Data berhasil diupdate');
        }else{
            return back()->with('danger', 'Terjadi kesalahan saat menghapus data, coba ulangi kembali !');
        }
    }
    
}
