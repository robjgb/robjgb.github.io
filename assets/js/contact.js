  async function handleSubmit(event, form) {
    console.log("Form submitted");
    event.preventDefault(); // Prevent default form submission

    const url = "https://script.google.com/macros/s/AKfycbwkKI8hCSw3fFh674qDHeUR7k0EgxiKvP5w0Vmk_o9axOL4meQvLs1g8BJKo24XLn-nWw/exec";

    let formElement1 = document.getElementById("textInputExample");
    let formElement2 = document.getElementById("textareaExample");
    let formBtn = document.getElementById("formBtn");
    let spinner = document.getElementById("spinner");
    let loadingText = document.getElementById("loadingText");
    let sendText = document.getElementById("sendText");
    let formData = new FormData(form);

    try {
      formElement1.setAttribute("disabled", "");
      formElement2.setAttribute("disabled", "");
      formBtn.setAttribute("disabled", "");
      spinner.classList.remove("d-none");
      loadingText.classList.remove("d-none");
      sendText.classList.add("d-none");

      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();

      console.log(data);
      alert("Message has been sent successfully.");
    } catch (error) {
      alert(error);
    } finally {
      formElement1.removeAttribute("disabled");
      formElement2.removeAttribute("disabled");
      formBtn.removeAttribute("disabled");
      spinner.classList.add("d-none");
      loadingText.classList.add("d-none");
      sendText.classList.remove("d-none");
    }
  }
