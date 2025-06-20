const formulario = document.getElementById("meuFormulario");
const container = document.getElementById("container-projetos");
const userName = "MatheusJuK";

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const celular = document.getElementById("celular").value;
  const mensagem = document.getElementById("message").value;

  enviarDadosParaDiscord(nome, email, celular, mensagem);
});

async function enviarDadosParaDiscord(nome, email, celular, mensagem) {
  const webhookURL =
    "https://discord.com/api/webhooks/1379840221151100959/JKpkzBWOU0mWjG5TQK6fjxmiBRY-ECaifAORyfJ1Lg61AeZ3H7wlngihXogmoMcfA0Km";

  const dados = {
    content: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${celular}\nMensagem: ${mensagem}`,
  };
  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      alert("Dados enviados com sucesso!");
      formulario.reset();
    } else {
      alert("Erro ao enviar dados.");
    }
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
  }
}

async function listarRepositorios() {
  const response = await fetch(
    `https://api.github.com/users/${userName}/repos`
  );
  const repos = await response.json();

  for (const repo of repos) {
    const card = document.createElement("div");
    card.classList.add("projeto-card");
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "Sem descrição"}</p>
      <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
    `;
    container.appendChild(card);
  }
}

listarRepositorios();
