<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pelanggan;
use App\Models\Sampah;
use App\Models\Petugas;
use App\Models\Transaksi;

class Admintransaksiscontroller extends Controller
{
    function index(){
        $data['list'] = Transaksi::with('sampah')->with('petugas')->with('pelanggan')->get();
        
        return view('admin.transaksi.index', $data);
    }
    function detail(Transaksi $transaksi){
        $data['list'] = $transaksi::with('sampah')->with('petugas')->with('pelanggan')->get();
        $data['petugas'] = Petugas::get();
        return view('admin.transaksi.detail', $data);
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

        $p = new Transaksi;
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

    function edit(Transaksi $transaksi){
        $data['list'] = $transaksi;
        return view('admin.pelanggan.edit', $data);
    }

    function aksiEdit(Transaksi $transaksi, Request $request){

        if ($request->password == null) {
            $transaksi->nama = $request->nama;
            $transaksi->tlp = $request->tlp;
            $transaksi->alamat = $request->alamat;
            $transaksi->lat = $request->lat;
            $transaksi->lng = $request->lng;
            $transaksi->update();
            return back()->with('success', 'Data berhasil diupdate');
        }else{
            $transaksi->nama = $request->nama;
            $transaksi->tlp = $request->tlp;
            $transaksi->password = bcrypt($request->password);
            $transaksi->alamat = $request->alamat;
            $transaksi->lat = $request->lat;
            $transaksi->lng = $request->lng;
            $transaksi->update();
            return back()->with('success', 'Data berhasil diupdate');
        }

        


    }

    function hapus(Transaksi $transaksi){
        $hapus =  $transaksi->delete();
        if ($hapus) {
            return back()->with('success', 'Data berhasil dihapus');
        }else{
            return back()->with('danger', 'Terjadi kesalahan saat menghapus data, coba ulangi kembali !');
        }
    }

    function pilihPetugas(Transaksi $transaksi, Request $request){

        $transaksi->id_petugas =  $request->id_petugas;
        $transaksi->update();
        return back()->with('success', 'Petugas berhasil dipilih !');
    }
    
}
