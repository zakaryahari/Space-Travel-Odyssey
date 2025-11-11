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

        const default_option = document.createElement('option');
        default_option.textContent = 'Please select your destination...';
        default_option.selected = true ;
        default_option.setAttribute('value','default_option');

        destination_select_input.appendChild(default_option);

        destinations_data.forEach(Destination_val => {
            const child_option = document.createElement('option');
            child_option.textContent = Destination_val.name;
            // console.log(Destination_val.name);
            // if (Destination_val.id === "moon") {
            //     child_option.selected = true;
            // }
            child_option.setAttribute('value', Destination_val.id);

            destination_select_input.appendChild(child_option);
        });
    }
}

function Afficher_Accommodation(List) {
    const Accommodation_container_id = document.getElementById('Accommodation_container_id');

    if (Accommodation_container_id) {
        Accommodation_container_id.innerHTML= '';

        
        List.forEach(des => {
            accommodation_data.forEach(acc => {
                if (des === acc.id) {
                    const accomodation_card = `
                            <label
                                class="flex flex-col p-4 border border-neon-blue/30 rounded-lg cursor-pointer transition-all hover:bg-space-blue/70 has-checked:border-neon-blue">
                                <input type="radio" name="accommodation" value="${acc.id}" class="radio_btn hidden peer">
                                <span class="font-orbitron text-lg text-neon-blue peer-checked:text-neon-cyan">${acc.name}</span>
                                <p class="text-gray-400 text-sm">${acc.shortDescription}</p>
                            </label>
                    `;
                    Accommodation_container_id.innerHTML +=accomodation_card;
                }
            });
        });
    }
}

const destination = document.getElementById('destination');

if (destination) {
    destination.addEventListener('change', (e) => {
        console.log(e.target.value);
        let selected_destinations = [];
        destinations_data.forEach(destinations_val => {
            if (e.target.value === destinations_val.id) {
                selected_destination = destinations_val;
                Afficher_Accommodation(selected_destination.accommodations);
            }
        })
    });
}

function Passenger_inputset_load_inputs(val) {
    for (let index = 0; index < val; index++) {
                const inner_inputset = `
                    <h3 class="font-orbitron text-2xl font-bold mb-4 mt-8 border-b border-neon-blue/20 pb-2">Personal
                            Information (Passenger N°${index+1})</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="passenger-container">
                            <div class="form-group">
                                <label for="first-name-1" class="block mb-2 font-semibold text-gray-200">First Name</label>
                                <input type="text" id="first-name-1" name="firstName[]" required
                                    placeholder="Enter your first name"
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors">
                            </div>
                            <div class="form-group">
                                <label for="last-name-1" class="block mb-2 font-semibold text-gray-200">Last Name</label>
                                <input type="text" id="last-name-1" name="lastName[]" required
                                    placeholder="Enter your last name"
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors">
                            </div>

                            <div class="form-group">
                                <label for="email-1" class="block mb-2 font-semibold text-gray-200">Email Address</label>
                                <input type="email" id="email-1" name="email[]" required placeholder="Enter your email"
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors">
                            </div>
                            <div class="form-group">
                                <label for="phone-1" class="block mb-2 font-semibold text-gray-200">Phone Number</label>
                                <input type="tel" id="phone-1" name="phone[]" required placeholder="Enter your phone number"
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors">
                            </div>

                            <div class="col-span-2">
                                <label for="requirements" class="block mb-2 font-semibold text-gray-200">Special
                                    Requirements</label>
                                <textarea id="requirements" name="requirements"
                                    placeholder="Any special requirements or notes..."
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors min-h-[100px]"></textarea>
                            </div>
                        </div>
                `;
                Passenger_inputset_container.innerHTML += inner_inputset;
            }
}
const Passenger_inputset_container = document.getElementById('Passenger_inputset_container');
const add_passenger_btn = document.getElementById('add_passenger_btn');

function Passenger_inputset(val) {
    if (val == 1 || val == 2 || val == 3) {
        if (Passenger_inputset_container) {
            Passenger_inputset_container.innerHTML = '';
            add_passenger_btn.classList.add('hidden');
            if (val == 3) {
                add_passenger_btn.classList.remove('hidden');
                // Passenger_inputset_load_inputs(val);
            }
            Passenger_inputset_load_inputs(val);
        }
    }

}

const radio_container = document.getElementById('radio_container');

if (radio_container) {
    radio_container.addEventListener('click', (e)=>{
        if (e.target.tagName === 'INPUT' && e.target.type === 'radio') {
            // console.log('TEST');
            const radio_selected = e.target.value;
            // console.log(radio_selected);
            Passenger_inputset(radio_selected);
        }
    });
}

// booking js part

