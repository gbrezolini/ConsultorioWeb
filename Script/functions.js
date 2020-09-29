function Carregar() {
    var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto
    if (tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];

    return tbClientes;
}

function Listar() {

    // localStorage.clear();

    // Cabeçalho
    $("#tblListar").html("");
    $("#tblListar").html(
        "<thead>" +
        "   <tr style='text-align: left'>" +
        "       <th>Código</th>" +
        "       <th width='20%'>Nome</th>" +
        "       <th>Endereço</th>" +
        "       <th>Telefone</th>" +
        "       <th>CPF</th>" +
        "       <th colspan='2' align='center' width='10%'>Ação</th>" +
        "   </tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
    );

    // Lista de pacientes
    var tbClientes = Carregar();

    for (var i in tbClientes) {
        var cli = JSON.parse(tbClientes[i]);

        // $("#tblListar tbody").append("<tr style='background-color:darkgray'>");
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append("<td>" + cli.Codigo + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Nome + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Endereco + "</td>");
        $("#tblListar tbody").append("<td>" + cli.Telefone + "</td>");
        $("#tblListar tbody").append("<td>" + cli.CPF + "</td>");
        $("#tblListar tbody").append("<td align='center'>" + 
            "<a href='../Pages/pacienteEdit.html' style='text-decoration: none;' onclick='javascript: selecionarRegistro(this);' alt='"+i+"'>Editar&nbsp;|&nbsp;</a>" +
            "<a href='../Pages/pacienteDelete.html' style='text-decoration: none;' onclick='javascript: selecionarRegistro(this);' alt='"+i+"'>Excluir</a> </td>");
        $("#tblListar tbody").append("</tr>");


        console.log("estado " + cli.Estado);
    }
}

function proximoCodigo() {
    var tbClientes = Carregar();

    var proximoCodigo = 0;

    if (tbClientes.length != 0) {
        proximoCodigo = JSON.parse(tbClientes[tbClientes.length - 1]).Codigo;
        if (proximoCodigo == null) {
            proximoCodigo = 0;
        }
    }

    return parseInt(proximoCodigo) + 1;
}

function Adicionar() {

    var cliente = JSON.stringify({
        Codigo: proximoCodigo(),
        Nome: $("#txtNome").val(),
        CPF: $("#txtCpf").val(),
        RG: $("#txtRg").val(),
        Endereco: $("#txtEndereco").val(),
        Numero: $("#txtNumero").val(),
        Bairro: $("#txtBairro").val(),
        Telefone: $("#txtTelefone").val(),
        DataNascimento: $("#txtDataNascimento").val(),
        Profissao: $("#txtProfissao").val(),
        Email: $("#txtEmail").val(),
        Estado: $("#listaEstado option:selected").text(),
        Cidade: $("#listaCidade option:selected").text(),
        EstadoCivil: $("#listaEstadoCivil option:selected").text(),
        Convenio: $("#listaConvenio option:selected").text(),
        NomeConjuge: $("#txtNomeConjuge").val(),
        TelefoneConjuge: $("#txtTelefone_conj").val()
    });

    var tbClientes = Carregar();

    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Cadastro realizado com sucesso!");
    return true;
}


function Editar() {
    var tbClientes = Carregar();
    var i = window.localStorage.getItem("indicePaciente");

    tbClientes[i] = JSON.stringify({
        Codigo: $("#txtCodigo").val(),
        Nome: $("#txtNome").val(),
        CPF: $("#txtCpf").val(),
        RG: $("#txtRg").val(),
        Endereco: $("#txtEndereco").val(),
        Numero: $("#txtNumero").val(),
        Bairro: $("#txtBairro").val(),
        Telefone: $("#txtTelefone").val(),
        DataNascimento: $("#txtDataNascimento").val(),
        Profissao: $("#txtProfissao").val(),
        Email: $("#txtEmail").val(),
        Estado: $("#listaEstado option:selected").text(),
        Cidade: $("#listaCidade option:selected").text(), 
        EstadoCivil: $("#listaEstadoCivil option:selected").text(),
        Convenio: $("#listaConvenio option:selected").text(),
        NomeConjuge: $("#txtNomeConjuge").val(),
        TelefoneConjuge: $("#txtTelefone_conj").val()
    });//Altera o item selecionado na tabela
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Alterações realizadas com sucesso");

    // Limpar a sessão do indice
    window.localStorage.removeItem("indicePaciente");

    return true;
}

function Excluir() {
    var tbClientes = Carregar();
    var i = window.localStorage.getItem("indicePaciente");

    tbClientes.splice(i, 1);
    // atualiza o json do cliente na sessão
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

    alert("Registro excluído com sucesso.");

    // Limpar a sessão do indice
    window.localStorage.removeItem("indicePaciente");
}

function selecionarRegistro(obj) {
    var indice_selecionado = parseInt($(obj).attr("alt"));

    window.localStorage.setItem("indicePaciente", indice_selecionado);
};

function CarregarCadastro(tipo) {
    var i = window.localStorage.getItem("indicePaciente");

    var tbClientes = Carregar();
    var cli = JSON.parse(tbClientes[i]);

    $("#txtCodigo").val(cli.Codigo);
    $("#txtNome").val(cli.Nome);
    $("#txtCpf").val(cli.CPF);
    $("#txtRg").val(cli.RG);
    $("#txtEndereco").val(cli.Endereco);
    $("#txtNumero").val(cli.Numero);
    $("#txtBairro").val(cli.Bairro);
    $("#txtTelefone").val(cli.Telefone);
    $("#txtDataNascimento").val(cli.DataNascimento);
    $("#txtProfissao").val(cli.Profissao);
    $("#txtEmail").val(cli.Email);
    if (tipo == "Editar") {
        $("#listaEstado").val($('option:contains("' + cli.Estado + '")').val());
        $("#listaCidade").val($('option:contains("' + cli.Cidade + '")').val());
        $("#listaEstadoCivil").val($('option:contains("' + cli.EstadoCivil + '")').val());
        $("#listaConvenio").val($('option:contains("' + cli.Convenio + '")').val());

    } else {
        $("#txtEstado").val(cli.Estado);
        $("#txtCidade").val(cli.Cidade);
        $("#txtEstadoCivil").val(cli.EstadoCivil);
        $("#txtConvenio").val(cli.Convenio);
    }
    $("#txtNomeConjuge").val(cli.NomeConjuge);
    $("#txtTelefone_conj").val(cli.TelefoneConjuge);

    $("#txtCodigo").attr("readonly", "readonly");
    $("#txtNome").focus();
}

