@extends('layout.app')
@section('title', 'TRANSAKSI')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                <div class="page_title_left">
                    <h3 class="f_s_25 f_w_700 dark_text">DATA TRANSAKSI</h3>

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
                                                <center>Pelanggan</center>
                                            </th>
                                            <th>
                                                <center>Petugas</center>
                                            </th>
                                            <th>
                                                <center>Sampah</center>
                                            </th>
                                            <th>
                                                <center>Tanggal</center>
                                            </th>
                                            <th>
                                                <center>Status</center>
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
                                                    <center>
                                                        @if ($item->pelanggan != null )
                                                        {{ $item->pelanggan->nama }}
                                                        @else
                                                            -
                                                        @endif
                                                    </center>
                                                </td>
                                                <td>
                                                    <center>
                                                        @if ($item->petugas != null )
                                                            {{ $item->petugas->nama }}
                                                        @else
                                                            Petugas belum dipilih !
                                                        @endif
                                                    </center>
                                                </td>
                                                <td>
                                                    <center>{{ $item->sampah->nama }}</center>
                                                </td>
                                                <td>
                                                    <center>{{ \Carbon\Carbon::parse($item->created_at)->diffForHumans() }}</center>
                                                </td>
                                                <td>
                                                    <center style="display: flex;align-items:center">
                                                        @if ($item->status == 'Baru')
                                                            <span style="width: 15px;height:15px; display: block; background: #f59e0b; border-radius:50%; margin-right: 12px"></span>
                                                            {{ $item->status }}
                                                            @elseif($item->status == 'Proses')
                                                            <span style="width: 15px;height:15px; display: block; background: #14b8a6; border-radius:50%; margin-right: 12px"></span>
                                                            {{ $item->status }}
                                                            @elseif($item->status == 'Selesai')
                                                            <span style="width: 15px;height:15px; display: block; background: #10b981; border-radius:50%; margin-right: 12px"></span>
                                                            {{ $item->status }}
                                                            @elseif($item->status == 'Batal')
                                                            <span style="width: 15px;height:15px; display: block; background: #ef4444; border-radius:50%; margin-right: 12px"></span>
                                                            {{ $item->status }}
                                                        @endif
                                                       
                                                    </center>
                                                </td>
                                                <td>
                                                    <center>
                                                        <div class="btn-group">
                                                            <a href="{{ url('admin/transaksi/detail',$item->id) }}"
                                                                class="btn btn-sm btn-warning" > <i
                                                                    class="fa fa-info"></i> </a>
                                                            
                                                            <a href="{{ url('admin/transaksi/hapus',$item->id) }}" class="btn btn-sm btn-danger" onclick="return confirm('Yakin ingin menghapus data ini ?!')"> <i
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
