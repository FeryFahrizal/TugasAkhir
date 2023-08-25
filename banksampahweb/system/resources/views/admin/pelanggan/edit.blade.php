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
                                    <h3 class="m-0">EDIT DATA PELANGGAN</h3>
                                </div>
                            </div>
                        </div>
                        <div class="white_card_body QA_section">
                            <div class="QA_table ">

                                <form action="{{ url('admin/pelanggan/edit', $list->id) }}" method="post">
                                    @csrf
                                    <div class="row">
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label for="" class="d-block mb-2">Nama</label>
                                                <input type="text" name="nama" value="{{ $list->nama }}"
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
                                                <input type="text" name="tlp"  value="{{ $list->tlp }}"
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
                                        <div class="col-md-12 mb-3 form-alamat">
                                            <div class="input-alamat-group">
                                                <div class="form-group">
                                                    <label for="" class="d-block mb-2">Alamat</label>
                                                    <input type="text" id="alamat" name="alamat"  value="{{ $list->alamat }}"
                                                        class="form-control @error('alamat') is-invalid @enderror"
                                                        placeholder="Alamat ...">

                                                    <input type="hidden" id="lat" name="lat"  value="{{ $list->lat }}">
                                                    <input type="hidden" id="lng" name="lng"  value="{{ $list->lng }}">
                                                </div>
                                                @error('alamat')
                                                    <span class="text-danger">{{ $message }}</span>
                                                @enderror
                                            </div>
                                            <span class="btn btn-primary btn-openMap" data-bs-toggle="modal"
                                                data-bs-target="#openMap"><i class="fa fa-map"></i></span>
                                        </div>
                                        <div class="col-md-12  mb-3 mt-5">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <a href="{{ url('admin/pelanggan') }}" class="btn btn-warning">
                                                    BATAL
                                                </a>
                                                <button  class="btn btn-primary mx-3">
                                                    SIMPAN
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>



                        </div>

                        <!-- Modal -->
                        <div class="modal fade" id="openMap" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div style="padding: 24px !important">

                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="">Latitude</label>
                                                <input type="text" class="form-control" id="latmodal" value="{{ $list->lat }}" readonly
                                                    placeholder="Latitude" style="width: 100% !important;">
                                            </div>
                                            <div class="col-md-3">
                                                <label for="">Longitude</label>
                                                <input type="text" class="form-control" id="lngmodal" value="{{ $list->lng }}" readonly
                                                    placeholder="Latitude" style="width: 100% !important;">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="">Alamat</label>
                                                <input type="text" class="form-control" id="alamatmodal" readonly
                                                    placeholder="Alamat" style="width: 100% !important;" value="{{ $list->alamat }}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="maps" id="maps" style="width: 100%;height: 400px"></div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">KONFIRMASI
                                            ALAMAT</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                        <script
                            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&callback=initMap&v=weekly">
                        </script>
                        <script>
                            const myLatLng = {
                                lat:  {{ $list->lat }},
                                lng: {{ $list->lng }}
                            };
                            map = new google.maps.Map(document.getElementById("maps"), {
                                center: myLatLng,
                                zoom: 13.52,
                            });



                            const marker = new google.maps.Marker({
                                position: myLatLng,
                                map,
                                draggable: true

                            });
                            google.maps.event.addListener(marker, 'dragend', function(event) {
                                var lat = this.getPosition().lat().toFixed(7);
                                var lng = this.getPosition().lng().toFixed(7);

                                fetch(
                                        'https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng +
                                        '&key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k',
                                        options
                                    )
                                    .then(response => response.json())
                                    .then(function(response) {
                                            document.getElementById("latmodal").value = lat;
                                            document.getElementById("lngmodal").value = lng;
                                            document.getElementById("alamatmodal").value = response.results[0].formatted_address;
                                            document.getElementById("lat").value = lat;
                                            document.getElementById("lng").value = lng;
                                            document.getElementById("alamat").value = response.results[0].formatted_address;
                                        }

                                    )
                                    .catch(err => console.error(err));






                            });
                        </script>
                    @endsection
