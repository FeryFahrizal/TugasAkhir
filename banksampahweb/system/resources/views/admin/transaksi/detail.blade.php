@extends('layout.app')
@section('title', 'PELANGGAN')
@section('content')
    <style>
        .maps {
            width: 100%;
            height: 300px;
        }
    </style>

    @foreach ($list as $data)
        
    @endforeach
    <div class="row">
        <div class="col-12">
            <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                <div class="page_title_left">
                    <h3 class="f_s_25 f_w_700 dark_text">DETAIL TRANSAKSI</h3>

                </div>

            </div>
        </div>
    </div>
    </div>
    <div class="row ">
        <div class="col-xl-12">
            <div class="white_card card_height_100 mb_30 ">
                <div class="white_card_body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <td colspan="3">
                                        <b>PELANGGAN</b>
                                    </td>
        
                                </tr>
                                <tr>
                                    <th>Nama</th>
                                    <td>:</td>
                                    <td>{{ $data->pelanggan->nama }}</td>
                                </tr>
                                <tr>
                                    <th>Telepon</th>
                                    <td>:</td>
                                    <td>{{ $data->pelanggan->tlp }}</td>
                                </tr>
                                <tr>
                                    <th>Alamat</th>
                                    <td>:</td>
                                    <td>{{ $data->pelanggan->alamat }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            @if ($data->petugas != null)
                            <table class="table">
                                <tr>
                                    <td colspan="3">
                                        <b>PETUGAS</b>
                                    </td>
        
                                </tr>
                                <tr>
                                    <th>Nama</th>
                                    <td>:</td>
                                    <td>{{ $data->petugas->nama }}</td>
                                </tr>
                                <tr>
                                    <th>Telepon</th>
                                    <td>:</td>
                                    <td>{{ $data->petugas->tlp }}</td>
                                </tr>
                               
                            </table>
                                @else
                                <div class="d-flex align-items-center justify-content-center" style="width: 100%;min-height: 200px">
                                   <b class="text-warning text-center">BELUM ADA PETUGAS YANG DITUNJUK UNTUK MELAKUKAN PENJEMPUTAN SAMPAH !</b>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-12">
            <div class="white_card card_height_100 mb_30 ">
                <div class="white_card_body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <td colspan="3">
                                        <b>SAMPAH</b>
                                    </td>
        
                                </tr>
                                <tr>
                                    <th>JENIS</th>
                                    <td>:</td>
                                    <td>{{ $data->sampah->nama }}</td>
                                </tr>
                                <tr>
                                    <th>HARGA / KG</th>
                                    <td>:</td>
                                    <td>{{ $data->sampah->harga }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <td colspan="3">
                                        <b>TRANSAKSI</b>
                                    </td>
        
                                </tr>
                                <tr>
                                    <th>KODE</th>
                                    <td>:</td>
                                    <td>{{ $data->kode }}</td>
                                </tr>
                                <tr>
                                    <th>STATUS</th>
                                    <td>:</td>
                                    <td>{{ $data->status }}</td>
                                </tr>
                                <tr>
                                    <th>BERAT</th>
                                    <td>:</td>
                                    <td>{{ $data->berat }}</td>
                                </tr>
                                <tr>
                                    <th>TOTAL</th>
                                    <td>:</td>
                                    <td>{{ $data->total }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="d-flex align-items-center justify-content-end">
                                @if ($data->petugas == null || $data->status != 'Batal')
                                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#pilih">Pilih petugas penjemputan</button>
                                    
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    <div class="modal fade" id="pilih" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form action="{{ url('admin/transaksi/pilihPetugas', $data->id) }}" method="post">
            @csrf
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="">Petugas</label>
                                <select name="id_petugas" id="" class="form-control">
                                    <option value="">--- Pilih ----</option>
                                    @foreach ($petugas as $dp)
                                    <option value="{{ $dp->id }}">{{ $dp->nama }}</option>
                                        
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">BATAL</button>
                    <button type="submit" class="btn btn-primary">SIMPAN</button>
                </div>
            </div>
           </form>
    </div>
                
    
    </div>
@endsection
