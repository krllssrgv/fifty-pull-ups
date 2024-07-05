// Функция блокировки/разблокировки кнопок при пустом/заполненном input
function activeOrPassiveButton(form, button) {
    form.addEventListener('input', () => {
        if (form.checkValidity()) {
            button.classList.remove('form__button-block');
            button.classList.add('form__button-access');
        } else {
            button.classList.remove('form__button-access');
            button.classList.add('form__button-block');
        };
    });
};

// Функция добавления ошибок
function addErrors(input, inputError) {
    input.classList.add('form__input-incorrect');
    inputError.classList.add('form__inputComment-active');
};

// Функция очистки ошибок
function clearErrors(form, inputs, inputErrors) {
    form.addEventListener('input', () => {
        inputs.forEach((element) => {
            element.classList.remove('form__input-incorrect');
        });

        inputErrors.forEach((element) => {
            element.classList.remove('form__inputComment-active');
        });
    });
};


document.addEventListener('DOMContentLoaded', () => {

    let logForm = document.querySelector('form'),
        logButton = document.querySelector('.form__button'),

        logEmail = document.querySelector('[name="email-log"]'),
        logEmailError = document.querySelector('[data-inputProperty="email-log"]'),

        logPassword = document.querySelector('[name="password-log"]'),
        logPasswordError = document.querySelector('[data-inputProperty="password-log"]');

    activeOrPassiveButton(logForm, logButton);
    clearErrors(logForm, [logEmail, logPassword], [logEmailError, logPasswordError]);

    logButton.addEventListener('click', (event) => {
        event.preventDefault();

        userData = {
            'email': logEmail.value,
            'password': logPassword.value
        };

        if (!(event.target.classList.contains('form__button-block'))) {

            const logIn = async () => {
                const response = await fetch('', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.redirected) {
                    window.location.href = response.url;
                }

                if (!response.ok) {
                    const json = await response.json();
                    if (json.error === 'email') {
                        addErrors(logEmail, logEmailError);
                    } else if (json.error === 'password') {
                        addErrors(logPassword, logPasswordError);
                    }
                }
            }

            logIn();
        };
    });
});