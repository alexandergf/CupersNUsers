<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @yield('extrameta')
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'CupersNUsers') }}</title>

    <!-- Scripts -->


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
    <style media="screen">
      .vertical-center {
        margin: auto;
        position: absolute;
        left: 50%;
        top:40%;
        transform: translate(-50%);
      }
    </style>
</head>
  <div class="container">
      <div class="row justify-content-center">
          <div class="col-md-8 vertical-center">
              <div class="card">
                  <div class="card-header" style="color:red;">
                      Error
                  </div>

                  <div class="card-body">
                    <p>Parece que el pago no se ha realizado correctamente</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
