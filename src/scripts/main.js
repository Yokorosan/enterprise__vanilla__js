import { Requests } from "./api.js";
import { Cards } from "./cards.js";

export class Main {
  static token = localStorage.getItem("@kenzieEmpresas:token");
  static tokenAdmin = localStorage.getItem("@kenzieEmpresas:tokenAdmin");
  static tokenUud = localStorage.getItem("@kenzieEmpresas:user_uud");

  static mainTag() {
    const main = document.createElement("main");
    main.classList.add("main__container");
    main.classList.add("flex__column");
    main.classList.add("align__center");
    main.id = "main__body__tag";

    return main;
  }

  static async EditUser() {
    const main = document.getElementById("main__body__tag");
    const btnEditUserInfo = document.getElementById("edit__info");
    const divTitleUserEdit = await Cards.divTitle("Editar Usuário");

    btnEditUserInfo.addEventListener("click", async (event) => {
      main.innerHTML = "";
      event.preventDefault();
      if (this.tokenAdmin == "false") {
        const infoUser = await Requests.informacoesUser();

        const section = await Cards.formEditUsers(
          infoUser.data.username,
          infoUser.data.email,
          infoUser.data.password
        );
        section.classList.add("container__style__6");

        main.append(divTitleUserEdit, section);
        const btnEdicao = document.getElementById("btn__edicao");
        const inputNome = document.getElementById("input__um");
        const inputSenha = document.getElementById("input__tres");
        const inputEmail = document.getElementById("input__dois");
        let email = "";
        let senha = "";
        let nome = "";
        btnEdicao.addEventListener("click", (event) => {
          event.preventDefault();
          if (inputEmail.value == "") {
            email = "";
          } else {
            email = inputEmail.value;
          }
          const data = {
            username: inputNome.value,
            email: email,
            password: inputSenha.value,
          };
          Requests.editUser(data);
        });
      } else {
        const infoUser = await Requests.allUsers();
        const section = await Cards.formEdit(
          `${infoUser.data[0].kind_of_work}`,
          `${infoUser.data[0].professional_level}`
        );
        section.classList.add("container__style__6");

        main.append(divTitleUserEdit, section);
        const btnEdicao = document.getElementById("btn__edicao");
        const inputWork = document.getElementById("input__um");
        const inputSenioridade = document.getElementById("input__dois");
        btnEdicao.addEventListener("click", (event) => {
          event.preventDefault();
          const data = {
            kind_of_work: inputWork.value,
            professional_level: inputSenioridade.value,
          };
          Requests.editarUserInfo(data, `${infoUser.data[0].uuid}`);
        });
      }
    });
  }
  static async allUsers() {
    const main = document.getElementById("main__body__tag");
    const btnAllUsers = document.getElementById("all__users__btn");
    const section = document.createElement("section");
    section.classList.add("carroussel__user__card");
    const ul = document.createElement("ul");
    ul.classList.add("user__list__ul");
    ul.classList.add("flex__row");
    const divTitle = await Cards.divTitle("Todos os Usuários");

    btnAllUsers.addEventListener("click", async (event) => {
      main.innerHTML = "";
      ul.innerHTML = "";
      main.append(divTitle);

      event.preventDefault();
      const allUsers = await Requests.allUsers();
      allUsers.data.forEach(async (element) => {
        if (element.is_admin !== true) {
          const arr = await this.checkCompanieDepartment(element);
          const li = Cards.liCarroussel(element, arr[0], arr[1]);
          ul.append(li);
        }
      });
      section.append(ul);
      main.append(section);
      setTimeout(() => {
        const btnDelete = document.getElementsByClassName("btn__delete__user");
        Array.from(btnDelete).forEach((element) => {
          element.addEventListener("click", (event) => {
            event.preventDefault();
            Requests.deletarUsuario(element.id);
          });
        });
      }, 2000);
    });
  }

