

const db = firebase.firestore();
const storage = firebase.storage();

(function () {
  'use strict'

  document.querySelector('[data-toggle="offcanvas"]').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })
})()

