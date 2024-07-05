document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'),
          button = document.querySelector('.form__button'),
          loading = document.querySelector('.form__loading'),

          emailInput = document.querySelector('[name="email"]'),
          emailError = document.querySelector('[data-error="email"]'),
          
          passwordInput = document.querySelector('[name="password"]'),
          passwordError = document.querySelector('[data-error="password"]');
    
    let checkForm = false;


    form.addEventListener('input', (e) => {
        if (form.checkValidity()) {
            button.classList.remove('form__button-block');
            button.classList.add('form__button-access');
            checkForm = true;
        } else {
            button.classList.remove('form__button-access');
            button.classList.add('form__button-block');
            checkForm = false;
        };
    });


    async function login() {
        const userData = {
            'email': emailInput.value,
            'password': passwordInput.value,
        }

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.redirected) {
            loading.classList.remove('form__loading-active');
            setTimeout(() => {window.location.href = response.url;}, 50);
        } else {
            button.classList.remove('form__button-hidden');
            loading.classList.remove('form__loading-active');

            const json = await response.json();
            console.log(json)
            if ('email' in json) {
                emailInput.classList.add('form__input-error');
                emailError.classList.add('form__comment-active');
                emailError.innerHTML = json.email;
            }

            if ('result' in json) {
                result.innerHTML = json.result;
            }

            if ('password' in json) {
                passwordInput.classList.add('form__input-error');
                passwordError.classList.add('form__comment-active');
                passwordError.innerHTML = json.password;
            }
        }
    }


    button.addEventListener('click', (e) => {
        if (checkForm) {
            emailError.innerHTML = '';
            emailError.classList.remove('form__comment-active');

            passwordError.innerHTML = '';
            passwordError.classList.remove('form__comment-active');

            emailInput.classList.remove('form__input-error');
            passwordInput.classList.remove('form__input-error');

            button.classList.add('form__button-hidden');
            loading.classList.add('form__loading-active');
            login();
        }
    });
});