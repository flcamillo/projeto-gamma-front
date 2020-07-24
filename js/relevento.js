// valida se a sessão do usuário existe
function validarSessao() {
    dados = localStorage.getItem("userLogged");
    if (dados == null) {
        window.location = "login.html";
    }
}

// efetua logoff
function logoff() {
    localStorage.removeItem("userLogged");
    window.location = "login.html";
}

// função para realizar a pesquisa dos eventos
function pesquisarEventos(event) {
    // previne a ação padrão do botão (envio do formulario, submit)
    event.preventDefault();
    // cria um novo formulario
    data = new FormData()
    // cria a requisição para enviar ao servidor
    let requisicao = {
        method: "POST",
        body: new FormData(document.getElementById("form-periodo"))
    }
    // envia os dados para o servidor
    fetch("http://localhost:8080/evento/equipamento/entre", requisicao)
        .then(response => {
            if (response.status == 200) {
                response.json().then(dados => gerarRelatorio(dados));
            } else {
                document.getElementById("relatorio").innerHTML = `<p>Não foi possível realizar a consulta.<p>`;
            }
        })
        .catch(error => {
            console.log('Falha na requisição: ' + error.message);
        });
}

// função para criar a tabela do relatório
function gerarRelatorio(dados) {
    let relatorio = document.getElementById("relatorio");
    if (dados == null || dados.length == 0) {
        relatorio.innerHTML = `<p>Nenhum registro encontrado.<p>`;
        return;
    }
    let relatorioTexto = `<table class="table"><thead><tr><th scope="col">Data</th><th scope="col">Alarme</th><th scope="col">Equipamento</th></thead><tbody>`;
    dados.forEach(e => {
        relatorioTexto += `<tr><td>${e.data}</td><td>${e.alarme.nome}</td><td>${e.equipamento.nomeHost}</td></tr>`;
    });
    relatorioTexto += `</tbody></table>`;
    relatorio.innerHTML = relatorioTexto;
}