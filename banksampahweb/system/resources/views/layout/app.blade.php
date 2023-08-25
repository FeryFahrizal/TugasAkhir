<!DOCTYPE html>
<html lang="zxx">

<head>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>@yield('title')</title>
    <link rel="icon" href="{{ url('public') }}/assets/{{ url('public') }}/assets/img/mini_logo.png" type="image/png">

    <link rel="stylesheet" href="{{ url('public') }}/assets/css/bootstrap1.min.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/themefy_icon/themify-icons.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/niceselect/css/nice-select.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/owl_carousel/css/owl.carousel.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/gijgo/gijgo.min.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/font_awesome/css/all.min.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/tagsinput/tagsinput.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/datepicker/date-picker.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/vectormap-home/vectormap-2.0.2.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/scroll/scrollable.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/datatable/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/datatable/css/responsive.dataTables.min.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/datatable/css/buttons.dataTables.min.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/text_editor/summernote-bs4.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/morris/morris.css">

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/material_icon/material-icons.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/css/metisMenu.css">

    <link rel="stylesheet" href="{{ url('public') }}/assets/css/style1.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/css/colors/default.css" id="colorSkinCSS">
</head>

<body class="crm_body_bg">


    @include('layout.sidebar')

    <section class="main_content dashboard_part large_header_bg">


        @include('layout.navbar')

        <div class="main_content_iner overly_inner ">
            <div class="container-fluid p-0 ">

                @foreach (['success', 'danger', 'warning', 'info'] as $status)
                    @if (session($status))
                        <div class="notif-custom">
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <p>{{ session($status) }}</p>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                    @endif
                @endforeach
                @yield('content')
            </div>

        </div>

        <div class="footer_part">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer_iner text-center">
                            <p>2020 © Influence - Designed by <a href="#"> <i class="ti-heart"></i> </a><a
                                    href="#"> DashboardPack</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    <div id="back-top" style="display: none;">
        <a title="Go to Top" href="#">
            <i class="ti-angle-up"></i>
        </a>
    </div>

    <script src="{{ url('public') }}/assets/js/jquery1-3.4.1.min.js"></script>

    <script src="{{ url('public') }}/assets/js/popper1.min.js"></script>

    <script src="{{ url('public') }}/assets/js/bootstrap1.min.js"></script>

    <script src="{{ url('public') }}/assets/js/metisMenu.js"></script>

    <script src="{{ url('public') }}/assets/vendors/count_up/jquery.waypoints.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/chartlist/Chart.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/count_up/jquery.counterup.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/niceselect/js/jquery.nice-select.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/owl_carousel/js/owl.carousel.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/datatable/js/jquery.dataTables.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/dataTables.responsive.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/dataTables.buttons.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/buttons.flash.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/jszip.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/pdfmake.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/vfs_fonts.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/buttons.html5.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datatable/js/buttons.print.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/datepicker/datepicker.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datepicker/datepicker.en.js"></script>
    <script src="{{ url('public') }}/assets/vendors/datepicker/datepicker.custom.js"></script>
    <script src="{{ url('public') }}/assets/js/chart.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/chartjs/roundedBar.min.js"></script>

    <script src="{{ url('public') }}/assets/vendors/progressbar/jquery.barfiller.js"></script>

    <script src="{{ url('public') }}/assets/vendors/tagsinput/tagsinput.js"></script>

    <script src="{{ url('public') }}/assets/vendors/text_editor/summernote-bs4.js"></script>
    <script src="{{ url('public') }}/assets/vendors/am_chart/amcharts.js"></script>

    <script src="{{ url('public') }}/assets/vendors/scroll/perfect-scrollbar.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/scroll/scrollable-custom.js"></script>

    <script src="{{ url('public') }}/assets/vendors/vectormap-home/vectormap-2.0.2.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/vectormap-home/vectormap-world-mill-en.js"></script>

    <script src="{{ url('public') }}/assets/vendors/apex_chart/apex-chart2.js"></script>
    <script src="{{ url('public') }}/assets/vendors/apex_chart/apex_dashboard.js"></script>
    <script src="{{ url('public') }}/assets/vendors/echart/echarts.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/chart_am/core.js"></script>
    <script src="{{ url('public') }}/assets/vendors/chart_am/charts.js"></script>
    <script src="{{ url('public') }}/assets/vendors/chart_am/animated.js"></script>
    <script src="{{ url('public') }}/assets/vendors/chart_am/kelly.js"></script>
    <script src="{{ url('public') }}/assets/vendors/chart_am/chart-custom.js"></script>

    <script src="{{ url('public') }}/assets/js/dashboard_init.js"></script>
    <script src="{{ url('public') }}/assets/js/custom.js"></script>
    <script>
        setTimeout(() => {
            $('.alert').removeClass('show')
        }, 2000);
    </script>
</body>

<!-- Mirrored from demo.dashboardpack.com/analytic-html/ by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 16 Jun 2023 19:32:34 GMT -->

</html>
