<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Petugas;

class Adminpetugascontroller extends Controller
{
    function index(){
        $data['list'] = Petugas::get();
        return view('admin.petugas.index', $data);
    }
    function detail(Petugas $petugas){
        $data['list'] = $petugas;
        return view('admin.petugas.detail', $data);
    }
    function add(){
        
        return view('admin.petugas.add');
    }
    function aksiTambah(Request $request){
        $request->validate([
            'nama' => 'required|unique:petugas',
            'tlp' => 'required',
            'password' => 'required',
        ]);

        $p = new Petugas;
        $p->nama = $request->nama;
        $p->tlp = $request->tlp;
        $p->password = bcrypt($request->password);

        $simpan = $p->save();

        if ($simpan == 1) {
            return redirect('admin/petugas')->with('success', 'Data berhasil ditambahkan');
        }else{
            
            return back()->with('danger', 'Data gagal ditambahkan, coba ulangi kembali');
        }
    }

    function edit(Petugas $petugas){
        $data['list'] = $petugas;
        return view('admin.petugas.edit', $data);
    }

    function aksiEdit(Petugas $petugas, Request $request){

        if ($request->password == null) {
            $petugas->nama = $request->nama;
            $petugas->tlp = $request->tlp;
            $petugas->update();
            return back()->with('success', 'Data berhasil diupdate');
        }else{
            $petugas->nama = $request->nama;
            $petugas->tlp = $request->tlp;
            $petugas->password = bcrypt($request->password);
            $petugas->update();
            return back()->with('success', 'Data berhasil diupdate');
        }

        


    }

    function hapus(Petugas $petugas){
        $hapus =  $petugas->delete();
        if ($hapus) {
            return back()->with('success', 'Data berhasil diupdate');
        }else{
            return back()->with('danger', 'Terjadi kesalahan saat menghapus data, coba ulangi kembali !');
        }
    }
    
}
