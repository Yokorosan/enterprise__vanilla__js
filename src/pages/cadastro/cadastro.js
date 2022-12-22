import { DarkMode } from "../../scripts/darkmode.js";
import { Requests } from "../../scripts/api.js";

class Cadastro {
  static token = localStorage.getItem("@kenzieEmpresas:token");

  static async cadastroNewUser() {
    if (this.token) {
      window.location.replace("../dashboard/dashboard.html");
    }
    const name = document.getElementById("input__name");
    const senha = document.getElementById("input__senha");
    const email = document.getElementById("input__email");
    const profissao = document.getElementById("input__prof");
    const btnCadastro = document.getElementById("button__cadastro");

    btnCadastro.addEventListener("click", (event) => {
      event.preventDefault();
      const data = {
        password: senha.value,
        email: email.value,
        professional_level: profissao.value,
        username: name.value,
      };
      console.log(data);
      Requests.cadastro(data);
      senha.value = "";
      email.value = "";
      profissao.value = "";
      name.value = "";
    });
  }
  static btnLogin() {
    const loginbtn = document.getElementById("cabecalho__login");

    loginbtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.replace("../login/login.html");
    });
  }
  static btnHome() {
    const homebtn = document.getElementById("cabecalho__home");

    homebtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.replace("../../../index.html");
    });
  }
}
DarkMode.darkActive();
Cadastro.cadastroNewUser();
Cadastro.btnHome();
Cadastro.btnLogin();
