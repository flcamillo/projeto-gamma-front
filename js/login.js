
// função para realizar o login do usuário
function fazerLogin(event) {
    // previne a ação padrão do botão (envio do formulario, submit)
    event.preventDefault();
    // captura o valor das variaveis
    let login = document.getElementById("login").value;
    let pwd = document.getElementById("pwd").value;
    // cria um json dos dados
    let requisicaoLogin = {
        email: login,
        racf: login,
        senha: pwd
    }
    // cria a requisição para enviar ao servidor
    let requisicao = {
        method: "POST",
        body: JSON.stringify(requisicaoLogin),
        headers: {
            "Content-type": "application/json"
        },
    }
    // envia os dados para o servidor
    fetch("http://localhost:8080/login", requisicao)
        .then(response => {
            if (response.status == 200) {
                response.json().then(usuario => gravarUsuario(usuario));
            } else {
                document.getElementById("mensagem").innerHTML = '<p>Login inválido !<p>';
            }
        })
        .catch(error => {
            console.log('Falha na requisição de login: ' + error.message);
        });
}

// grava os dados do usuário para controle de sessão
function gravarUsuario(usuario) {
    localStorage.setItem("userLogged", JSON.stringify(usuario));
    window.location = "dash.html";
}