@extends('layout.app')
@section('title', 'SAMPAH')

@section('content')

   

    <div class="row ">
        <div class="col-xl-12">
            <div class="white_card card_height_100 mb_30 ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="white_card_header">
                            <div class="box_header m-0">
                                <div class="main-title">
                                    <h3 class="m-0">EDIT DATA SAMPAH</h3>
                                </div>
                            </div>
                        </div>
                        <div class="white_card_body QA_section">
                            <div class="QA_table ">

                                <form action="{{ url('admin/sampah/edit', $list->id) }}" method="post" enctype="multipart/form-data">
                                    @csrf
                                    <div class="row">
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Nama</label>
                                                <input type="text" name="nama" value="{{ $list->nama }}"
                                                    class="form-control @error('nama') is-invalid @enderror"
                                                    placeholder="Nama sampah ...">
                                            </div>
                                            @error('nama')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div class="col-md-4  mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Gambar</label>
                                                <input type="file" name="gambar"
                                                    class="form-control @error('gambar') is-invalid @enderror"
                                                    placeholder="Gambar ...">
                                            </div>
                                            @error('gambar')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div class="col-md-4  mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Harga</label>
                                                <input type="number" name="harga" value="{{ $list->harga }}"
                                                    class="form-control @error('harga') is-invalid @enderror"
                                                    placeholder="Harga / Kg ...">
                                            </div>
                                            @error('harga')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>
                                        <div class="col-md-12  mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Deskripsi</label>
                                                <textarea cols="30" rows="10" name="deskripsi"
                                                class="form-control @error('deskripsi') is-invalid @enderror"
                                                placeholder="Deskripsi ...">{{ $list->deskripsi }}</textarea>
                                            </div>
                                            @error('deskripsi')
                                                <span class="text-danger">{{ $message }}</span>
                                            @enderror
                                        </div>

                                        <div class="col-md-12  mb-3 mt-5">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <a href="{{ url('admin/sampah') }}" class="btn btn-warning">
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