  static async allNonAllocatedUsers() {
    const main = document.getElementById("main__body__tag");
    const btnNonAllocated = document.getElementById("non__alocatted__users");
    const section = document.createElement("section");
    section.classList.add("carroussel__user__card");
    const ul = document.createElement("ul");
    ul.classList.add("user__list__ul");
    ul.classList.add("flex__row");
    const divTitle = await Cards.divTitle("Usuários Não Alocados");
    btnNonAllocated.addEventListener("click", async () => {
      main.innerHTML = "";
      ul.innerHTML = "";
      main.append(divTitle);
      const allNonWork = await Requests.allNonWorkingUsers();
      allNonWork.data.forEach(async (element) => {
        const li = Cards.liCarroussel(element);
        ul.append(li);
      });
      section.append(ul);
      main.append(section);
      setTimeout(() => {
        const btnDelete = document.getElementsByClassName("btn__delete__user");
        Array.from(btnDelete).forEach((element) => {
          element.addEventListener("click", (event) => {
            event.preventDefault();
            Requests.deletarUsuario(element.id);
          });
        });
      }, 2000);
    });
  }

  static async checkCompanieDepartment(data) {
    const allDepartments = await Requests.listarAllDepartments();
    let arr = [];
    allDepartments.data.forEach(async (departamento) => {
      if (departamento.uuid == data.department_uuid) {
        arr.push(departamento.name);
        arr.push(departamento.companies.name);
      }
    });
    return arr;
  }
  static sectorButtons() {
    const main = document.getElementById("main__body__tag");
    const allSectorsBtn = document.getElementById("allsectors");
    allSectorsBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const sectors = await Requests.allSectors();
      const tabela = await Cards.listaSector(sectors, "Setores Cadastrados");
      main.innerHTML = "";
      main.append(tabela);
    });
  }
  static listarEmpresas() {
    const main = document.getElementById("main__body__tag");
    const btnEmpresaLista = document.getElementById("listagem_de_empresas");

    btnEmpresaLista.addEventListener("click", async () => {
      const todasEmpresas = await Requests.listarEmpresas();
      const cardEmp = await Cards.listarTodasEmpresas(
        todasEmpresas.data,
        "Empresas Cadastradas"
      );
      main.innerHTML = "";
      main.append(cardEmp);
      setTimeout(() => {
        const btnDeletarDepartamento = document.querySelectorAll("main button");
        Array.from(btnDeletarDepartamento).forEach((element) => {
          element.addEventListener("click", (event) => {
            event.preventDefault();
            Requests.deleteDepartamento(element.id);
          });
        });
      }, 2000);
    });
  }

  static async cadastroFormEmpresas() {
    const main = document.getElementById("main__body__tag");
    const btnCadastroEmpresa = document.getElementById("criacao_de_empresas");

    btnCadastroEmpresa.addEventListener("click", async () => {
      const formCadastroEmp = await Cards.cadastroEmpresa(
        "Cadastro de Empresas"
      );
      main.innerHTML = "";
      main.append(formCadastroEmp);

      const nomeEmp = document.getElementById("input_nomeempresa");
      const hoursEmp = document.getElementById("input__hours");
      const descripEmp = document.getElementById("input__description");
      const select = document.getElementById("selec__sector");
      const btnCadastro = document.getElementById("button__cadastro__emp");
      btnCadastro.addEventListener("click", (event) => {
        event.preventDefault();
        const data = {
          name: nomeEmp.value,
          opening_hours: hoursEmp.value,
          description: descripEmp.value,
          sector_uuid: select.options[select.selectedIndex].value,
        };
        Requests.cadastrarEmpresas(data);
      });
    });
  }

  static async listandoEmpresaPorSetor() {
    const main = document.getElementById("main__body__tag");
    const btnListarEmpSetor = document.getElementById(
      "listagem_de_empresas_setor"
    );
    const section = document.createElement("section");
    section.classList.add("section__lista__empresa__setor");

    btnListarEmpSetor.addEventListener("click", async () => {
      main.innerHTML = "";
      const select = await Cards.selectSkeleton("Selecione o Setor");
      const divTitle = await Cards.divTitle("Empresas por Setor");
      section.innerHTML = "";

      const allSectors = await Requests.allSectors();
      allSectors.data.forEach((element) => {
        const option = Cards.creatingOption(element);
        select.append(option);
      });

      section.append(divTitle, select);
      main.append(section);

      const sectionSelect = document.getElementById("selec__sector");
      sectionSelect.addEventListener("change", async () => {
        const value = sectionSelect.options[sectionSelect.selectedIndex].text;
        const allCompanies = await Requests.listarEmpresasPorSetor(value);
        const newCards = await Cards.listarTodasEmpresas(
          allCompanies.data,
          "Empresas Cadastradas"
        );
        if (main.childNodes.length == 1) {
          main.append(newCards);
        } else {
          main.lastChild.remove();
          main.append(newCards);
        }
        setTimeout(() => {
          const btnDeletarDepartamento =
            document.querySelectorAll("main button");
          Array.from(btnDeletarDepartamento).forEach((element) => {
            element.addEventListener("click", (event) => {
              event.preventDefault();
              Requests.deleteDepartamento(element.id);
            });
          });
        }, 2000);
      });
    });
  }

  static async procurarEmpresaEspecifica() {
    const main = document.getElementById("main__body__tag");
    const btnBuscarEmpresa = document.getElementById(
      "procurar_empresa_especifica"
    );

    btnBuscarEmpresa.addEventListener("click", async () => {
      main.innerHTML = "";
      const inputBusca = Cards.campoBusca();
      const divTitle = await Cards.divTitle("Procurar Empresa");
      main.append(divTitle, inputBusca);
      console.log(main);
      const buscaValue = document.getElementById("input__de__busca");
      const btnProcurar = document.getElementById("btn__procurar");
      let newArr = [];
      btnProcurar.addEventListener("click", async (event) => {
        event.preventDefault();
        const allCompanies = await Requests.listarEmpresas();
        allCompanies.data.forEach((element) => {
          if (
            element.name.toLowerCase().includes(buscaValue.value.toLowerCase())
          ) {
            newArr.push(element);
          }
        });
        const newCards = await Cards.listarTodasEmpresas(
          newArr,
          "Empresas Encontradas"
        );

        if (main.childNodes.length == 2) {
          main.append(newCards);
          newArr = [];
        } else {
          main.lastChild.remove();
          main.append(newCards);
          newArr = [];
        }
        setTimeout(() => {
          const btnDeletarDepartamento = document.querySelectorAll("ul button");
          Array.from(btnDeletarDepartamento).forEach((element) => {
            element.addEventListener("click", (event) => {
              event.preventDefault();
              Requests.deleteDepartamento(element.id);
            });
          });
        }, 2000);
      });
    });
  }

  static async cadastroDepartamento() {
    const main = document.getElementById("main__body__tag");
    const btnCadastroDept = document.getElementById("button__cadastro__dept");

    btnCadastroDept.addEventListener("click", async () => {
      main.innerHTML = "";
      const div = await Cards.criarDepartamento("Cadastro Departamento");
      main.append(div);

      const inputNomeDept = document.getElementById("nome__departamento");
      const inputDescrDept = document.getElementById("descricao__departamento");
      const selectDept = document.getElementById("selec__sector");
      const btnCriarDept = document.getElementById(
        "button__criar__departamento"
      );
      btnCriarDept.addEventListener("click", (event) => {
        event.preventDefault();
        const data = {
          name: inputNomeDept.value,
          description: inputDescrDept.value,
          company_uuid: selectDept.options[selectDept.selectedIndex].value,
        };
        Requests.createDepartment(data);
      });
    });
  }

  static async listarDepartamentos() {
    const main = document.getElementById("main__body__tag");
    const btnListarDept = document.getElementById("button__listar__dept");

    btnListarDept.addEventListener("click", async () => {
      main.innerHTML = "";
      const divTitle = await Cards.divTitle("Listar Departamentos");
      const div = await Cards.cardDepartamento();
      const divComp = document.createElement("div");
      let newArr = [];
      main.append(divTitle, div);

      const companieSelector = document.getElementById("companie__selector");
      companieSelector.addEventListener("change", async () => {
        divComp.innerHTML = "";
        const department = await Requests.listarDepartamentosDaEmpresa(
          companieSelector.options[companieSelector.selectedIndex].value
        );
        department.data.forEach(async (element) => {
          const section = await Cards.cardDepartamentoRenderizado(element);
          divComp.append(section);
        });

        if (main.childNodes.length == 2) {
          main.append(divComp);
          newArr = [];
        } else {
          main.lastElementChild.remove();
          main.append(divComp);
          newArr = [];
        }

        const inputBusca = document.getElementById("input__de__busca");
        const btnProcurar = document.getElementById("btn__procurar");

        btnProcurar.addEventListener("click", (event) => {
          event.preventDefault();
          department.data.forEach(async (element) => {
            if (
              element.name
                .toLowerCase()
                .includes(inputBusca.value.toLowerCase())
            ) {
              const section = await Cards.cardDepartamentoRenderizado(element);
              divComp.innerHTML = "";
              divComp.append(section);
            }
            main.lastElementChild.remove();
            main.append(divComp);
          });
        });
      });
    });
  }

  static async contratarParaDepartamento() {
    const main = document.getElementById("main__body__tag");
    const btnContratacao = document.getElementById("button__contratacao");
    const section = document.createElement("section");
    section.classList.add("flex__column");
    section.classList.add("align__center");
    section.classList.add("container__style__5");
    section.id = "section__contratacao";

    btnContratacao.addEventListener("click", async (event) => {
      main.innerHTML = "";
      event.preventDefault();
      const divTitle = await Cards.divTitle("Contratação");
      main.append(divTitle);
      const divSelect = document.createElement("div");
      const selectEmpr = await Cards.selectSkeleton("Selecione a Empresa");
      const allCompanies = await Requests.listarEmpresas();
      divSelect.append(selectEmpr);

      //Selecionar Empresa
      allCompanies.data.forEach(async (element) => {
        const data = {
          description: element.name,
          uuid: element.uuid,
        };
        const option = Cards.creatingOption(data);
        selectEmpr.append(option);
      });
      main.append(divSelect);

      //Selecionar Departamento
      const companieSelector =
        document.getElementsByClassName("selec__sector")[0];
      companieSelector.addEventListener("change", async () => {
        const divSelect = document.createElement("div");
        const selectDept = await Cards.selectSkeleton(
          "Selecione o Departamento"
        );
        const allDepartamentos = await Requests.listarDepartamentosDaEmpresa(
          companieSelector.options[companieSelector.selectedIndex].value
        );
        divSelect.innerHTML = "";
        section.innerHTML = "";
        divSelect.append(selectDept);
        allDepartamentos.data.forEach((element) => {
          const data = {
            description: element.name,
            uuid: element.uuid,
          };
          const option = Cards.creatingOption(data);
          selectDept.append(option);
        });
        if (main.childNodes.length == 2) {
          main.append(section);
          section.append(divSelect);
        } else {
          main.lastElementChild.remove();
          main.append(section);
          section.append(divSelect);
        }

        //Selecionar Funcionário
        const departamentSelector =
          document.getElementsByClassName("selec__sector")[1];

        departamentSelector.addEventListener("change", async () => {
          const divSelect = document.createElement("div");
          const selectUsers = await Cards.selectSkeleton(
            "Funcionário a ser Contratado"
          );
          const sectionContrato = document.getElementById(
            "section__contratacao"
          );

          const allNonRegisteredUsers =
            await Requests.listarUsuariosNaoAlocados();

          divSelect.innerHTML = "";
          divSelect.append(selectUsers);
          allNonRegisteredUsers.data.forEach((element) => {
            const data = {
              description: element.username,
              uuid: element.uuid,
            };
            const option = Cards.creatingOption(data);
            selectUsers.append(option);
          });
          if (sectionContrato.childNodes.length == 1) {
            section.append(divSelect);
          } else {
            sectionContrato.lastElementChild.remove();
            section.append(divSelect);
          }

          //Cadastrando o usuário
          const userSelector =
            document.getElementsByClassName("selec__sector")[2];

          userSelector.addEventListener("change", () => {
            const btnContratar = document.createElement("button");
            btnContratar.classList.add("button__style__1");
            btnContratar.id = "button__contratar";
            btnContratar.innerText = "Contratar";
            section.append(btnContratar);

            const btn = document.getElementById("button__contratar");

            btn.addEventListener("click", (event) => {
              event.preventDefault();
              const data = {
                user_uuid: selectUsers.options[selectUsers.selectedIndex].value,
                department_uuid:
                  selectDept.options[selectDept.selectedIndex].value,
              };
              Requests.contratarUsuario(data);
            });
          });
        });
      });
    });
  }

  static async editarInformacoes() {
    const main = document.getElementById("main__body__tag");
    const btnEditar = document.getElementById("button__edicao");

    btnEditar.addEventListener("click", async () => {
      main.innerHTML = "";
      const divTitleUserEdit = await Cards.divTitle("Editar Usuário");
      divTitleUserEdit.id = "user__edit";
      const divTitleDepartmentEdit = await Cards.divTitle(
        "Editar Departamento"
      );
      divTitleDepartmentEdit.id = "department__edit";
      main.append(divTitleUserEdit, divTitleDepartmentEdit);

      const userEdit = document.getElementById("user__edit");
      const departmentEdit = document.getElementById("department__edit");

      userEdit.addEventListener("click", async () => {
        const divRemoved = document.getElementById("div__edicao");
        if (divRemoved != null) {
          divRemoved.remove();
        }

        const section = await Cards.formEdit(
          "Tipo de Trabalho",
          "Nivel Profissional"
        );
        const divAllSelect = document.createElement("div");
        divAllSelect.id = "div__edicao";
        divAllSelect.classList.add("container__style__6");
        divAllSelect.classList.add("flex__column");
        divAllSelect.classList.add("align__center");
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("button__style__2");
        buttonDelete.innerText = "Demitir";
        buttonDelete.id = "btn__demissao";

        section.append(buttonDelete);
        //Montar o select de Companies
        const allCompanies = await Requests.listarEmpresas();
        const selectCompanie = await Cards.selectSkeleton(
          "Qual Empresa se quer visualizar"
        );
        allCompanies.data.forEach(async (element) => {
          const data = {
            description: element.name,
            uuid: element.uuid,
          };
          const option = Cards.creatingOption(data);
          selectCompanie.append(option);
        });
        divAllSelect.append(selectCompanie);
        main.insertBefore(divAllSelect, departmentEdit);

        //Montar o Select de Departamentos
        const selectEmpresas =
          document.getElementsByClassName("selec__sector")[0];
        const divEdicao = document.getElementById("div__edicao");

        selectEmpresas.addEventListener("change", async () => {
          const divSelect = document.createElement("div");
          divSelect.id = "div__edicao__interna";
          divSelect.classList.add("flex__column");
          divSelect.classList.add("align__center");
          const selectDept = await Cards.selectSkeleton(
            "Selecione o Departamento"
          );
          divSelect.append(selectDept);
          const allDepartamentos = await Requests.listarDepartamentosDaEmpresa(
            selectEmpresas.options[selectEmpresas.selectedIndex].value
          );
          divSelect.innerHTML = "";
          divSelect.append(selectDept);
          allDepartamentos.data.forEach((element) => {
            const data = {
              description: element.name,
              uuid: element.uuid,
            };
            const option = Cards.creatingOption(data);
            selectDept.append(option);
          });

          if (divEdicao.childNodes.length == 1) {
            divAllSelect.append(divSelect);
          } else {
            divAllSelect.lastChild.remove();
            divSelect.innerHTML = "";
            divSelect.append(selectDept);
            divAllSelect.append(divSelect);
          }

          const allUsers = await Requests.allUsers();
          const selectDepartment =
            document.getElementsByClassName("selec__sector")[1];
          let newArr = [];

          selectDepartment.addEventListener("change", async () => {
            const divInterna = document.getElementById("div__edicao__interna");
            newArr = [];
            //Montando novo Arr com os funcionários de cada Departamento
            allUsers.data.forEach((element) => {
              if (
                element.department_uuid ===
                selectDepartment.options[selectDepartment.selectedIndex].value
              ) {
                newArr.push(element);
              }
            });
            const selectUsers = await Cards.selectSkeleton(
              "Qual Funcionário Se Quer Editar"
            );
            newArr.forEach((element) => {
              const data = {
                description: element.username,
                uuid: element.uuid,
              };
              const option = Cards.creatingOption(data);
              selectUsers.append(option);
            });
            if (divInterna.childNodes.length == 1) {
              divSelect.append(selectUsers);
            } else if (divInterna.childNodes.length == 2) {
              divInterna.lastChild.remove();
              divSelect.append(selectUsers);
            } else {
              divInterna.lastChild.remove();
              divInterna.lastChild.remove();
              divSelect.append(selectUsers);
            }
            //Criando o campo de edição de Funcionários

            const selectUser =
              document.getElementsByClassName("selec__sector")[2];

            selectUser.addEventListener("change", () => {
              if (divInterna.childNodes.length == 2) {
                divSelect.append(section);
              } else {
                divInterna.lastChild.remove();
                divSelect.append(section);
              }
              const btnEditUser = document.getElementById("btn__edicao");
              const btnDemissaoUser = document.getElementById("btn__demissao");
              const inputWork = document.getElementById("input__um");
              const inputNivel = document.getElementById("input__dois");

              btnEditUser.addEventListener("click", (event) => {
                event.preventDefault();
                const data = {
                  kind_of_work: inputWork.value,
                  professional_level: inputNivel.value,
                };
                const userEdit =
                  selectUsers.options[selectUsers.selectedIndex].value;
                Requests.editarUserInfo(data, userEdit);
              });
              btnDemissaoUser.addEventListener("click", (event) => {
                event.preventDefault();
                Requests.demitirUsuario(
                  selectUsers.options[selectUsers.selectedIndex].value
                );
              });
            });
          });
        });
      });

      departmentEdit.addEventListener("click", async () => {
        const divRemoved = document.getElementById("div__edicao");
        if (divRemoved != null) {
          divRemoved.remove();
        }

        const divAllSelect = document.createElement("div");
        divAllSelect.id = "div__edicao";
        divAllSelect.classList.add("container__style__6");
        divAllSelect.classList.add("flex__column");
        divAllSelect.classList.add("align__center");

        //Montar o select de Companies
        const allCompanies = await Requests.listarEmpresas();
        const selectCompanie = await Cards.selectSkeleton(
          "Qual Empresa você quer visualizar"
        );
        allCompanies.data.forEach(async (element) => {
          const data = {
            description: element.name,
            uuid: element.uuid,
          };
          const option = Cards.creatingOption(data);
          selectCompanie.append(option);
        });
        divAllSelect.append(selectCompanie);
        main.append(divAllSelect);

        //Montar o Select de Departamentos
        const selectEmpresas =
          document.getElementsByClassName("selec__sector")[0];
        const divEdicao = document.getElementById("div__edicao");

        selectEmpresas.addEventListener("change", async () => {
          const divSelect = document.createElement("div");
          divSelect.id = "div__edicao__interna";
          divSelect.classList.add("flex__column");
          divSelect.classList.add("align__center");
          const selectDept = await Cards.selectSkeleton(
            "Selecione o Departamento"
          );
          divSelect.append(selectDept);
          const allDepartamentos = await Requests.listarDepartamentosDaEmpresa(
            selectEmpresas.options[selectEmpresas.selectedIndex].value
          );
          divSelect.innerHTML = "";
          divSelect.append(selectDept);
          allDepartamentos.data.forEach((element) => {
            const data = {
              description: `${element.name}`,
              uuid: `${element.uuid}/${element.description}`,
            };
            const option = Cards.creatingOption(data);
            selectDept.append(option);
          });

          if (divEdicao.childNodes.length == 1) {
            divAllSelect.append(divSelect);
          } else {
            divAllSelect.lastChild.remove();
            divSelect.innerHTML = "";
            divSelect.append(selectDept);
            divAllSelect.append(divSelect);
          }

          const selectDepartment =
            document.getElementsByClassName("selec__sector")[1];

          selectDepartment.addEventListener("change", async () => {
            const divInterna = document.getElementById("div__edicao__interna");

            const inputDesc =
              selectDepartment.options[
                selectDepartment.selectedIndex
              ].value.split("/")[1];
            const departUuid =
              selectDepartment.options[
                selectDepartment.selectedIndex
              ].value.split("/")[0];
            const section = await Cards.formEdit(
              `${inputDesc}`,
              "Descrição Nova"
            );
            const buttonDelete = document.createElement("button");
            buttonDelete.classList.add("button__style__2");
            buttonDelete.innerText = "Deletar";
            buttonDelete.id = "btn__deletar";

            section.append(buttonDelete);

            if (divInterna.childNodes.length == 1) {
              divSelect.append(section);
            } else if (divInterna.childNodes.length == 2) {
              divInterna.lastChild.remove();
              divSelect.append(section);
            } else {
              divInterna.lastChild.remove();
              divInterna.lastChild.remove();
              divSelect.append(section);
            }
            const btnEditDepartamento = document.getElementById("btn__edicao");
            const btnDeletarDepartamento =
              document.getElementById("btn__deletar");
            const inputNovaDesc = document.getElementById("input__dois");

            btnEditDepartamento.addEventListener("click", (event) => {
              event.preventDefault();
              const data = {
                description: inputNovaDesc.value,
              };

              Requests.editarDepartamento(data, departUuid);
            });
            btnDeletarDepartamento.addEventListener("click", (event) => {
              event.preventDefault();
              Requests.deleteDepartamento(departUuid);
            });
          });
        });
      });
    });
  }

  static async listarDeptUser() {
    const main = document.getElementById("main__body__tag");
    const btnEditar = document.getElementById("button__listar__dept__user");
    const divAllSelect = document.createElement("div");
    divAllSelect.id = "div__edicao";
    divAllSelect.classList.add("container__style__6");
    divAllSelect.classList.add("flex__column");
    divAllSelect.classList.add("align__center");
    const allCompanies = await Requests.listarEmpresas();
    const selectCompanie = await Cards.selectSkeleton(
      `Qual Empresa você quer visualizar`
    );
    const section = document.createElement("section");
    section.classList.add("carroussel__user__card");
    const ul = document.createElement("ul");
    ul.classList.add("user__list__ul");
    ul.classList.add("flex__row");

    btnEditar.addEventListener("click", async () => {
      main.innerHTML = "";
      const divTitleUserEdit = await Cards.divTitle("Funcionários");
      allCompanies.data.forEach(async (element) => {
        const data = {
          description: element.name,
          uuid: element.uuid,
        };
        const option = Cards.creatingOption(data);
        selectCompanie.append(option);
      });
      divAllSelect.append(selectCompanie);
      main.append(divTitleUserEdit, divAllSelect);

      /////////////Departamento

      const selectEmpresas =
        document.getElementsByClassName("selec__sector")[0];
      const divEdicao = document.getElementById("div__edicao");

      selectEmpresas.addEventListener("change", async () => {
        main.innerHTML = "";
        divAllSelect.innerHTML = "";
        divAllSelect.append(selectCompanie);
        main.append(divTitleUserEdit, divAllSelect);
        const divSelect = document.createElement("div");
        divSelect.id = "div__edicao__interna";
        divSelect.classList.add("flex__column");
        divSelect.classList.add("align__center");
        const selectDept = await Cards.selectSkeleton(`Qual Departamento?`);
        const allDepartamentos = await Requests.listarDepartamentosDaEmpresa(
          selectEmpresas.options[selectEmpresas.selectedIndex].value
        );
        divSelect.innerHTML = "";
        divSelect.append(selectDept);
        allDepartamentos.data.forEach((element) => {
          const data = {
            description: `${element.name}`,
            uuid: `${element.uuid}/${element.description}`,
          };
          const option = Cards.creatingOption(data);
          selectDept.append(option);
        });

        if (divEdicao.childNodes.length == 1) {
          divAllSelect.append(divSelect);
        } else {
          divAllSelect.lastChild.remove();
          divSelect.innerHTML = "";
          divSelect.append(selectDept);
          divAllSelect.append(divSelect);
        }
        ////Montando o Carroussel de Usuários
        const selectDepartment =
          document.getElementsByClassName("selec__sector")[1];
        selectDepartment.addEventListener("change", async () => {
          section.innerHTML = "";
          ul.innerHTML = "";
          const allUser = await Requests.allUsers();
          const newArr = [];

          allUser.data.forEach((element) => {
            if (
              element.department_uuid ===
              selectDepartment.options[
                selectDepartment.selectedIndex
              ].value.split("/")[0]
            ) {
              newArr.push(element);
            }
          });

          newArr.forEach(async (element) => {
            const arr = await this.checkCompanieDepartment(element);
            const li = Cards.liCarroussel(element, arr[0], arr[1]);
            ul.append(li);
          });
          section.append(ul);
          main.append(section);
          if (divEdicao.childNodes.length == 1) {
            divAllSelect.append(divSelect);
          } else {
            divAllSelect.lastChild.remove();
            divSelect.innerHTML = "";
            divSelect.append(selectDept);
            divAllSelect.append(divSelect);
          }
        });
      });
    });
  }

  static async meusCoWorkers() {
    const main = document.getElementById("main__body__tag");
    const btnCoWork = document.getElementById("co__workers");
    const section = document.createElement("section");
    section.classList.add("carroussel__user__card");
    const ul = document.createElement("ul");
    ul.classList.add("user__list__ul");
    ul.classList.add("flex__row");

    btnCoWork.addEventListener("click", async () => {
      main.innerHTML = "";
      section.innerHTML = "";
      ul.innerHTML = "";
      const divTitleUserEdit = await Cards.divTitle("Co-Workers");
      main.append(divTitleUserEdit);
      const allCoWorkers = await Requests.coWorkers();
      allCoWorkers.data[0].users.forEach(async (element) => {
        const empresa = await this.checkCompanie(
          allCoWorkers.data[0].company_uuid
        );
        const li = Cards.liCarroussel(
          element,
          allCoWorkers.data[0].name,
          empresa
        );
        ul.append(li);
      });
      section.append(ul);
      main.append(section);
    });
  }
  static async checkCompanie(data) {
    let arr = [];
    const allCompanies = await Requests.listarEmpresas();
    allCompanies.data.forEach(async (departamento) => {
      if (departamento.uuid == data) {
        arr.push(departamento.name);
      }
    });
    return arr[0];
  }

  static async myWorkPlace() {
    const main = document.getElementById("main__body__tag");
    const btnMyPlace = document.getElementById("workplace");
    const divTitle = await Cards.divTitle("My WorkPlace");

    btnMyPlace.addEventListener("click", async () => {
      main.innerHTML = "";
      main.append(divTitle);
      const departamentLogado = await Requests.listarDepartamentoLogado();
      const userProfile = await Requests.informacoesUser();
      let data = {};
      departamentLogado.data.departments.forEach(async (element) => {
        if (element.uuid == userProfile.data.department_uuid) {
          data = {
            name: element.name,
            description: element.description,
            companies: {
              name: departamentLogado.data.name,
              opening_hours: departamentLogado.data.opening_hours,
              description: departamentLogado.data.description,
              sector_uuid: departamentLogado.data.sector_uuid,
            },
          };
        }
      });
      const section = await Cards.cardDepartamentoRenderizado(data);
      main.append(section);
    });
  }
}
