@extends('layout.app')
@section('title', 'PELANGGAN')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                <div class="page_title_left">
                    <h3 class="f_s_25 f_w_700 dark_text">DATA PELANGGAN</h3>

                </div>
                
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-xl-12">
            <div class="white_card card_height_100 mb_30 ">
                <div class="row">
                    <div class="col-lg-12">

                        <div class="white_card_body QA_section">
                            <div class="QA_table ">

                                <table class="table lms_table_active2 p-0">
                                    <thead>
                                        <tr>
                                            <th>
                                                <center>No.</center>
                                            </th>
                                            <th>
                                                <center>Nama</center>
                                            </th>
                                            <th>
                                                <center>Telepon</center>
                                            </th>
                                            <th>
                                                <center>Password</center>
                                            </th>
                                            <th>
                                                <center>Alamat</center>
                                            </th>
                                            <th>
                                                <center>Aksi</center>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($list as $item)
                                            <tr>
                                                <td>
                                                    <center>{{ $loop->iteration }}</center>
                                                </td>
                                                <td>
                                                    <center>{{ $item->nama }}</center>
                                                </td>
                                                <td>
                                                    <center>{{ $item->tlp }}</center>
                                                </td>
                                                <td>
                                                    <center>{{ Str::limit($item->password, 20) }}</center>
                                                </td>
                                                <td>
                                                    <center>{{ Str::limit($item->alamat, 20) }}</center>
                                                </td>
                                                <td>
                                                    <center>
                                                        <div class="btn-group">
                                                            <a href="{{ url('admin/pelanggan/detail',$item->id) }}"
                                                                class="btn btn-sm btn-warning" > <i
                                                                    class="fa fa-info"></i> </a>
                                                            
                                                            <a href="{{ url('admin/pelanggan/hapus',$item->id) }}" class="btn btn-sm btn-danger" onclick="return confirm('Yakin ingin menghapus data ini ?!')"> <i
                                                                    class="fa fa-trash"></i> </a>
                                                        </div>
                                                    </center>
                                                </td>
                                            </tr>


                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
