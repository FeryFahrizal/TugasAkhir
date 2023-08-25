@extends('layout.app')
@section('title', 'PELANGGAN')
@section('content')
    <style>
        .maps {
            width: 100%;
            height: 300px;
        }
    </style>

    <div class="row">
        <div class="col-12">
            <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                <div class="page_title_left">
                    <h3 class="f_s_25 f_w_700 dark_text">PROFILE</h3>

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
                                    <th>Nama</th>
                                    <td>:</td>
                                    <td>{{ $admin->nama }}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>:</td>
                                    <td>{{ $admin->email }}</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td>:</td>
                                    <td>{{ $admin->password }}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="d-flex align-items-center justify-content-end">
                                                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#pilih">EDIT PROFILE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
      

    </div>
    
    <div class="modal fade" id="pilih" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form action="{{ url('admin/profile/update', $admin->id) }}" method="post">
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
                                <label for="">Nama</label>
                                <input type="text" name="nama" value="{{ $admin->nama }}" class="form-control" placeholder="Email ..." required autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="email" name="email" value="{{ $admin->email }}" class="form-control" placeholder="Email ..." required autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="password" name="password" class="form-control" placeholder="Passsword ..." autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">BATAL</button>
                    <button type="submit" class="btn btn-primary">UPDATE</button>
                </div>
            </div>
           </form>
    </div>
                
    
    </div>
@endsection
