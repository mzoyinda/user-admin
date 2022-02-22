import * as types from './actionType';
import axios from "axios";

// local api server 
const apiUrl = 'http://localhost:5000/users';

//actions
const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const userAdded = () => ({
    type: types.ADD_USER
})

const getEdited = (user) => ({
    type: types.EDIT_USER,
    payload: user,
});

const userUpdated = () => ({
    type: types.UPDATE_USER
})

const userDeleted = () => ({
    type: types.DELETE_USER
})


//get users data
export const loadUsers = () => {
    return function (dispatch) {
        axios
            .get(`${apiUrl}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUsers(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

//add users 
export const addUser = (user) => {
    return function (dispatch) {
        axios
            .post(`${apiUrl}`, user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userAdded());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

//edit users
export const editUser = (id) => {
    return function (dispatch) {
        axios
            .get(`${apiUrl}/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getEdited(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

//update users
export const updateUser = (user, id) => {
    return function (dispatch) {
        axios
            .put(`${apiUrl}/${id}`, user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userUpdated());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

//delete users
export const deleteUser = (id) => {
    return function (dispatch) {
        axios
            .delete(`${apiUrl}/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userDeleted());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};