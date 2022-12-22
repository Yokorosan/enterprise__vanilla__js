import { Modais } from "./modal.js";
import { instance, instanceNoToken } from "./axios.js";
import { Toast } from "./toast.js";

export class Requests {
  static async login(data) {
    const loginUser = await instanceNoToken
      .post(`auth/login`, data)
      .then((resp) => {
        localStorage.setItem("@kenzieEmpresas:token", resp.data.token);
        localStorage.setItem("@kenzieEmpresas:user_uud", resp.data.uuid);
        localStorage.setItem("@kenzieEmpresas:tokenAdmin", resp.data.is_admin);

        Toast.create("Login realizado com Sucesso", "green");
        setTimeout(() => {
          window.location.replace("../dashboard/dashboard.html");
        }, 2000);
        return resp;
      })
      .catch((err) => {
        if (err.response.data.error == "password invalid!") {
          const senhaInvalid = "Senha Invalida!";
          Modais.errorModal(senhaInvalid);
        } else if (err.response.data.error == "email invalid!") {
          const emailInvalid = "Email Invalido!";
          Modais.errorModal(emailInvalid);
        }
      });
    return loginUser;
  }

  static async cadastro(data) {
    const registerUser = await instanceNoToken
      .post(`auth/register/user`, data)
      .then((resp) => {
        console.log(resp);
        Toast.create("Cadastro realizado com Sucesso", "green");
      })
      .catch((err) => {
        if (
          err.response.data.error ==
          "professional_level must be one of these: estágio, júnior, pleno, sênior"
        ) {
          const profissao =
            "Seu nivel profissional precisa ser algum dos seguintes: Estágio, Júnior, Pleno, Sênior";
          Modais.errorModal(profissao);
        } else if (
          err.response.data.error == "insert a valid email!" ||
          err.response.data.error == "email is required!"
        ) {
          const email = "É necessário inserir um e-mail válido.";
          Modais.errorModal(email);
        } else if (err.response.data.error == "required field password!") {
          const senha = "É preciso inserir uma senha!";
          Modais.errorModal(senha);
        } else if (err.response.data.error == "username not empty!") {
          const username = "Você precisa colocar um usuário";
          Modais.errorModal(username);
        } else if ((err.response.data.error = "email alread exists!")) {
          const emailExist = "E-mail já cadastrado";
          Modais.errorModal(emailExist);
        }
        console.log(err);
      });
    return registerUser;
  }

  static async cadastrarEmpresas(data) {
    const cadastroEmpresa = await instance
      .post(`companies`, data)
      .then((resp) => {
        Toast.create("Cadastro realizado com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return cadastroEmpresa;
  }

  static async listarAllDepartments() {
    const allDepartments = await instance
      .get(`departments`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return allDepartments;
  }

  static async listarDepartamentoLogado() {
    const loginDepartament = await instance
      .get(`users/departments`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return loginDepartament;
  }
  static async listarEmpresas() {
    const empresas = await instanceNoToken
      .get(`companies`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return empresas;
  }

  static async listarEmpresasPorSetor(data) {
    const empresaSetor = await instanceNoToken
      .get(`companies/${data}`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return empresaSetor;
  }
  static async informacoesUser() {
    const userProfile = await instance
      .get(`users/profile`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return userProfile;
  }

  static async editUser(data) {
    const editUser = await instance
      .patch(`users`, data)
      .then((resp) => {
        Toast.create("Informações atualizada com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return editUser;
  }

  static async allSectors() {
    const allSector = await instance
      .get(`sectors`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return allSector;
  }

  static async allCompaniesDept(data) {
    const allCompanies = await instance
      .get(`departments/${data}`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return allCompanies;
  }

  static async allUsers() {
    const allUsers = await instance
      .get(`users`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return allUsers;
  }

  static async allNonWorkingUsers() {
    const allNonWork = await instance
      .get(`admin/out_of_work`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return allNonWork;
  }

  static async createDepartment(data) {
    const newDepartment = await instance
      .post(`departments`, data)
      .then((resp) => {
        Toast.create("Departamento Criado Com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return newDepartment;
  }

  static async coWorkers() {
    const coWork = await instance
      .get(`users/departments/coworkers`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return coWork;
  }

  static async listarDepartamentosDaEmpresa(data) {
    const listDeptEmp = await instance
      .get(`departments/${data}`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return listDeptEmp;
  }

  static async listarUsuariosNaoAlocados() {
    const usersNaoAlocados = await instance
      .get("admin/out_of_work")
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return usersNaoAlocados;
  }
  static async contratarUsuario(data) {
    const contrato = await instance
      .patch("departments/hire/", data)
      .then((resp) => {
        Toast.create("Usuário Contratado Com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
    return contrato;
  }
  static async editarUserInfo(data, userEdit) {
    const editarUser = await instance
      .patch(`admin/update_user/${userEdit}`, data)
      .then((resp) => {
        Toast.create("Usuário Atualizado Com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        Toast.create(`${err.response.data.error}`, "red");
        console.log(err);
      });
    return editarUser;
  }

  static async demitirUsuario(data) {
    const demitirUsuario = await instance
      .patch(`departments/dismiss/${data}`)
      .then((resp) => {
        Toast.create("Usuário Demitido Com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        Toast.create(`${err.response.data.error}`, "red");
        console.log(err);
      });
    return demitirUsuario;
  }
  static async deletarUsuario(data) {
    const deletarUsuario = await instance
      .delete(`admin/delete_user/${data}`)
      .then((resp) => {
        Toast.create("Usuário Deletado Com Sucesso", "green");
        return resp;
      })
      .catch((err) => {
        Toast.create(`${err.response.data.error}`, "red");
        console.log(err);
      });
    return deletarUsuario;
  }

  static async editarDepartamento(data, deptEdit) {
    const editDepat = await instance
      .patch(`departments/${deptEdit}`, data)
      .then((resp) => {
        Toast.create("Departamento alterado com sucesso", "green");
        return resp;
      })
      .catch((err) => {
        Toast.create(`${err.response.data.error}`, "red");
        console.log(err);
      });
    return editDepat;
  }
  static async deleteDepartamento(data) {
    const deleteDepat = await instance
      .delete(`departments/${data}`)
      .then((resp) => {
        Toast.create("Departamento deletado com sucesso", "green");
        return resp;
      })
      .catch((err) => {
        Toast.create(`${err.response.data.error}`, "red");
        console.log(err);
      });
    return deleteDepat;
  }
}
