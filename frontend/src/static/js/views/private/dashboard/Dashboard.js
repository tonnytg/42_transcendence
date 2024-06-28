export default function Dashboard() {
    const element = document.createElement('div');
    element.innerHTML = `
        <style>
            .dashboard {
                font-family: Arial, sans-serif;
            }
        </style>
        <div class="dashboard">
            <h1>Dashboard</h1>
            <p>Você foi redirecionado com sucesso após a autenticação.</p>
        </div>
    `;
    return element;
}
