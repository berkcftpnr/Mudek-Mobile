import axios from 'axios';

export const API = axios.create({
  // baseURL:'mudek.ankara.edu.tr'
  baseURL: 'https://yazi-yorums.herokuapp.com'
  //  baseURL: 'http://192.168.1.23:4001'
})
