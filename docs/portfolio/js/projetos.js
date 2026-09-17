// Abre a janela de detalhes com o conteúdo do <template> de cada projeto.
(function () {
  const dialogo = document.getElementById("detalhes");
  const conteudo = document.getElementById("detalhes-conteudo");
  const semestre = document.getElementById("detalhes-semestre");
  let origem = null;

  function abrir(id, botao) {
    const tpl = document.getElementById("tpl-" + id);
    if (!tpl) return;
    origem = botao;
    conteudo.replaceChildren(tpl.content.cloneNode(true));
    semestre.textContent = tpl.dataset.semestre || "";
    conteudo.scrollTop = 0;
    dialogo.showModal();
    history.replaceState(null, "", "#projeto-" + id);
  }

  function fechar() {
    dialogo.close();
  }

  document.addEventListener("click", function (e) {
    const botao = e.target.closest("[data-abrir]");
    if (botao) abrir(botao.dataset.abrir, botao);
    if (e.target.closest("[data-fechar]")) fechar();
  });

  // Clique fora da janela fecha
  dialogo.addEventListener("click", function (e) {
    if (e.target === dialogo) fechar();
  });

  dialogo.addEventListener("close", function () {
    history.replaceState(null, "", location.pathname);
    if (origem) origem.focus();
  });

  // Permite compartilhar o link direto de um projeto: projetos.html#projeto-wizardvision
  function abrirPeloLink() {
    const hash = location.hash.match(/^#projeto-(.+)$/);
    if (hash && !dialogo.open) abrir(hash[1], null);
  }
  abrirPeloLink();
  window.addEventListener("hashchange", abrirPeloLink);
})();
