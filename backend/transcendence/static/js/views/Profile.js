import AbstractView from "./AbstractView.js";

export class Profile extends AbstractView {
    constructor() {
        super();
        this.setTitle("Profile");
    }

    async getHtml() {
        return
        if(user.is_authenticated){
        `
            <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
                <ul class="nav nav-pills flex-column mb-auto">
                    <li>
                        <a href="#" class="nav-link">
                            <i class="bi bi-person-circle"></i> Profile
                        </a>
                    </li>
                </ul>
            </div>

            <div class="container-fluid main-content">
                <div class="row">
                    <div class="col">
                        <div class="banner bg-dark text-white"></div>
                        <div class="d-flex align-items-center mt-3">
                            <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" alt="Profile Picture" class="rounded-circle me-3 profile-img">
                            <div>
                                <h2>Anna Yoast</h2>
                                <p>@annayoast</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h4 class="card-title">About Anna</h4>
                                <p class="card-text">With a strong foundation in software development and a keen eye for user experience, I've been fortunate enough to lead teams in bringing various successful products to life...</p>
                                <button class="btn btn-outline-primary">Learn more</button>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <h4 class="card-title">Ranking </h4>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper eleifend est, ac malesuada neque eu nulla.</p>
                                <button class="btn btn-primary">Play</button>
                                <button class="btn btn-outline-secondary">Save for later</button>
                            </div>
                        </div>
                    </div>
                    div>
                </div>
            </div>

            <style>
                .sidebar {
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 250px;
                    padding: 20px;
                    background-color: #f8f9fa;
                }
                .main-content {
                    margin-left: 270px; /* Adicionar margem suficiente para a largura da sidebar */
                }
                .banner {
                    height: 200px;
                    background-image: url('https://picsum.photos/2000/200');
                    background-size: cover;
                    background-position: center;
                }
                .profile-img {
                    width: 100px;
                    height: 100px;
                }
            </style>
        `;
        } else {
            `
            <div class="container">
                
            </div>
            `;
        }
    }
}
