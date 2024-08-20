
$(document).ready(function () {
    $('#IncluirBenf').click(function (e) {
        e.preventDefault();
        var table = document.getElementById('beneficiarios');
        var row = '<tr> <td> <span>' + document.getElementById("CPF2").value + '</span> </td> <td> <span>' + document.getElementById("Nome2").value + '</span> </td> <td> <button class="btn btn-primary details" data-id="">Alterar</button> <button class="btn btn-primary delete" data-id="">Excluir</button> </td ><tr>';
        table.innerHTML += row;
    })

    $('#IncluirClien').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $("#Nome").val(),
                "CEP": $("#CEP").val(),
                "Email": $("#Email").val(),
                "Sobrenome": $("#Sobrenome").val(),
                "Nacionalidade": $("#Nacionalidade").val(),
                "Estado": $("#Estado").val(),
                "Cidade": $("#Cidade").val(),
                "Logradouro": $("#Logradouro").val(),
                "Telefone": $("#Telefone").val(),
                "CPF": $("#CPF").val()
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    IncluirBeneficiarios();
                    $("#formCadastro")[0].reset();
                }
        });
    })

    function IncluirBeneficiarios() {

        var beneficiarioCpf = [];
        var beneficiarioNome = [];
        var valores = document.querySelectorAll("table tr td span");
        for (i = 0; i < valores.length; i++) {

            if (i % 2 == 0)
            {
                beneficiarioCpf.push(valores[i].innerHTML);
            }
            else
            {
                beneficiarioNome.push(valores[i].innerHTML);
            }
        };

        $.ajax({
            url: urlPost2,
            method: "POST",
            data: {
                "CPF": JSON.stringify(beneficiarioCpf),
                "NOME": JSON.stringify(beneficiarioNome)
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });
    }
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
