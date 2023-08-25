@extends('layout.app')
@section('title', 'DASHBOARD')
    
@section('content')

<div class="row ">
    <div class="col-xl-12">
        <div class="white_card card_height_100 mb_30 social_media_card">
            <div class="white_card_header">
                <div class="main-title">
                    <h3 class="m-0">DASHBOARD BANK SAMPAH</h3>
                    <span>Selamat datang admin, dan selamat bekerja !</span>
                </div>
            </div>
            <div class="media_thumb ml_25">
                <img src="{{ url('public') }}/assets/img/media.svg" alt>
            </div>
            <div class="media_card_body">
                <div class="media_card_list">
                    
                    <div class="single_media_card">
                        <span>TRANSAKSI BARU</span>
                        <h3>{{ $baru }}</h3>
                    </div>
                    <div class="single_media_card">
                        <span>TRANSAKSI PROSES</span>
                         <h3>{{ $proses }}</h3>
                    </div>
                    <div class="single_media_card">
                        <span>TRANSAKSI SELESAI</span>
                         <h3>{{ $selesai }}</h3>
                    </div>
                    <div class="single_media_card">
                        <span>TRANSAKSI BATAL</span>
                         <h3>{{ $batal }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection