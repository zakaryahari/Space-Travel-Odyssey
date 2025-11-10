// login js script part 

let accommodation_data = [];
let destinations_data = [];
let spacecraft_data = [];
let booking_option_data = [];

const SESSION_KEY = 'login';
const VALID_EMAIL = 'zakaryahari42@gmail.com';

// User Story 1:

let email;

const submit_login_btn = document.getElementById('login_input_id');
if (submit_login_btn) {
    submit_login_btn.addEventListener('click', () => {
        email = document.getElementById('email_input_id').value;

        const userstring = localStorage.getItem('login');
        const usersavedinfo = JSON.parse(userstring);


        if (email === VALID_EMAIL) {

            const username = {
                user: 'zakaryahari42@gmail.com',
                islogin: true,
            };

            localStorage.setItem(SESSION_KEY, JSON.stringify(username));

            console.log('valide');
            Login_info_valid();
            window.location.href = 'index.html';
            console.log('rihab');
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

    Load_Data();

    // User Story 2:

    const userlogin_string = localStorage.getItem('login');
    const user = JSON.parse(userlogin_string);

    if (user.islogin === true) {
        Login_info_valid();
    }


});

const Login_href = document.getElementById('Login_href_link_id');

if (Login_href) {
    Login_href.addEventListener('click', () => {
        Login_href.textContent = 'login';
        const userlogin_string = localStorage.getItem('login');
        const user = JSON.parse(userlogin_string);
        user.islogin = false;
        localStorage.setItem('login', JSON.stringify(user));
    });
}

// User Story 3:

async function loadJsonData(filename) {
    const response = await fetch(filename);
    return await response.json();
}


async function Load_Data() {

    const [accoms, dests, spacecraft, options] = await Promise.all([
        loadJsonData('./Data/accommodations.json'),
        loadJsonData('./Data/destinations.json'),
        loadJsonData('./Data/spacecraft.json'),
        loadJsonData('./Data/booking-options.json')
    ]);


    if (accoms && accoms.accommodations) {
        accommodation_data = accoms.accommodations;
        console.log(`Loaded ${accommodation_data.length} accommodations.`);
    }

    if (dests && dests.destinations) {
        destinations_data = dests.destinations;
        console.log(`Loaded ${destinations_data.length} destinations.`);
    }

    if (spacecraft && spacecraft.spacecraft) {
        spacecraft_data = spacecraft.spacecraft;
        console.log(`Loaded ${spacecraft_data.length} spacecraft.`);
    }

    if (options) {
        booking_option_data = options;
        console.log("Loaded booking options.");
    }

    Load_Destination_option();
}

function Load_Destination_option() {
    const booking_form = document.getElementById('booking-form');

    if (booking_form) {
        const destination_select_input = document.getElementById('destination');
        destination_select_input.innerHTML = '';

        destinations_data.forEach(Destination_val => {
            const child_option = document.createElement('option');
            child_option.textContent = Destination_val.name;
            console.log(Destination_val.name);

            child_option.setAttribute('value', Destination_val.id);

            destination_select_input.appendChild(child_option);
        });

    }
}

// booking js part

