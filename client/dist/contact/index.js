"use strict";
const userEmailElement3 = document.getElementById('loginNav');
const username13 = localStorage.getItem('username');
if (username13) {
    userEmailElement3.innerHTML = `${username13}`;
}
else {
    window.location.href = '../login/index.html';
}
