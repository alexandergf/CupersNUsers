<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class MainController extends Controller
{
    //


    public function data_to_request(Request $request)
    {
        if($request->has('data'))
        {
          $request = $request->input('data');
          return new Request(json_decode($request, true));
        } else {
          return $request;
        }
    }

    public function correctResponse($response = null)
    {
        $response = $response?? "";
        return response()->json([
            'rc'           => 0,
            'data'         => $response,

        ]);
    }

    public function incorrectResponse($errorCode = 1,$response = null,$aditional=null)
    {
        // Si el response es null entonces damos el mensaje del código de error
        $response = $response?? Config::get('errors_abalit.'.$errorCode);
        return response()->json([
            'rc'           => $errorCode,
            'data'         => $response,
            'aditional'    => $aditional,

        ]);
    }
}
