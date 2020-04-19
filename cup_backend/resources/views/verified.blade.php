@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Exito
                </div>
                <form action="{{url('/verified/finally')}}" method="POST">
                     {{ csrf_field() }}
                <input type="hidden" name="token" value="{{$token}}">
                <input type="hidden" name="email" value="{{$email}}">
                <div class="card-body">
                  <div class="form-group row">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Escribe tu nueva contraseña: </label>

                      <div class="col-md-6">
                          <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password"  required  autofocus>


                      </div>
                  </div>

                  <div class="form-group row mb-0">
                      <div class="col-md-8 offset-md-4">
                          <button type="submit" class="btn btn-primary">
                              Resetear Contraseña
                          </button>

                      </div>
                  </div>
                </div>
              </form>
            </div>
        </div>
    </div>
</div>
@endsection
