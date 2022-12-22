import { Requests } from "./api.js";
import { Main } from "./main.js";
export class Cards {
  static token = localStorage.getItem("@kenzieEmpresas:token");
  static tokenAdmin = localStorage.getItem("@kenzieEmpresas:tokenAdmin");
  static tokenUud = localStorage.getItem("@kenzieEmpresas:user_uud");
  static async empresas() {
    const empresas = await Requests.listarEmpresas();
    const select = document.getElementById("section__empresas");

    empresas.data.forEach(async (element) => {
      const options = await this.optionsEmpresa(element);
      select.append(options);
    });
  }
  static async optionsEmpresa(data) {
    const option = document.createElement("option");
    option.value = `${data.sectors.description}.${data.description}.${data.opening_hours}`;
    option.innerText = `${data.name}`;

    return option;
  }

  static async cardHome(data) {
    const li = document.createElement("li");
    const section = document.createElement("section");
    section.classList.add("main__section");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const h2 = document.createElement("h2");
    h2.classList.add("title__style__1");
    h2.innerText = `${data.name}`;
    const span = document.createElement("span");
    span.classList.add("flex__column");
    const pHora = document.createElement("p");
    pHora.classList.add("text__style__1");
    const strongHora = document.createElement("strong");
    strongHora.innerText = "Abre às:";
    const pDesc = document.createElement("p");
    pDesc.classList.add("text__style__1");
    const strongDesc = document.createElement("strong");
    strongDesc.innerText = "Descrição:";
    const pSec = document.createElement("p");
    pSec.classList.add("text__style__1");
    const strongSect = document.createElement("strong");
    strongSect.innerText = "Setores:";

    li.append(section);
    section.append(h2, span);
    pHora.append(strongHora, ` ${data.opening_hours}`);
    pDesc.append(strongDesc, ` ${data.description}`);
    pSec.append(strongSect, ` ${data.sectors.description}`);
    span.append(pHora, pDesc, pSec);
    return li;
  }
  /////////////////////////////////////////////////////////////////////////////////
  //Começo dos cards do profile -  1 função de append geral e 3 para montar os divs.
  /////////////////////////////////////////////////////////////////////////////////
  static async profileCard(data) {
    const section = document.createElement("section");
    section.classList.add("card__usuario");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const divNome = this.profileCardNome(data);
    const divNivel = this.profileCardNivel(data);
    const divWork = await this.profileCardWork(data);
    section.append(divNome, divNivel, divWork);

    return section;
  }
  static profileCardNome(data) {
    const div = document.createElement("div");
    div.classList.add("card__nome");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    const h2 = document.createElement("h2");
    h2.classList.add("title__style__1");
    h2.innerText = `${data.username}`;
    const button = document.createElement("button");
    button.classList.add("button__style__2");
    button.classList.add("button__edit__user");
    button.innerText = "Editar";
    button.id = "edit__info";

    div.append(h2, button);

    return div;
  }
  static profileCardNivel(data) {
    const div = document.createElement("div");
    div.classList.add("card__nivel");
    const pNivel = document.createElement("p");
    pNivel.classList.add("text__style__2");
    const strongNivel = document.createElement("strong");
    strongNivel.innerText = "Nivel: ";
    const pWork = document.createElement("p");
    pWork.classList.add("text__style__2");
    const strongWork = document.createElement("strong");
    strongWork.innerText = "Tipo de Trabalho: ";
    if (data.professional_level == "") {
      pNivel.append(strongNivel, `ND`);
    } else {
      pNivel.append(strongNivel, `${data.professional_level}`);
    }
    if (data.kind_of_work == null) {
      pWork.append(strongWork, `ND`);
    } else {
      pWork.append(strongWork, `${data.kind_of_work}`);
    }
    div.append(pNivel, pWork);

    return div;
  }
  static async profileCardWork(data) {
    const div = document.createElement("div");
    div.classList.add("card__work");
    const pEmpresa = document.createElement("p");
    pEmpresa.classList.add("text__style__2");
    const strongEmpresa = document.createElement("strong");
    strongEmpresa.innerText = "Empresa: ";
    const pDept = document.createElement("p");
    pDept.classList.add("text__style__2");
    const strongDept = document.createElement("strong");
    strongDept.innerText = "Departamento: ";

    if (data.department_uuid == null) {
      pDept.append(strongDept, `ND`);
      pEmpresa.append(strongEmpresa, `ND`);
    } else {
      const companieInfo = await Requests.listarDepartamentoLogado();
      pEmpresa.append(strongEmpresa, `${companieInfo.data.name}`);
      companieInfo.data.departments.forEach((element) => {
        if (element.uuid.includes(data.department_uuid)) {
          pDept.append(strongDept, `${element.name}`);
        }
      });
    }

    div.append(pEmpresa, pDept);
    return div;
  }
  ///////////////////////////////////////////////////////////
  //Card Titulo Geral//
  //////////////////////////////////////////////////////////
  static async divTitle(name) {
    const divTitle = document.createElement("div");
    divTitle.classList.add("title__container");
    divTitle.classList.add("container__style__1");
    divTitle.classList.add("flex__row");
    divTitle.classList.add("align__center");
    divTitle.classList.add("justify__center");
    const h2 = document.createElement("h2");
    h2.classList.add("title__style__1");
    h2.innerText = `${name}`;

    divTitle.append(h2);

    return divTitle;
  }
  ///////////////////////////////////////////////////////////
  //Card listaTabelada Setores//
  //////////////////////////////////////////////////////////
  static async listaSector(data, name) {
    const div = document.createElement("div");
    div.classList.add("tabela__div");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    const divTitle = await this.divTitle(name);
    const divTabela = document.createElement("div");
    divTabela.classList.add("tabela__container");
    divTabela.classList.add("flex__column");
    divTabela.classList.add("justify__start");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const table = document.createElement("table");

    data.data.forEach((element) => {
      const tr = this.listaSectorTr(element);
      tr.classList.add("tr__style__1");
      table.append(tr);
    });

    li.append(table);
    ul.append(li);
    divTabela.append(ul);
    div.append(divTitle, divTabela);

    return div;
  }

