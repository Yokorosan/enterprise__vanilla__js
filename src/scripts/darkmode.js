export class DarkMode {
  static modeBtn = document.getElementById("dark__mode");
  static html = document.querySelector("html");

  static darkActive() {
    this.modeBtn.addEventListener("click", () => {
      this.html.classList.toggle("dark-mode");
    });
  }
}
