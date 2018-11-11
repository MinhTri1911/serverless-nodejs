/**
 * Check enable cookie and local storage
 * @return {boolean}
 */
function checkCookieLocalStorage(){
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    document.cookie = "xv12F3gF_757AbGHjk=1";
    document.cookie = document.cookie.replace("xv12F3gF_757AbGHjk=1", "");
    return true;
  } catch(e) {
    return false;
  }
}

/**
 * Check cookie enable of browser
 */
if(!checkCookieLocalStorage()){
  alert('Cookie was disabled. Please enable cookie and reload again!');
}
