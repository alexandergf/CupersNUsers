<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderProduct;
use App\UserCart;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;

class OrderController extends MainController
{
    //
    public function set(Request $request) {
        $request = $this->data_to_request($request);
        $user = auth()->user();
        // Price
        $user_cart = new UserCart();

        $price = $user_cart->price($user->id);
        if ($price == 0 ) {
            return $this->incorrectResponse();
        }

        $order = new Order();
        $order->order_token = $this->generateToken();
        $order->price = $price;
        $order->user_id = $user->id;
        $order->status_id = 1;
        $order->save();

        $user_cart->exportToOrder($user->id, $order->id);

        $order_products = OrderProduct::with('product')->where('order_id', '=', $order->id)->get();
        $items = [];

        foreach ($order_products as $order_product) {
            $item = [
                "name" => $order_product->product->name,
                "price" => $order_product->product->price,
                "desc" => $order_product->product->description,
                "qty" => $order_product->quantity,
            ];
            array_push($items, $item);
        }

        $data = [];
        $data['items'] = $items;

        $data['invoice_id'] = $order->id;
        $data['invoice_description'] = "Order #{$data['invoice_id']} Invoice";
        $data['return_url'] = route('payment.success');
        $data['cancel_url'] = route('payment.cancel');
        
        $data['total'] = $order->price;

        $provider = new ExpressCheckout;
        $response = $provider->setExpressCheckout($data);
        return $this->correctResponse(['link' => $response['paypal_link']]);

    }

    public function cancel(Request $request)
    {
        return view("pagos/KO");
    }

    public function success(Request $request)
    {
        $provider = new ExpressCheckout;

        $response = $provider->getExpressCheckoutDetails($request->token);

        $token = $response['TOKEN'];
        $PayerID = $response['PAYERID'];
        $order = Order::where('id', '=', $response['PAYMENTREQUEST_0_INVNUM'])->first();

        $order_products = OrderProduct::with('product')->where('order_id', '=', $order->id)->get();
        $items = [];

        foreach ($order_products as $order_product) {
            $item = [
                "name" => $order_product->product->name,
                "price" => $order_product->product->price,
                "desc" => $order_product->product->description,
                "qty" => $order_product->quantity,
            ];
            array_push($items, $item);
        }

        $data = [];
        $data['items'] = $items;

        $data['invoice_id'] = $order->id;
        $data['invoice_description'] = "Order #{$data['invoice_id']} Invoice";
        $data['return_url'] = route('payment.success');
        $data['cancel_url'] = route('payment.cancel');
        $data['total'] = $order->price;


        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            $response2 = $provider->doExpressCheckoutPayment($data, $token, $PayerID);
            if (in_array(strtoupper($response2['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
              $order->status_id = 2;
              $order->paypal_token = $response2['PAYMENTINFO_0_TRANSACTIONID'];
              $order->save();

              return view("pagos/OK");
            }
            
        }

        return  view("pagos/KO");
    }

    public function generateToken()
    {
        return substr(md5(rand(1, 10) . microtime()), 0, 10);
    }

    public function getHistory(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
        $user = auth()->user();

        return Order::where('user_id', '=', $user->id)->get();
    }
}
