// login js part 

const username = {
    user: 'zakaryahari42@gmail.com',
    islogin: true,
};

localStorage.setItem('login', JSON.stringify(username));

let email;

const submit_login_btn = document.getElementById('login_input_id');

submit_login_btn.addEventListener('click', () => {
    email = document.getElementById('email_input_id').value;

    const userstring = localStorage.getItem('login');
    const usersavedinfo = JSON.parse(userstring);

    if (email === usersavedinfo.user) {
        console.log('valide');
        window.location.href = 'index.html';
    }
    else {
        alert('Invalide user info , Please Try Again with the corect info.');
        const form = document.getElementById('form_id');
        form.reset();
        console.log('not valide');
    }
});


// booking js part

