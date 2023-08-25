<nav class="sidebar">
    <div class="logo d-flex justify-content-between">
        <a class="large_logo" href="#"><img src="{{ url('public') }}/assets/img/logo.png" alt></a>
        <a class="small_logo" href="#"><img src="{{ url('public') }}/assets/img/mini_logo.png" alt></a>
        <div class="sidebar_close_icon d-lg-none">
            <i class="ti-close"></i>
        </div>
    </div>
    <ul id="sidebar_menu">
        
        <h4 class="menu-text"><span>LIST MENU</span></h4>
        <li>
            <a href="{{ url('admin/dashboard') }}" aria-expanded="false">
                <div class="nav_icon_small">
                    <i class="fa fa-home"></i>
                </div>
                <div class="nav_title">
                    <span>DASHBOARD</span>
                </div>
            </a>
        </li>
        <li>
            <a href="{{ url('admin/pelanggan') }}" aria-expanded="false">
                <div class="nav_icon_small">
                    <i class="fa fa-users"></i>
                </div>
                <div class="nav_title">
                    <span>DATA PELANGGAN</span>
                </div>
            </a>
        </li>
        <li>
            <a href="{{ url('admin/petugas') }}" aria-expanded="false">
                <div class="nav_icon_small">
                    <i class="fa fa-user"></i>
                </div>
                <div class="nav_title">
                    <span>DATA PETUGAS</span>
                </div>
            </a>
        </li>
        <li>
            <a href="{{ url('admin/sampah') }}" aria-expanded="false">
                <div class="nav_icon_small">
                    <i class="fa fa-user"></i>
                </div>
                <div class="nav_title">
                    <span>DATA SAMPAH</span>
                </div>
            </a>
        </li>
        <li>
            <a href="{{ url('admin/transaksi') }}" aria-expanded="false">
                <div class="nav_icon_small">
                    <i class="fa fa-user"></i>
                </div>
                <div class="nav_title">
                    <span>DATA TRANSAKSI</span>
                </div>
            </a>
        </li>
    </ul>
</nav>