import axios from "axios";

const API_URL = "http://192.168.1.21:8080";
function callApi(endpoint, method = "GET", body) {
    return axios({

        method,
        url: `${API_URL}/api/${endpoint}`,
        data: body,

    }).catch((e) => {
        console.log(e);
        throw e;
    });
}
export function GET_ALL(endpoint) {
    return callApi(endpoint, "GET");
}
export function DELETE_ALL(endpoint) {
    return callApi(endpoint, "DELETE");
}

export function POST(endpoint) {
    return callApi(endpoint, "POST");
}
export function GET_IMG(imgName) {
    return API_URL + "/api/img/" + imgName;
}

export function PostCart(cartDetail) {
    return callApi("cartdetail/store", "POST", cartDetail);
}
export function PostOder(oderDetail) {
    return callApi("order-details", "POST", oderDetail);
}
export function PostWishList(wishList) {
    return callApi("wishlist/store", "POST", wishList);
}
export function LoginUser(username, password) {
    return callApi('auth/login', 'POST', { username, password });
}
export function UpdateUser(userid, updatedData) {
    return callApi(`users/update/${userid}`, 'PUT', updatedData);
}
export function Sreach(query) {
    return callApi(`product/search?query=${query}`, 'GET');
}
export function Email(updatedData) {
    return callApi(`email/success`, 'POST', updatedData);
}



export function RegisterUser(username, email, password, role) {
    return callApi('auth/register', 'POST', { username, email, password, role });
}

export function GetUserIdByEmailAndUsername(email, username) {
    return callApi(`users/id?email=${email}&username=${username}`, 'GET');
}