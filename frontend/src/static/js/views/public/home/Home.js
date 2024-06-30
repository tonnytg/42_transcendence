import { navigateTo } from '../../../Router.js';

export default function Home() {
    const element = document.createElement('div');
    element.innerHTML = `
                            <div class="container d-flex flex-column align-content-center justify-content-center vh-100">
                                <div class="card col-2-md w-100">
                                    <div class="row border-rounded  justify-content-center m-5 w-50 mx-auto">
                                        <div class="card-body justify-content-center align-items-center">
                                            <img class="mx-auto d-block" src="static/images/logo-m.png" alt="">
                                            <h2 class="card-title text-center" alt="The ultimate arcade Pong">The ultimate arcade PONG</h2>
                                            <form>
                                                <div class=" mb-3">
                                                    <label for="email">Digite seu e-mail</label>
                                                    <input type="email" class="form-control " style="background-color: transparent;" id="email" name="email" required>
                                                </div>
                                                <div class=" mb-3">
                                                    <label for="password">Digite sua senha</label>
                                                    <input type="password" class="form-control " style="background-color: transparent;" id="password" name="password" required>
                                                </div>

                                                <div class="mb-4 d-grid">
                                                    <button id="aboutButton"type="submit" class="btn btn-dark btn-block"><i class="fas fa-sign-in-alt" alt="Entrar"></i>
                                                        Entrar</button>
                                                    <p class="text-center fs-5">ou</p>
                                                    <button id="loginButton" type="button" class="btn btn-dark btn-block"><i class="fa fa-duotone fa-rocket" alt="Login com a 42"></i> Login 42</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

    element.querySelector('#aboutButton').addEventListener('click', () => {
        navigateTo('/about');
    });

    const handleButtonLogin = () => {
        const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-949c9204ce2bacc41d9143cdcb52e5152e57d57686ef9cad4cfbe996f15a106e&redirect_uri=http%3A%2F%2Flocalhost%3A80%2Fcallback&response_type=code`;
        window.location.href = authUrl;
    };

    element.querySelector('#loginButton').addEventListener('click', handleButtonLogin);

    return element;
}
