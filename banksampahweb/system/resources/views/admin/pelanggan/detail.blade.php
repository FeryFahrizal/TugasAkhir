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
                    <h3 class="f_s_25 f_w_700 dark_text">DETAIL PELANGGAN</h3>

                </div>

            </div>
        </div>
    </div>
    </div>
    <div class="row ">
        <div class="col-xl-8">
            <div class="white_card card_height_100 mb_30 ">
                <div class="white_card_body">
                    <table class="table">
                        <tr>
                            <th>Nama</th>
                            <td>:</td>
                            <td>{{ $list->nama }}</td>
                        </tr>
                        <tr>
                            <th>Telepon</th>
                            <td>:</td>
                            <td>{{ $list->tlp }}</td>
                        </tr>
                        <tr>
                            <th>Alamat</th>
                            <td>:</td>
                            <td>{{ $list->alamat }}</td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td>:</td>
                            <td>{{ $list->password }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-xl-12">
            <div class="white_card card_height_100 mb_30 ">
                <div class="white_card_body">
                    <div class="maps" id="maps"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k&callback=initMap&v=weekly">
    </script>
    <script>
        var lat = {{ $list->lat }};
        var lng = {{ $list->lng }};
        var alamat = `{{ $list->alamat }}`;
        const myLatLng = {
            lat: lat,
            lng: lng
        };
        map = new google.maps.Map(document.getElementById("maps"), {
            center: myLatLng,
            zoom: 15,
        });

        const infowindow = new google.maps.InfoWindow({
            content: alamat,
            ariaLabel: "Uluru",
        });

        const marker = new google.maps.Marker({
            position: myLatLng,
            map,
            title: "Hello World!",
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
            });
        });
    </script>
@endsection
