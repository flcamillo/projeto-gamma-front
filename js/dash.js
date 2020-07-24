// valida se a sessão do usuário existe
function validarSessao() {
    dados = localStorage.getItem("userLogged");
    if (dados == null) {
        window.location = "login.html";
    }
    // converte os dados para json
    usuario = JSON.parse(dados);
    // atualiza os dados na pagina
    document.getElementById("foto").src = usuario.foto;
    document.getElementById("nome").innerHTML = `${usuario.nome} (${usuario.racf})`;
}

// efetua logoff
function logoff() {
    localStorage.removeItem("userLogged");
    window.location = "login.html";
}