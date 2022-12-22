import { DarkMode } from "../../scripts/darkmode.js";
import { Requests } from "../../scripts/api.js";
import { Cards } from "../../scripts/cards.js";
import { MenuResponsivo } from "../../scripts/menuresponsivo.js";
import { Main } from "../../scripts/main.js";

class Dashboard {
  static token = localStorage.getItem("@kenzieEmpresas:token");
  static tokenAdmin = localStorage.getItem("@kenzieEmpresas:tokenAdmin");
  static tokenUud = localStorage.getItem("@kenzieEmpresas:user_uud");
  static redirecionar() {
    if (!this.token) {
      window.location.replace("../../../index.html");
    }
  }
  static btnHome() {
    const btnHome = document.getElementById("cabecalho__home");

    btnHome.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.reload();
    });
  }
  static btnLogout() {
    const btnLogout = document.getElementById("cabecalho__logout");

    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("@kenzieEmpresas:token");
      localStorage.removeItem("@kenzieEmpresas:user_uud");
      localStorage.removeItem("@kenzieEmpresas:tokenAdmin");
      window.location.replace("../../../index.html");
    });
  }
  static async profile() {
    const aside = document.getElementById("user__profile");
    if (this.tokenAdmin == "false") {
      const user = await Requests.informacoesUser();
      const profileCard = await Cards.profileCard(user.data);
      aside.append(profileCard);
      Main.EditUser();
    } else {
      const allUsers = await Requests.allUsers();
      allUsers.data.forEach(async (element) => {
        if (element.is_admin == true && element.uuid == this.tokenUud) {
          const profileCard = await Cards.profileCard(element);
          aside.append(profileCard);
          Main.EditUser();
        }
      });
    }
  }
  static async mainBody() {
    const mainBody = document.getElementById("main__body");
    const nav = await MenuResponsivo.menuAppend();
    const main = Main.mainTag();
    mainBody.append(nav, main);
    MenuResponsivo.abrirFecharMenu();
    MenuResponsivo.btnAbrirFechar();
    if (this.tokenAdmin == "true") {
      Main.allUsers();
      Main.allNonAllocatedUsers();
      Main.sectorButtons();
      Main.listarEmpresas();
      Main.cadastroFormEmpresas();
      Main.listandoEmpresaPorSetor();
      Main.procurarEmpresaEspecifica();
      Main.cadastroDepartamento();
      Main.listarDepartamentos();
      Main.listarDeptUser();
      Main.contratarParaDepartamento();
      Main.editarInformacoes();
    } else {
      const usuarioLogado = await Requests.informacoesUser();
      if (usuarioLogado.data.department_uuid != null) {
        Main.meusCoWorkers();
        Main.myWorkPlace();
      }
    }
  }
}
Dashboard.redirecionar();
DarkMode.darkActive();
Dashboard.mainBody();
Dashboard.profile();
Dashboard.btnHome();
Dashboard.btnLogout();
