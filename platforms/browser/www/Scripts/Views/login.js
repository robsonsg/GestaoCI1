$(document).ready(function () {

    // BASE URL CONFIG
    if (window.location.hostname == "localhost") var baseUrl = "http://argentina.2tti.com.br:8095/SysCareREST/api";
    else var baseUrl = window.location.protocol + "//" + window.location.host + "/SysCareREST/api";
    var user = $('#user').val();

    // EXCLUSÃO DE TODOS OS DADOS ARMAZENADOS NA SESSION
    sessionStorage.clear();
    sessionStorage.removeItem('pass');
    sessionStorage.setItem('user', $('#user').val());

    $(".entrar").on("click", function () {
       // loading();
    });
    
    function waiting() {
        $("#waiting").css({
            display: "block"
        }).addClass("show");
    };

    function closeWaiting() {
        setTimeout(function () {
            $("#waiting").css({
                display: "none"
            }, 2000);
        });
    };
});