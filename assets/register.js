function togglePasswordVisibility() {
	const passwordField = document.getElementById('password');
	const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
	passwordField.setAttribute('type', type);
}

function focusNextInput(currentInputId, nextInputId) {
	const currentInput = document.getElementById(currentInputId);
	const nextInput = document.getElementById(nextInputId);
	currentInput.addEventListener('keydown', function (event) {
		if (event.key === 'Enter' && currentInput.checkValidity()) {
			event.preventDefault();
			nextInput.focus();
		}
	});
}

document.getElementById('email').addEventListener('input', function () {
	var email = this;
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	var emailLabel = document.getElementById('email-label');
	if (emailPattern.test(email.value)) {
		email.classList.remove('is-invalid');
		emailLabel.classList.remove('awaiting');
		emailLabel.classList.add('completed');
		document.getElementById('password-container').classList.remove('hidden');
		document.getElementById('password').focus();
	} else {
		email.classList.add('is-invalid');
		emailLabel.classList.remove('completed');
		emailLabel.classList.add('awaiting');
		document.getElementById('password-container').classList.add('hidden');
		document.getElementById('username-container').classList.add('hidden');
		document.getElementById('submit-btn').classList.add('hidden');
		document.getElementById('email-preferences-container').classList.add('hidden');
	}
});

document.getElementById('password').addEventListener('input', function () {
	var password = this;
	var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	var passwordLabel = document.getElementById('password-label');
	if (passwordPattern.test(password.value)) {
		password.classList.remove('is-invalid');
		passwordLabel.classList.remove('awaiting');
		passwordLabel.classList.add('completed');
		document.getElementById('username-container').classList.remove('hidden');
		document.getElementById('username').focus();
	} else {
		password.classList.add('is-invalid');
		passwordLabel.classList.remove('completed');
		passwordLabel.classList.add('awaiting');
		document.getElementById('username-container').classList.add('hidden');
		document.getElementById('submit-btn').classList.add('hidden');
		document.getElementById('email-preferences-container').classList.add('hidden');
	}
});

document.getElementById('username').addEventListener('input', function () {
	var username = this;
	var usernamePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	var usernameLabel = document.getElementById('username-label');
	if (usernamePattern.test(username.value)) {
		username.classList.remove('is-invalid');
		usernameLabel.classList.remove('awaiting');
		usernameLabel.classList.add('completed');
		document.getElementById('email-preferences-container').classList.remove('hidden');
		document.getElementById('submit-btn').classList.remove('hidden');
	} else {
		username.classList.add('is-invalid');
		usernameLabel.classList.remove('completed');
		usernameLabel.classList.add('awaiting');
		document.getElementById('submit-btn').classList.add('hidden');
		document.getElementById('email-preferences-container').classList.add('hidden');
	}
});

document.getElementById('signupForm').addEventListener('submit', function (event) {
	event.preventDefault();
	// const email = document.getElementById('email').value;
	// const password = document.getElementById('password').value;
	// const username = document.getElementById('username').value;
	consolo.log(email, password, username);
	window.location.href = 'game.html';

});

focusNextInput('email', 'password');
focusNextInput('password', 'username');