  static listaSectorTr(data) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerText = `${data.description}`;
    td.classList.add("text__style__3");
    tr.append(td);

    return tr;
  }
  ///////////////////////////////////////////////////////////////////
  //listagem de empresas com seus departamentos.
  //////////////////////////////////////////////////////////////////

  static async listarTodasEmpresas(data, name) {
    const div = document.createElement("div");
    div.classList.add("carroussel__div");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    const divTitle = await this.divTitle(name);
    const ul = document.createElement("ul");
    data.forEach(async (element) => {
      const li = await this.montarSectionEmpresas(element);
      ul.append(li);
    });
    div.append(divTitle, ul);
    return div;
  }
  static async montarSectionEmpresas(data) {
    const li = document.createElement("li");
    const section = document.createElement("section");
    section.classList.add("sec__card__empresa");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const divEmpresa = await this.divTitle(data.name);
    divEmpresa.classList.remove("container__style__1");
    divEmpresa.classList.add("container__style__2");
    const h2Dep = document.createElement("h2");
    h2Dep.classList.add("title__style__1");
    h2Dep.innerText = `Departamentos`;
    const divOverflow = document.createElement("div");
    divOverflow.classList.add("overflow__container");
    divOverflow.classList.add("departamento");
    divOverflow.classList.add("flex__column");
    divOverflow.classList.add("justify__start");
    const ul = document.createElement("ul");
    ul.classList.add("card__main");
    ul.classList.add("flex__row");
    const pHours = document.createElement("p");
    pHours.classList.add("text__style__2");
    const strongHours = document.createElement("strong");
    strongHours.innerText = "Abre às: ";
    const pDesc = document.createElement("p");
    pDesc.classList.add("text__style__2");
    const strongDesc = document.createElement("strong");
    strongDesc.innerText = "Descrição: ";
    const pSect = document.createElement("p");
    pSect.classList.add("text__style__2");
    const strongpSect = document.createElement("strong");
    strongpSect.innerText = "Atuação: ";
    pHours.append(strongHours, `${data.opening_hours}`);
    pDesc.append(strongDesc, `${data.description}`);
    pSect.append(strongpSect, `${data.sectors.description}`);

    const departamentos = await Requests.allCompaniesDept(data.uuid);
    if (departamentos.data != []) {
      departamentos.data.forEach(async (depart) => {
        const li = await this.montarLiEmpresas(depart);
        ul.append(li);
      });
    }
    divOverflow.append(ul);
    section.append(divEmpresa, h2Dep, divOverflow, pHours, pDesc, pSect);
    li.append(section);
    return li;
  }

  static async montarLiEmpresas(data) {
    const li = document.createElement("li");
    li.classList.add("card");
    const div = document.createElement("div");
    div.classList.add("card__carrousel__departamento");
    const h2 = document.createElement("h2");
    h2.classList.add("title__style__1");
    h2.innerText = `${data.name}`;

    const pDesc = document.createElement("p");
    pDesc.classList.add("text__style__2");
    const strongDesc = document.createElement("strong");
    strongDesc.innerText = "Descrição: ";
    pDesc.append(strongDesc, `${data.description}`);

    const btnDeletarSetor = document.createElement("button");
    btnDeletarSetor.classList.add("button__style__4");
    btnDeletarSetor.innerText = "Deletar Departamento";
    btnDeletarSetor.id = `${data.uuid}`;
    li.append(div);

    if (this.tokenAdmin == "true") {
      div.append(h2, pDesc, btnDeletarSetor);
    } else {
      div.append(h2, pDesc);
    }
    return li;
  }
  ///////////////////////////////////////////////////////////////////////////
  //Criação de Empresas
  //////////////////////////////////////////////////////////////////////////
  static async cadastroEmpresa(name) {
    const section = document.createElement("section");
    const divTitle = await this.divTitle(name);
    const form = await this.formCadastro();

    section.append(divTitle, form);

    return section;
  }
  static async formCadastro() {
    const form = document.createElement("form");
    form.classList.add("main__form");
    form.classList.add("flex__column");
    form.classList.add("align__center");

    const inputNome = document.createElement("input");
    inputNome.classList.add("input_style_1");
    inputNome.id = "input_nomeempresa";
    inputNome.placeholder = "Nome da Empresa";

    const inputHora = document.createElement("input");
    inputHora.classList.add("input_style_1");
    inputHora.id = "input__hours";
    inputHora.placeholder = "Horário de Funcionamento";

    const inputDescription = document.createElement("input");
    inputDescription.classList.add("input_style_1");
    inputDescription.id = "input__description";
    inputDescription.placeholder = "Descrição";

    const button = document.createElement("button");
    button.id = "button__cadastro__emp";
    button.classList.add("button__style__1");
    button.innerText = "Cadastrar";
    const select = await this.selectSkeleton("Escolha o Setor");

    const allSectors = await Requests.allSectors();
    allSectors.data.forEach((element) => {
      const option = this.creatingOption(element);
      select.append(option);
    });

    form.append(inputNome, inputHora, inputDescription, select, button);
    return form;
  }

  ///////////////////////////////////////////////////////////////////////////
  //Criação de Select Field
  //////////////////////////////////////////////////////////////////////////
  static async selectSkeleton(name) {
    const select = document.createElement("select");
    select.id = "selec__sector";
    select.classList.add("selec__sector");
    const optionDisable = document.createElement("option");
    optionDisable.disabled = true;
    optionDisable.selected = true;
    optionDisable.hidden = true;
    optionDisable.innerText = `${name}`;
    select.append(optionDisable);

    return select;
  }
  static creatingOption(data) {
    const option = document.createElement("option");
    option.innerText = `${data.description}`;
    option.value = `${data.uuid}`;

    return option;
  }
  ////////////////////////////////////////////////////////////////////////////
  //Estilizando um Campo de Busca
  ///////////////////////////////////////////////////////////////////////////
  static campoBusca() {
    const section = document.createElement("section");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    section.classList.add("container__style__3");
    const inputBusca = document.createElement("input");
    inputBusca.placeholder = "Digite a sua busca";
    inputBusca.classList.add("input_style_1");
    inputBusca.id = "input__de__busca";
    const button = document.createElement("button");
    button.innerText = "Procurar";
    button.classList.add("button__style__1");
    button.id = "btn__procurar";

    section.append(inputBusca, button);
    return section;
  }
  ///////////////////////////////////////////////////////////////////////////
  //Estilizando Formulário de Cadastro para Departamentos.
  ///////////////////////////////////////////////////////////////////////////
  static async criarDepartamento(name) {
    const div = document.createElement("div");
    div.classList.add("carroussel__div");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    const divTitle = await this.divTitle(name);
    const section = document.createElement("section");
    section.classList.add("section__cadastro__departamento");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const form = document.createElement("form");
    form.classList.add("form__cadastro__departamento");
    form.classList.add("main__form");
    form.classList.add("flex__column");
    form.classList.add("align__center");
    const inputNome = document.createElement("input");
    inputNome.id = "nome__departamento";
    inputNome.placeholder = "Nome do Departamento";
    inputNome.classList.add("input_style_1");
    const inputDesc = document.createElement("input");
    inputDesc.id = "descricao__departamento";
    inputDesc.placeholder = "Descrição do Departamento";
    inputDesc.classList.add("input_style_1");
    const select = await this.selectSkeleton("Escolha a empresa");

    const todasEmpresas = await Requests.listarEmpresas();
    todasEmpresas.data.forEach((element) => {
      const data = {
        description: element.name,
        uuid: element.uuid,
      };
      const option = this.creatingOption(data);
      select.append(option);
    });

    const button = document.createElement("button");
    button.classList.add("button__style__1");
    button.innerText = "Criar Departamento";
    button.id = "button__criar__departamento";

    form.append(inputNome, inputDesc, select, button);
    section.append(form);
    div.append(divTitle, section);
    return div;
  }
  ///////////////////////////////////////////////////////////////////////////
  //Cards Departamentos
  ///////////////////////////////////////////////////////////////////////////

  static async cardDepartamento() {
    const div = document.createElement("section");
    div.classList.add("sec__card__empresa");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    const select = await this.selectSkeleton("Escolha a Empresa");
    select.id = "companie__selector";
    const todasEmpresas = await Requests.listarEmpresas();
    todasEmpresas.data.forEach((element) => {
      const data = {
        description: element.name,
        uuid: element.uuid,
      };
      const option = this.creatingOption(data);
      select.append(option);
    });
    const inputBusca = this.campoBusca();

    div.append(select, inputBusca);
    return div;
  }
  static async cardDepartamentoRenderizado(data) {
    const section = document.createElement("section");
    section.classList.add("sec__card__empresa");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const div = document.createElement("div");
    div.classList.add("carroussel__div");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    const divTitle = await this.divTitle(data.name);
    divTitle.classList.remove("container__style__1");
    divTitle.classList.add("container__style__4");
    divTitle.classList.remove("flex__row");
    divTitle.classList.add("flex__column");
    const pTitleDesc = document.createElement("p");
    pTitleDesc.classList.add("text__style__2");
    pTitleDesc.innerText = `${data.description}`;
    divTitle.append(pTitleDesc);
    const divSubTitle = await this.divTitle(data.companies.name);
    divSubTitle.classList.remove("container__style__1");
    divSubTitle.classList.add("container__style__2");
    const pHours = document.createElement("p");
    pHours.classList.add("text__style__2");
    const strongHours = document.createElement("strong");
    strongHours.innerText = "Abre às: ";
    const pDesc = document.createElement("p");
    pDesc.classList.add("text__style__2");
    const strongDesc = document.createElement("strong");
    strongDesc.innerText = "Descrição: ";
    const pSect = document.createElement("p");
    pSect.classList.add("text__style__2");
    const strongpSect = document.createElement("strong");
    strongpSect.innerText = "Atuação: ";
    pHours.append(strongHours, `${data.companies.opening_hours}`);
    pDesc.append(strongDesc, `${data.companies.description}`);

    if (this.tokenAdmin == "true") {
      const atuacao = await Requests.allSectors();
      atuacao.data.forEach((element) => {
        if (element.uuid === data.companies.sector_uuid) {
          pSect.append(strongpSect, `${element.description}`);
        }
      });
      div.append(divTitle, divSubTitle, pHours, pDesc, pSect);
    } else {
      div.append(divTitle, divSubTitle, pHours, pDesc);
    }

    section.append(div);
    return section;
  }
  ////////////////////////////////////////////////////////////////////////////
  //Criando o Formulário de Edição.
  //////////////////////////////////////////////////////////////////////////
  static async formEdit(texto1, texto2) {
    const section = document.createElement("section");
    section.id = "section__form__ex";
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const form = document.createElement("form");
    form.id = "form__ex";
    form.classList.add("flex__column");
    form.classList.add("align__center");
    form.classList.add("form__edicao");
    const inputUm = document.createElement("input");
    inputUm.classList.add("input_style_1");
    inputUm.id = "input__um";
    inputUm.placeholder = `${texto1}`;
    const inputDois = document.createElement("input");
    inputDois.classList.add("input_style_1");
    inputDois.id = "input__dois";
    inputDois.placeholder = `${texto2}`;
    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add("button__style__1");
    buttonEditar.id = "btn__edicao";
    buttonEditar.innerText = "Editar";

    section.append(form);
    form.append(inputUm, inputDois, buttonEditar);

    return section;
  }
  ////////////////////////////////////////////////////////////////////////////
  //Criando o Formulário de Edição de usuários.
  //////////////////////////////////////////////////////////////////////////
  static async formEditUsers(texto1, texto2) {
    const section = document.createElement("section");
    section.id = "section__form__ex";
    section.classList.add("flex__column");
    section.classList.add("align__center");
    const form = document.createElement("form");
    form.id = "form__ex";
    form.classList.add("flex__column");
    form.classList.add("align__center");
    form.classList.add("form__edicao");
    const inputUm = document.createElement("input");
    inputUm.classList.add("input_style_1");
    inputUm.id = "input__um";
    inputUm.placeholder = `${texto1}`;
    const inputDois = document.createElement("input");
    inputDois.classList.add("input_style_1");
    inputDois.id = "input__dois";
    inputDois.placeholder = `${texto2}`;
    const inputTres = document.createElement("input");
    inputTres.classList.add("input_style_1");
    inputTres.id = "input__tres";
    inputTres.placeholder = `Coloque a nova senha`;
    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add("button__style__1");
    buttonEditar.id = "btn__edicao";
    buttonEditar.innerText = "Editar";

    section.append(form);
    form.append(inputUm, inputDois, inputTres, buttonEditar);

    return section;
  }
  ///////////////////////////////////////////////////////////////////////
  //////Card Carroussel User
  //////////////////////////////////////////////////////////

  static liCarroussel(data, departamento = "ND", empresa = "ND") {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("flex__column");
    div.classList.add("align__center");
    div.classList.add("container__style__7");
    const h2 = document.createElement("h2");
    h2.classList.add("title__style__1");
    h2.innerText = `${data.username}`;
    const pEmail = document.createElement("p");
    pEmail.classList.add("text__style__4");
    const strongEmail = document.createElement("strong");
    strongEmail.innerText = "E-mail: ";
    const pSenioridade = document.createElement("p");
    pSenioridade.classList.add("text__style__4");
    const strongSenioridade = document.createElement("strong");
    strongSenioridade.innerText = "Senioridade: ";
    const pWork = document.createElement("p");
    pWork.classList.add("text__style__4");
    const strongWork = document.createElement("strong");
    strongWork.innerText = "Tipo de Trabalho: ";
    const pDepartamento = document.createElement("p");
    pDepartamento.classList.add("text__style__4");
    const strongDepartamento = document.createElement("strong");
    strongDepartamento.innerText = "Departamento: ";
    const pEmpresa = document.createElement("p");
    pEmpresa.classList.add("text__style__4");
    const strongEmpresa = document.createElement("strong");
    strongEmpresa.innerText = "Empresa: ";
    const buttonDeletar = document.createElement("button");
    buttonDeletar.classList.add("button__style__1");
    buttonDeletar.classList.add("btn__delete__user");
    buttonDeletar.classList.add("no__white__wrap");
    buttonDeletar.id = `${data.uuid}`;
    buttonDeletar.innerText = "Deletar Usuário";

    pEmail.append(strongEmail, `${data.email}`);
    pSenioridade.append(strongSenioridade, `${data.professional_level}`);
    if (data.kind_of_work != null) {
      pWork.append(strongWork, `${data.kind_of_work}`);
    } else {
      pWork.append(strongWork, `ND`);
    }
    pDepartamento.append(strongDepartamento, `${departamento}`);
    pEmpresa.append(strongEmpresa, `${empresa}`);

    li.append(div);
    if (this.tokenAdmin == "true") {
      div.append(
        h2,
        pEmail,
        pSenioridade,
        pSenioridade,
        pDepartamento,
        pEmpresa,
        buttonDeletar
      );
    } else {
      div.append(
        h2,
        pEmail,
        pSenioridade,
        pSenioridade,
        pDepartamento,
        pEmpresa
      );
    }

    return li;
  }
}
