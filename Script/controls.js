
$(document).ready(function () {
    var $tel = $("#txtTelefone");
    $tel.mask('(00) 00000-0000', { reverse: false });

    var $tel = $("#txtTelefone_conj");
    $tel.mask('(00) 00000-0000', { reverse: false });

    var $cpf = $("#txtCpf");
    $cpf.mask('000.000.000-00', { reverse: false });

});

