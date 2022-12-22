export class Toast {
  static create(text, color) {
    Toastify({
      text: text,
      duration: 5000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color,
      },
    }).showToast();
  }
}
