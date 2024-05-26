import { handleRouting, navigateTo } from "./router.js";

// Função para adicionar event listener aos links de navegação
const addNavigationListener = () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
}

// Função para inicializar os event listeners
const initializeEventListeners = () => {
    // Event listener para o evento 'DOMContentLoaded' (carregamento da página)
    document.addEventListener("DOMContentLoaded", () => {
        addNavigationListener();

        // Event listener para o evento 'popstate' (navegação do histórico)
        window.addEventListener("popstate", handleRouting);

        // Chama o roteador para a rota inicial
        handleRouting();
    });
}

initializeEventListeners();
