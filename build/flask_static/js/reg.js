document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'),
          button = document.querySelector('.form__button'),
          result = document.querySelector('.form__result'),
          loading = document.querySelector('.form__loading'),

          emailInput = document.querySelector('[name="email"]'),
          emailError = document.querySelector('[data-error="email"]'),

          nameInput = document.querySelector('[name="name"]'),
          nameError = document.querySelector('[data-error="name"]'),
          
          surnameInput = document.querySelector('[name="surname"]'),
          surnameError = document.querySelector('[data-error="surname"]'),
          
          passwordInput = document.querySelector('[name="password"]'),
          passwordError = document.querySelector('[data-error="password"]'),
          
          repeatedPasswordInput = document.querySelector('[name="repeatedPassword"]'),
          repeatedPasswordError = document.querySelector('[data-error="repeatedPassword"]');
    
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


    async function register() {
        const userData = {
            'email': emailInput.value,
            'name': nameInput.value,
            'surname': surnameInput.value,
            'password': passwordInput.value,
            'repeatedPassword': repeatedPasswordInput.value
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
            result.innerHTML = 'Регистрация завершена!';
            setTimeout(() => {window.location.href = response.url;}, 220);
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

            if ('repeatedPassword' in json) {
                repeatedPasswordInput.classList.add('form__input-error');
                repeatedPasswordError.classList.add('form__comment-active');
                repeatedPasswordError.innerHTML = json.repeatedPassword;
            }
        }
    }


    button.addEventListener('click', (e) => {
        if (checkForm) {
            [emailError, nameError, surnameError, passwordError, repeatedPasswordError].forEach((e) => {
                e.innerHTML = '';
                e.classList.remove('form__comment-active');
            });

            [emailInput, nameInput, surnameInput, passwordInput, repeatedPasswordInput].forEach((e) => {
                e.classList.remove('form__input-error');
            });

            result.innerHTML = '';

            button.classList.add('form__button-hidden');
            loading.classList.add('form__loading-active');
            register();
        }
    });


    // Функция валидации почты
    function validityEmail(email) {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    };
});