<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin;

class Adminprofilecontroller extends Controller
{
    function index(){
      
        $data['admin'] = Auth::guard('admin')->user();
        return view('admin.profile.index', $data);
    }

    function update(Admin $admin, Request $request){
        if($request->password != null){
            $admin->nama = $request->nama;
            $admin->email = $request->email;
            $admin->update();
            return back()->with('success', 'Profile berhasil diupdate');
        }else{
            $admin->nama = $request->nama;
            $admin->email = $request->email;
            $admin->password = bcrypt($request->password);
            $admin->update();
            return back()->with('success', 'Profile berhasil diupdate');
        }

    }
}
