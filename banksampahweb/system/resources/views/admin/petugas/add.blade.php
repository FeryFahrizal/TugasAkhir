@extends('layout.app')
@section('title', 'PELANGGAN')

@section('content')

    <style>
        .form-alamat {
            display: flex;
            align-content: flex-end;

            justify-content: space-between;
            position: relative;
        }

        .input-alamat-group {
            width: 100% !important;
        }

        .btn-openMap {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 12px !important;
            height: 40px;
            margin-top: 27px;
        }
    </style>

    <div class="row ">
        <div class="col-xl-12">
            <div class="white_card card_height_100 mb_30 ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="white_card_header">
                            <div class="box_header m-0">
                                <div class="main-title">
                                    <h3 class="m-0">FORM TAMBAH DATA PETUGAS</h3>
                                </div>
                            </div>
                        </div>
                        <div class="white_card_body QA_section">
                            <div class="QA_table ">

                                <form action="{{ url('admin/petugas/add') }}" method="post">
                                    @csrf
                                    <div class="row">
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Nama</label>
                                                <input type="text" name="nama"
                                                    class="form-control @error('nama') is-invalid @enderror"
                                                    placeholder="Nama lengkap ...">
                                            </div>
                                            @error('nama')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div class="col-md-4  mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Telepon</label>
                                                <input type="text" name="tlp"
                                                    class="form-control @error('tlp') is-invalid @enderror"
                                                    placeholder="No.Telepon ...">
                                            </div>
                                            @error('tlp')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div class="col-md-4  mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Password</label>
                                                <input type="text" name="password"
                                                    class="form-control @error('password') is-invalid @enderror"
                                                    placeholder="Password ...">
                                            </div>
                                            @error('password')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>

                                        <div class="col-md-12  mb-3 mt-5">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <a href="{{ url('admin/petugas') }}" class="btn btn-warning">
                                                    BATAL
                                                </a>
                                                <button class="btn btn-primary mx-3">
                                                    SIMPAN
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>



                        </div>


                    @endsection
