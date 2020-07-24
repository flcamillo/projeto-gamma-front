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
function pesquisarEventos(event, csv) {
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
    fetch("http://localhost:8080/evento/alarme/entre", requisicao)
        .then(response => {
            if (response.status == 200) {
                if (csv == false) {
                    response.json().then(dados => gerarRelatorio(dados));
                } else {
                    response.json().then(dados => gerarCSV(dados));
                }
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
    let relatorioTexto = `<table class="table"><thead><tr><th scope="col">Alarme</th><th scope="col">Quantidade no Período</th></thead><tbody>`;
    dados.forEach(e => {
        relatorioTexto += `<tr><td>${e[0]}</td><td>${e[1]}</td></tr>`;
    });
    relatorioTexto += `</tbody></table>`;
    relatorio.innerHTML = relatorioTexto;
}

// função para criar o arquivo CSV
function gerarCSV(dados) {
    let relatorio = document.getElementById("relatorio");
    if (dados == null || dados.length == 0) {
        relatorio.innerHTML = `<p>Nenhum registro encontrado.<p>`;
        return;
    }
    let csv = "";
    dados.forEach(e => {
        csv += `${e[0]};${e[1]}\n`;
    });
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'eventos_consolidado.csv';
    hiddenElement.click(); 
}