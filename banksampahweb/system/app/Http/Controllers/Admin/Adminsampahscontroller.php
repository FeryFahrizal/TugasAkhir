<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Sampah;

class Adminsampahscontroller extends Controller
{
    function index(){
       
        $data['list'] = Sampah::get();
        return view('admin.sampah.index', $data);
    }
    function detail(Sampah $sampah){
        $data['list'] = $sampah;
        return view('admin.sampah.detail', $data);
    }
    function add(){
        
        return view('admin.sampah.add');
    }
    function aksiTambah(Request $request){
        $request->validate([
            'nama' => 'required|unique:sampah',
            'gambar' => 'required',
            'harga' => 'required',
            'deskripsi' => 'required',
        ]);

        $p = new Sampah;
        $p->nama = $request->nama;
        $p->handleUploadFoto();
        $p->harga = $request->harga;
        $p->deskripsi = $request->deskripsi;

        $simpan = $p->save();

        if ($simpan == 1) {
            return redirect('admin/sampah')->with('success', 'Data berhasil ditambahkan');
        }else{
            
            return back()->with('danger', 'Data gagal ditambahkan, coba ulangi kembali');
        }
    }

    function edit(Sampah $sampah){
        $data['list'] = $sampah;
        return view('admin.sampah.edit', $data);
    }

    function aksiEdit(Sampah $sampah, Request $request){

        if ($request->gambar == null) {
           $sampah->nama = $request->nama;
           $sampah->harga = $request->harga;
           $sampah->deskripsi = $request->deskripsi;
           $sampah->update();
            return back()->with('success', 'Data berhasil diupdate');
        }else{

            $hapusGambar = $sampah->handleDeleteFoto();
            if ($hapusGambar) {
                $sampah->nama = $request->nama;
                $sampah->handleUploadFoto();
                $sampah->harga = $request->harga;
                $sampah->deskripsi = $request->deskripsi;
                $sampah->update();
                 return back()->with('success', 'Data berhasil diupdate');
            }else{
                return back()->with('danger', 'Terjadi kesalahan saat mengupdate data, coba ulangi kembali !');
            }
           
        }

        


    }

    function hapus(Sampah $sampah){
        $hapusGambar = $sampah->handleDeleteFoto();
        if ($hapusGambar) {
            $sampah->delete();
            return back()->with('success', 'Data berhasil dihapus');
        }else{
            return back()->with('danger', 'Terjadi kesalahan saat menghapus data, coba ulangi kembali !');
        }
       
    }
    
}
