import { navigateTo } from './router.js';

export function handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(`Authorization code: ${code}`);

    // Processar o código de autorização conforme necessário
    // Aqui você pode armazenar o código, enviá-lo para o backend, etc.

    // Redirecionar para outra rota, por exemplo, '/dashboard'
    navigateTo('/dashboard');
}
