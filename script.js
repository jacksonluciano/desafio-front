const erroNome = document.getElementById("erro-nome");
const erroIdade = document.getElementById("erro-idade");
const erroImagem = document.getElementById("erro-imagem");
const erroEnvio = document.getElementById("erro-envio");

function valNome() {
  var nome = document.getElementById("inputNome").value;
  console.log("Nome: " + nome.length);

  if (!/^[a-zA-Z\s]*$/.test(nome)) {
    erroNome.innerHTML = "Digite apenas letras";
    erroNome.classList.remove("valid");
    return false;
  }
  if (nome.length == 0) {
    erroNome.innerHTML = "Digite seu nome";
    erroNome.classList.remove("valid");
    return false;
  }
  erroNome.classList.add("valid");
  erroNome.innerHTML = "Correto";
  return true;
}

function valIdade() {
  var idade = document.getElementById("inputIdade").value;
  let numIdade = parseInt(idade);

  if (numIdade < 1 || numIdade > 119) {
    erroIdade.innerHTML = "Digite um valor entre 1 e 119";
    erroIdade.classList.remove("valid");
    return false;
  }
  if (idade.length == 0) {
    erroIdade.innerHTML = "Digite sua idade";
    erroIdade.classList.remove("valid");
    return false;
  }
  if (!idade.match(/^[0-9]*$/)) {
    erroIdade.innerHTML = "Digite apenas números";
    erroIdade.classList.remove("valid");
    return false;
  }
  erroIdade.classList.add("valid");
  erroIdade.innerHTML = "Correto";
  return true;
}

function valImage() {
  var fileInput = document.getElementById("inputImagem");
  var imagem = fileInput.value;

  if (imagem.length == 0) {
    erroImagem.innerHTML = "Escolha uma imagem";
    erroImagem.classList.remove("valid");
    return false;
  }

  // const fileSize = fileInput.files[0].size / 1024 / 1024;
  // sizeFile = sizeFile.toFixed(2);

  var extFiles = /(\.png)$/i;
  if (!extFiles.exec(imagem)) {
    erroImagem.innerHTML = "Apenas o formato .png é permitido";
    erroImagem.classList.remove("valid");
    // fileInput.value = '';
    return false;
  }
  // if (fileSize > 2) {
  //       erroImagem.innerHTML = 'Permitido apenas imagens até 2mb';
  //       fileInput.value = '';
  //       return false;
  // }
  erroImagem.classList.add("valid");
  erroImagem.innerHTML = "Correto";
  return true;
}

function valForm() {
  if (!valNome() || !valIdade() || !valImage()) {
    erroEnvio.style.display = "block";
    erroEnvio.innerHTML = "Preencha o formulário corretamente";
    setTimeout(function () {
      erroEnvio.style.display = "none";
    }, 4000);
    return false;
  }
  setTimeout(function () {
    erroEnvio.style.display = "none";
  }, 4000);
}

const submitBtn = document.getElementById("enviar");
const fieldNome = document.getElementById("inputNome");
const fieldIdade = document.getElementById("inputIdade");
const fieldImagem = document.getElementById("inputImagem");

const checkEnableSubmit = () => {
  submitBtn.disabled = !(valNome() && valIdade() && valImage());
};

fieldNome.addEventListener("keyup", checkEnableSubmit);
fieldIdade.addEventListener("keyup", checkEnableSubmit);
fieldImagem.addEventListener("change", checkEnableSubmit);

let form = document.querySelector("#form");
form.addEventListener("submit", function () {
  var registros = JSON.parse(sessionStorage.getItem("registroData"));
  if (registros == null) registros = [];
  var nome = document.querySelector("#inputNome").value;
  var idade = document.querySelector("#inputIdade").value;
  var imagem = document.getElementById("inputImagem");

  const file = imagem.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    let imgDataUrl = `data:image/png;base64,${base64String}`;
    // console.log("Dentro do submit: " + imgDataUrl);
    var usuario = {
      imagem: imgDataUrl,
      nome: nome,
      idade: idade,
    };
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    registros.push(usuario);
    sessionStorage.setItem("registroData", JSON.stringify(registros));
  };
  reader.readAsDataURL(file);
});

$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
