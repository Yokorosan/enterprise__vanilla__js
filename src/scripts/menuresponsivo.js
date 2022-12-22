import { Requests } from "./api.js";
export class MenuResponsivo {
  static token = localStorage.getItem("@kenzieEmpresas:token");
  static tokenAdmin = localStorage.getItem("@kenzieEmpresas:tokenAdmin");
  static abrirFecharMenu() {
    const box = document.getElementById("box__show");
    const xshow = document.getElementById("x__show");
    const btnUser = document.getElementById("button__user");
    const btnSectors = document.getElementById("button__sectors");
    const btnEmpresas = document.getElementById("button__empresas");
    const btnDepartamento = document.getElementById("button__departamento");
    const menubtn = document.getElementsByClassName("menu__bars")[0];
    const listaUser = document.getElementById("lista__user");
    const listaSectors = document.getElementById("lista__sectors");
    const listaEmpresas = document.getElementById("lista__empresa");
    const listaDepartamento = document.getElementById("lista__departamento");

    menubtn.addEventListener("click", () => {
      if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaUser.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaSectors.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaEmpresas.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaDepartamento.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu" &&
        listaSectors.classList == "lista__menu" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaUser.classList.toggle("hidden");
        listaSectors.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaUser.classList.toggle("hidden");
        listaEmpresas.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaUser.classList.toggle("hidden");
        listaDepartamento.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu" &&
        listaEmpresas.classList == "lista__menu" &&
        listaDepartamento.classList == "lista__menu hidden"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaSectors.classList.toggle("hidden");
        listaEmpresas.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu" &&
        listaEmpresas.classList == "lista__menu hidden" &&
        listaDepartamento.classList == "lista__menu"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaSectors.classList.toggle("hidden");
        listaDepartamento.classList.toggle("hidden");
      } else if (
        listaUser.classList == "lista__menu hidden" &&
        listaSectors.classList == "lista__menu hidden" &&
        listaEmpresas.classList == "lista__menu" &&
        listaDepartamento.classList == "lista__menu"
      ) {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaEmpresas.classList.toggle("hidden");
        listaDepartamento.classList.toggle("hidden");
      } else {
        box.classList.toggle("hidden");
        xshow.classList.toggle("hidden");
        box.classList.toggle("fa-solid");
        xshow.classList.toggle("fa-solid");
        btnUser.classList.toggle("hidden");
        btnSectors.classList.toggle("hidden");
        btnEmpresas.classList.toggle("hidden");
        btnDepartamento.classList.toggle("hidden");
        listaUser.classList.toggle("hidden");
        listaSectors.classList.toggle("hidden");
        listaEmpresas.classList.toggle("hidden");
        listaDepartamento.classList.toggle("hidden");
      }
    });
  }
  static btnAbrirFechar() {
    const btnUser = document.getElementById("button__user");
    const btnSectors = document.getElementById("button__sectors");
    const btnEmpresas = document.getElementById("button__empresas");
    const btnDepartamento = document.getElementById("button__departamento");
    const listaUser = document.getElementById("lista__user");
    const listaSectors = document.getElementById("lista__sectors");
    const listaEmpresas = document.getElementById("lista__empresa");
    const listaDepartamento = document.getElementById("lista__departamento");

    btnUser.addEventListener("click", (event) => {
      event.preventDefault();
      listaUser.classList.toggle("hidden");
    });
    btnSectors.addEventListener("click", (event) => {
      event.preventDefault();
      listaSectors.classList.toggle("hidden");
    });
    btnEmpresas.addEventListener("click", (event) => {
      event.preventDefault();
      listaEmpresas.classList.toggle("hidden");
    });
    btnDepartamento.addEventListener("click", (event) => {
      event.preventDefault();
      listaDepartamento.classList.toggle("hidden");
    });
  }
  ///////////////////////////////////////////////////////////////////////
  //Cards para o Menu Sanduiche/Interativo//
  //////////////////////////////////////////////////////////////////////
  static async menuAppend() {
    const nav = document.createElement("nav");
    nav.classList.add("menu__nav");
    nav.classList.add("flex__column");
    nav.classList.add("align__center");
    nav.id = "menu__nav";
    const divMenuBody = await this.menuBuilding();
    const divThird = document.createElement("div");
    divThird.classList.add("menu__bars");
    const divFirst = await this.menuAppendFirstRow();
    console.log;
    nav.append(divFirst, divMenuBody, divThird);
    return nav;
  }

  static async menuBuilding() {
    const divMenuBody = document.createElement("div");
    divMenuBody.classList.add("menu__body");
    const ul = document.createElement("ul");
    const liUser = document.createElement("li");
    const liSectors = document.createElement("li");
    const liEmpresas = document.createElement("li");
    const liDepartamentos = document.createElement("li");
    const divInnerFirst = await this.divInnerFirst();
    const divInnerSecond = await this.divInnerSecond();
    const divInnerThird = await this.divInnerThird();
    const divInnerForth = await this.divInnerForth();

    liUser.append(divInnerFirst);
    liSectors.append(divInnerSecond);
    liEmpresas.append(divInnerThird);
    liDepartamentos.append(divInnerForth);
    ul.append(liUser, liSectors, liEmpresas, liDepartamentos);
    return ul;
  }
  static async menuAppendFirstRow() {
    const div = document.createElement("div");
    div.classList.add("menu__bars");
    div.classList.add("flex__row");
    div.classList.add("justify__end");
    div.id = "menu__bars";
    const iBox = document.createElement("i");
    iBox.classList.add("fa-solid");
    iBox.classList.add("fa-bars");
    iBox.id = "box__show";
    const iX = document.createElement("i");
    iX.classList.add("fa-x");
    iX.classList.add("hidden");
    iX.id = "x__show";

    div.append(iBox, iX);

    return div;
  }
  static async divInnerFirst() {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.id = "button__user";
    button.classList.add("button__menu");
    button.classList.add("button__style__4");
    button.classList.add("hidden");
    button.innerText = "Usuários";
    const ul = document.createElement("ul");
    ul.id = "lista__user";
    ul.classList.add("lista__menu");
    ul.classList.add("hidden");
    const lifirstRow = document.createElement("li");
    lifirstRow.innerText = "Co-Workers";
    lifirstRow.id = "co__workers";
    const liSecondRow = document.createElement("li");
    liSecondRow.innerText = "Meu local de trabalho";
    liSecondRow.id = "workplace";
    const liThirdRow = document.createElement("li");
    liThirdRow.innerText = "Usuários não alocados";
    liThirdRow.id = "non__alocatted__users";
    const liForthRow = document.createElement("li");
    liForthRow.innerText = "Meu local de trabalho";
    const liFifthRow = document.createElement("li");
    liFifthRow.innerText = "Todos os Usuários";
    liFifthRow.id = "all__users__btn";
    if (this.tokenAdmin == "true") {
      ul.append(liThirdRow, liFifthRow);
    } else {
      const usuarioLogado = await Requests.informacoesUser();
      if (usuarioLogado.data.department_uuid != null) {
        ul.append(lifirstRow, liSecondRow);
      }
    }
    div.append(button, ul);
    return div;
  }
  static async divInnerSecond() {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.id = "button__sectors";
    button.classList.add("button__menu");
    button.classList.add("button__style__4");
    button.classList.add("hidden");
    button.innerText = "Setores";
    const ul = document.createElement("ul");
    ul.id = "lista__sectors";
    ul.classList.add("lista__menu");
    ul.classList.add("hidden");
    const lifirstRow = document.createElement("li");
    lifirstRow.innerText = "Todos os Setores";

    lifirstRow.id = "allsectors";
    if (this.tokenAdmin == "true") {
      ul.append(lifirstRow);
    }
    div.append(button, ul);
    return div;
  }
  static async divInnerThird() {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.id = "button__empresas";
    button.classList.add("button__menu");
    button.classList.add("button__style__4");
    button.classList.add("hidden");
    button.innerText = "Empresas";
    const ul = document.createElement("ul");
    ul.id = "lista__empresa";
    ul.classList.add("lista__menu");
    ul.classList.add("hidden");
    const lifirstRow = document.createElement("li");
    lifirstRow.innerText = "Criar Empresas";
    lifirstRow.id = "criacao_de_empresas";
    const liSecondRow = document.createElement("li");
    liSecondRow.innerText = "Listar Empresas";
    liSecondRow.id = "listagem_de_empresas";
    const liThirdRow = document.createElement("li");
    liThirdRow.innerText = "Listar Empresa por Setor";
    liThirdRow.id = "listagem_de_empresas_setor";
    const liForthRow = document.createElement("li");
    liForthRow.innerText = "Procurar por Empresa Especifica";
    liForthRow.id = "procurar_empresa_especifica";

    if (this.tokenAdmin == "true") {
      ul.append(lifirstRow, liSecondRow, liThirdRow, liForthRow);
    }
    div.append(button, ul);
    return div;
  }
  static async divInnerForth() {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.id = "button__departamento";
    button.classList.add("button__menu");
    button.classList.add("button__style__4");
    button.classList.add("hidden");
    button.innerText = "Departamentos";
    const ul = document.createElement("ul");
    ul.id = "lista__departamento";
    ul.classList.add("lista__menu");
    ul.classList.add("hidden");
    const lifirstRow = document.createElement("li");
    lifirstRow.innerText = "Criar Departamento";
    lifirstRow.id = "button__cadastro__dept";
    const liSecondRow = document.createElement("li");
    liSecondRow.innerText = "Listar Departamentos";
    liSecondRow.id = "button__listar__dept";
    const liFifthRow = document.createElement("li");
    liFifthRow.innerText = "Listar funcionários por Departamento";
    liFifthRow.id = "button__listar__dept__user";
    const liThirdRow = document.createElement("li");
    liThirdRow.innerText = "Contratação";
    liThirdRow.id = "button__contratacao";
    const liForthRow = document.createElement("li");
    liForthRow.innerText = "Editar Dados";
    liForthRow.id = "button__edicao";

    if (this.tokenAdmin == "true") {
      ul.append(lifirstRow, liSecondRow, liFifthRow, liThirdRow, liForthRow);
    }
    div.append(button, ul);
    return div;
  }
}
