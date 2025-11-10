// login js script part 


// User Story 1:

let email;

const submit_login_btn = document.getElementById('login_input_id');
if (submit_login_btn) {
    submit_login_btn.addEventListener('click', () => {
        email = document.getElementById('email_input_id').value;

        const userstring = localStorage.getItem('login');
        const usersavedinfo = JSON.parse(userstring);


        if (email === usersavedinfo.user) {

            const username = {
                user: 'zakaryahari42@gmail.com',
                islogin: true,
            };

            localStorage.setItem('login', JSON.stringify(username));

            console.log('valide');
            Login_info_valid();
            window.location.href = 'index.html';
        }
        else {
            alert('Invalide user info , Please Try Again with the corect info.');
            const form = document.getElementById('form_id');
            form.reset();
            console.log('not valide');
        }
    });
};

function Login_info_valid() {
    const Login_href = document.getElementById('Login_href_link_id');
    Login_href.textContent = 'logout'
    console.log(Login_href.textContent);
}



document.addEventListener('DOMContentLoaded', function () {

    // User Story 2:

    const userlogin_string = localStorage.getItem('login');
    const user = JSON.parse(userlogin_string);

    if (user.islogin === true) {
        const Login_href = document.getElementById('Login_href_link_id');
        Login_href.textContent = 'logout';
    }
});

// booking js part

