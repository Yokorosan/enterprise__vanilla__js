import { DarkMode } from "../../scripts/darkmode.js";
import { Requests } from "../../scripts/api.js";

class Login {
  static token = localStorage.getItem("@kenzieEmpresas:token");
  static async infoLogin() {
    if (this.token) {
      window.location.replace("../dashboard/dashboard.html");
    }
    const inputEmail = document.getElementById("input__email");
    const inputSenha = document.getElementById("input__senha");
    const inputBtn = document.getElementById("input__button");

    inputBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const data = {
        email: inputEmail.value,
        password: inputSenha.value,
      };
      const logado = await Requests.login(data);
      inputEmail.value = "";
      inputSenha.value = "";
    });
  }
  static btnHome() {
    const homebtn = document.getElementById("cabecalho__home");

    homebtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.replace("../../../index.html");
    });
  }
  static btnCadastro() {
    const cadastrobtn = document.getElementById("cabecalho__cadastro");

    cadastrobtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.replace("../cadastro/cadastro.html");
    });
  }
}

DarkMode.darkActive();
Login.infoLogin();
Login.btnCadastro();
Login.btnHome();
