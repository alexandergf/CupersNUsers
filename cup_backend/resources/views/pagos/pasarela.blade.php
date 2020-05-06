@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Confirmar que vas a realizar la siguiente operación de <strong>{{($tpv->amount)/100 }} €</strong>
                </div>

                <div class="card-body">
                  <form id="realizarPago" action="{{$tpv->url}}" method="post" target="_parent">
                      <input type='hidden' name='Ds_SignatureVersion' value='{{$tpv->version}}'>
                      <input type='hidden' name='Ds_MerchantParameters' value='{{$tpv->createMerchantParameters()}}'>
                      <input type='hidden' name='Ds_Signature' value='{{$tpv->createMerchantSignature($tpv->clave)}}'>
                      <input class="btn btn-lg btn-primary btn-block" type="submit" name="submitPayment" value="PAGO SEGURO CON TARJETA" />
                  </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
