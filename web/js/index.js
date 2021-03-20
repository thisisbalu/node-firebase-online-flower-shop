$(document).ready(function () {
    // logic here is we are trying to get the user from the browser storage (memory)
    // If we find it it means user is logged in so lets send directly to welcome.html
    // else let him login
    // We use the similar logc also to avoid user to access the pages without logging in
    const USER_LOGGED_IN = localStorage.getItem('FLOWER-SHOP-LOGGED-IN-USER');
    if(!!USER_LOGGED_IN) {
        window.location.href = "/welcome.html";
    }
});