<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class Adminauthcontroller extends Controller
{
    function login(){

        return view('admin.login');
    }

    function loginAksi(){
        if(Auth::guard('admin')->attempt(['email'=> request('email'), 'password' => request('password')])){

            return redirect('admin/dashboard')->with('success', 'Login Berhasil');

		}
		return back()->with('danger', 'Login gagal, periksa email atau password anda !');
    }

    function logout(){
        Auth::guard('admin')->logout();
		Auth::logout();
		return redirect('/')->with('danger','Anda keluar');
    }
}
