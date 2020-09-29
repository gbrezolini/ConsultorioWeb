//
// Valida o preenchimento dos campos da tela
//
function validarForm(frm) {
    // Acessa o conteúdo pelo formulário passado como parametro
    if (frm.nomeCompleto.value == "" || frm.nomeCompleto.value == null) {
        alert("Nome não informado");
        frm.nomeCompleto.focus();
        return false;
    }


    // Se email preenchido verifica se é válido    
    if ((frm.email.value != "") && (frm.email.value != null)) {
        if (frm.email.value.indexOf("@") == -1 || frm.email.value.indexOf(".") == -1) {
            alert("Por favor, indique um e-mail válido.");
            frm.email.focus();
            return false;
        }
    }

    if (($("#listaEstadoCivil option:selected").val() == "casado") && ($("#txtNomeConjuge").val() == "")) {
        alert("Por favor, informe o nome do cônjuge.");
        $("#txtNomeConjuge").focus();
        return false;
    }

    // Limpar o campo de nome do conjuge.
    if (($("#listaEstadoCivil option:selected").val() != "casado") && ($("#txtNomeConjuge").val() != "")) {
        $("#txtNomeConjuge").val("");
    }

    return true;

};


