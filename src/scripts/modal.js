export class Modais {
  static errorModal(data) {
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const div = document.createElement("div");
    div.classList.add("modal");
    div.classList.add("flex__row");
    div.classList.add("align__center");
    const divPrinc = document.createElement("div");
    divPrinc.classList.add("modal__card");
    divPrinc.classList.add("flex__column");
    const h2 = document.createElement("h2");
    h2.classList.add("title__style__1");
    h2.innerText = "Um problema foi encontrado";
    const p = document.createElement("p");
    p.classList.add("text__style__1");
    p.innerText = `${data}`;
    const button = document.createElement("button");
    button.classList.add("button__style__1");
    button.id = "fechar__modal";
    button.innerText = "Entendi";
    div.append(divPrinc);
    divPrinc.append(h2, p, button);

    body.insertBefore(div, header);

    const btnEntendi = document.getElementById("fechar__modal");
    const divModal = document.getElementsByClassName("modal")[0];

    btnEntendi.addEventListener("click", (event) => {
      event.preventDefault();
      divModal.classList.toggle("slideErrorOut");
      setTimeout(() => {
        divModal.remove();
      }, 2000);
    });
  }
}
