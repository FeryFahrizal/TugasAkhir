<!DOCTYPE html>
<html lang="zxx">

<!-- Mirrored from demo.dashboardpack.com/analytic-html/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 16 Jun 2023 19:32:52 GMT -->

<head>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Analytic</title>
    <link rel="icon" href="img/mini_logo.png" type="image/png">

    <link rel="stylesheet" href="{{ url('public') }}/assets/css/bootstrap1.min.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/themefy_icon/themify-icons.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/font_awesome/css/all.min.css" />


    <link rel="stylesheet" href="{{ url('public') }}/assets/vendors/scroll/scrollable.css" />

    <link rel="stylesheet" href="{{ url('public') }}/assets/css/metisMenu.css">

    <link rel="stylesheet" href="{{ url('public') }}/assets/css/style1.css" />
    <link rel="stylesheet" href="{{ url('public') }}/assets/css/colors/default.css" id="colorSkinCSS">
</head>

<body class="crm_body_bg login-screen">
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
    <form action="{{ url('/loginAksi') }}" method="POST">
        @csrf
        <div class="login-box">
            <div class="login-header">
                <h2>LOGIN BANK SAMPAH</h2>
            </div>
            <div class="login-body">
                <div class="form-group">
                    <label for="">Email</label>
                    <input type="email" name="email" class="form-control" placeholder="Email ..." required autocomplete="off">
                </div>
                <div class="form-group form-password">
                    <label for="">Password</label>
                    <input type="password" name="password" class="form-control form-password" placeholder="Password ..." required autocomplete="off">
                    <input type="checkbox" class="checkbox password-icons">
                    <span class="password-iconss">
                        <i class="fa"></i>
                    </span>
                </div>
            </div>
            <div class="login-footer">
                <button class="btn btn-primary">SIGN-IN</button>
            </div>
        </div>
    </form>
    <script src="{{ url('public') }}/assets/js/jquery1-3.4.1.min.js"></script>

    <script src="{{ url('public') }}/assets/js/popper1.min.js"></script>

    <script src="{{ url('public') }}/assets/js/bootstrap1.min.js"></script>

    <script src="{{ url('public') }}/assets/js/metisMenu.js"></script>

    <script src="{{ url('public') }}/assets/vendors/scroll/perfect-scrollbar.min.js"></script>
    <script src="{{ url('public') }}/assets/vendors/scroll/scrollable-custom.js"></script>

    <script src="{{ url('public') }}/assets/js/custom.js"></script>
    
    <script>
        $(document).ready(function(){		
            $('.fa').addClass('fa-eye-slash')
            $('.password-icons').click(function(){
                if($(this).is(':checked')){
                    $('.form-password').attr('type','text');
                    $('.fa').addClass('fa-eye').removeClass('fa-eye-slash')
                }else{
                    $('.form-password').attr('type','password');
                    $('.fa').addClass('fa-eye-slash').removeClass('fa-eye')
                }
            });
            setTimeout(() => {
                $('.alert').removeClass('show')
            }, 2000);
        });

    </script>
</body>

<!-- Mirrored from demo.dashboardpack.com/analytic-html/login.html by HTTrack Website Copier/3.x [XR&CO'2014], Fri, 16 Jun 2023 19:32:52 GMT -->

</html>
