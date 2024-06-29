// checkJWT.js

export async function checkJWT() {
    const jwtToken = localStorage.getItem('jwtToken');

    console.log("jwt:", jwtToken)

    if (!jwtToken) {
        // Se não houver token JWT, redireciona para a tela de login
        window.location.href = 'http://localhost'; // Ajuste a URL conforme necessário
        return false;
    }

    try {
        const response = await fetch('/api/validate-jwt', {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        if (response.status === 200) {
            return true; // JWT válido, permite o acesso ao Dashboard
        } else {
            // JWT inválido ou não autorizado, limpa o token do localStorage e redireciona para o login
            localStorage.removeItem('jwtToken');
            window.location.href = 'http://localhost'; // Ajuste a URL conforme necessário
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar JWT:', error);
        // Lógica para lidar com erros, como redirecionar para a tela de login
        localStorage.removeItem('jwtToken');
        window.location.href = 'http://localhost'; // Ajuste a URL conforme necessário
        return false;
    }
}
