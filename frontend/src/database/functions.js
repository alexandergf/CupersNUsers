import { instance } from './config';
import axios from 'axios';

export const detailProduct = async (id) => {
    let result=[];
    await axios.post("/product/detail", {"product_id": id}, instance)
        .then((response) => {
            result = response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return result;
};

export const getOpinions = async (id) => {
    let direccion = "";
    let point = 0;
    let opinions = [];
    id === -1 ? direccion = "/user/getReviews" : direccion = "/product/getReviews";
    await axios.post(direccion, {"product_id": id}, instance)
        .then((response) => {
            response.data.data.map((opinion,index) => 
                point+=opinion.rate
            )
            point/=response.data.data.length;
            opinions= response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return [opinions, point];
}

export const addWishItem = async (id) => {
    let result = false;
    let error401 = false;
    await axios.post('/wishlist/toggleProduct', {"product_id": id}, instance)
          .then(function (response) {
                if(response.data.data){
                    result = true;
                }
          })
          .catch(function (error) {
            if(error.response.status === 401){
                error401 = true;
            }
          });
    return [result, error401];
}

export const cartItem = async (id, quantity) => {
    let result = false;
    let error401 = false;
    await axios.post('/cart/toggleProduct', {
        "product_id": id,
        "quantity": quantity
      }, instance)
      .then(function (response) {
            result = (response.data.data);
      })
      .catch(function (error) {
        if(error.response.status === 401){
            error401 = true;
        }
    });
    
    return [result, error401];
}