import CryptoJS from 'crypto-js';


const BD_URL = CryptoJS.AES.encrypt("http://localhost:5000", "secret_key").toString();
const GOOGLE_API_KEY = CryptoJS.AES.encrypt("AIzaSyDncQxwYBorZLmPKjdbzvwO7mM7UP_j-qs", "secret_key").toString();
const GOOGLE_CSE_ID = CryptoJS.AES.encrypt("9431fc874dac04875", "secret_key").toString();

export { BD_URL, GOOGLE_API_KEY, GOOGLE_CSE_ID };