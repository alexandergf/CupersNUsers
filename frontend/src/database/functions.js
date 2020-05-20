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

export const totalRemoveCartItems = async () => {
    let resultRemove = false;
    await axios.post('/cart/deleteAll', {}, instance)
          .then(function (response) {
            resultRemove = true;
          })
          .catch(function (error) {
            resultRemove=false;
          }); 
    return resultRemove; 
}

export const userGetCart = async () => {
    let result = [];
    await axios.post('/user/getCart', {}, instance)
        .then(function (response) {
            result = response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    return result;
}

export const userChangePass = async (oldPass, newPass) => {
    let result = false;
    await axios.post('/user/changePassword', {
        "old_password": oldPass,
        "password": newPass.toString()
      }, instance)
      .then(function (response) {
        if(response.data.data !== null){
            result = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
    return result;
}

export const userEdit = async (dataUser) => {
    let result = false;
    await axios.post('/user/edit', dataUser, instance)
        .then(function (response) {
            if(response.data.data !== null) {
                result=true;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    return result;
}

export const getProductByCategory = async (id) => {
    let result = [];
    let direccion =  (id === -1 ? "/product/getAll" : "/product/getByCategory");
    await axios.post(direccion, {"category_id": id}, instance)
    .then((response) => {
        result = response.data.data;
    })
    .catch(function (error) {
        console.log(error);
    });

    return result;
}

export const getCateorys = async () => {
    let result = [];
    await axios.post('/product/getCategories', {}, instance)
    .then((response) => {
        result = response.data.data;
    })
    .catch(function (error) {
        console.log(error);
    });

    return result;
}

export const userLog = async (email, password) => {
    let result = null;
    let show = false;
    await axios.post('/user/login', {
        email: email,
        password: password
      }, instance)
      .then(function (response) {
        if(response.data.data !== null){
            result = response.data.data.token;
        }else{
            show = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return [result, show];
}

export const forgotPass = async (email) => {
    let result = [];
    await axios.post('/user/forget', {
        "email": email
      }, instance)
      .then(function (response) {
        console.log(response);
        result = response;
      })
      .catch(function (error) {
        console.log(error);
      });

      return result;
}