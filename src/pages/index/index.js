import { DarkMode } from "../../scripts/darkmode.js";
import { Requests } from "../../scripts/api.js";
import { Cards } from "../../scripts/cards.js";

class Home {
  static token = localStorage.getItem("@kenzieEmpresas:token");
  static redirecionar() {
    if (this.token) {
      window.location.replace("./src/pages/dashboard/dashboard.html");
    }
  }
  static btnLogin() {
    const loginbtn = document.getElementById("cabecalho__login");

    loginbtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.replace("./src/pages/login/login.html");
    });
  }

  static btnCadastro() {
    const cadastrobtn = document.getElementById("cabecalho__cadastro");

    cadastrobtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.replace("./src/pages/cadastro/cadastro.html");
    });
  }

  static filtrarPorSetores() {
    const setor = document.getElementById("section__setor");
    const ul = document.querySelector(".main__container ul");

    setor.addEventListener("change", async () => {
      let opcao = setor.options[setor.selectedIndex].text;
      const empresas = await Requests.listarEmpresasPorSetor(opcao);
      ul.innerHTML = "";
      empresas.data.forEach(async (element) => {
        const li = await Cards.cardHome(element);
        ul.append(li);
      });
    });
  }

  static filtrarPorEmpresa() {
    const setor = document.getElementById("section__empresas");
    const ul = document.querySelector(".main__container ul");

    setor.addEventListener("change", async () => {
      let opcao = setor.options[setor.selectedIndex].text;
      let opcaoValue = setor.options[setor.selectedIndex].value;

      const data = {
        name: opcao,
        opening_hours: opcaoValue.split(".")[2],
        description: opcaoValue.split(".")[1],
        sectors: {
          description: opcaoValue.split(".")[0],
        },
      };

      ul.innerHTML = "";
      const li = await Cards.cardHome(data);
      ul.append(li);
    });
  }
}
Home.redirecionar();
Home.btnLogin();
Home.btnCadastro();
Home.filtrarPorSetores();
Home.filtrarPorEmpresa();
Cards.empresas();
DarkMode.darkActive();
