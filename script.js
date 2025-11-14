// login js script part 

let accommodation_data = [];
let destinations_data = [];
let spacecraft_data = [];
let booking_option_data = [];


let My_Booking = [];

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

    const destination_select_input = document.getElementById('destination');
    const selectedDestId = destination_select_input.value;
    console.log(selectedDestId);

    if (selectedDestId === 'default_option') {
        Afficher_Accommodation(null);
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
        default_option.selected = true;
        default_option.setAttribute('value', 'default_option');

        destination_select_input.appendChild(default_option);

        destinations_data.forEach(Destination_val => {
            const child_option = document.createElement('option');
            child_option.textContent = Destination_val.name;
            // console.log(Destination_val.name);
            // if (Destination_val.id === "moon") {
            //     child_option.selected = true;
            // }
            child_option.setAttribute('value', Destination_val.id);
            child_option.setAttribute('price_val', Destination_val.price);

            destination_select_input.appendChild(child_option);
        });
    }
}

function Afficher_Accommodation(ID) {
    const Accommodation_container_id = document.getElementById('Accommodation_container_id');
    if (ID !== null) {
        
        
        if (Accommodation_container_id) {
            Accommodation_container_id.innerHTML = '';
            
            
            accommodation_data.forEach(acc => {
                acc.availableOn.forEach(available =>{
                    if (available === ID) {
                        console.log('true');
                        // console.log(acc.id);
                        const accomodation_card = `
                            <label
                                class="Accommodation_card_iteam flex flex-col p-4 border border-neon-blue/30 rounded-lg cursor-pointer transition-all hover:bg-space-blue/70 has-checked:border-neon-blue" id="" >
                                <input type="radio" name="accommodation" value="${acc.id}" class="radio_btn hidden peer" price_val="${acc.pricePerDay}">
                                <span class="font-orbitron text-lg text-neon-blue peer-checked:text-neon-cyan">${acc.name}</span>
                                <p class="text-gray-400 text-sm">${acc.shortDescription}</p>
                            </label>
                            `;
                        Accommodation_container_id.innerHTML += accomodation_card;
                    }
                });
            });
        }
    }
    else{
        Accommodation_container_id.innerHTML = '';
    }
}

function Afficher_Destination(Dis_arr) {
    const Destination_container_id = document.querySelector('.description_destination_card');

    if (Dis_arr !== null) {
        console.log('im inside the destination hhh');
        if (Destination_container_id) {
            Destination_container_id.innerHTML = '';

                        const destination_card = `
                            <div class="planet-card p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div class="lg:order-2 flex justify-center">
                                    <div
                                        class="w-64 h-64 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center glow">
                                        <i class="fas fa-globe-americas text-white text-6xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="font-orbitron text-3xl mb-4 text-glow">${Dis_arr.name}</h2>
                                    <p class="text-gray-300 mb-4 text-1xl">${Dis_arr.description}
                                    </p>
                                    <div class="grid grid-cols-2 gap-4 mb-6">
                                        <div class="bg-space-blue/70 p-4 rounded-lg">
                                            <h4 class="font-orbitron text-neon-blue mb-2">Journey Time</h4>
                                            <p class="text-gray-300">${Dis_arr.travelDuration}</p>
                                        </div>
                                        <div class="bg-space-blue/70 p-4 rounded-lg">
                                            <h4 class="font-orbitron text-neon-blue mb-2">Gravity</h4>
                                            <p class="text-gray-300">${Dis_arr.gravity}</p>
                                        </div>
                                        <div class="bg-space-blue/70 p-4 rounded-lg">
                                            <h4 class="font-orbitron text-neon-blue mb-2">Temperature</h4>
                                            <p class="text-gray-300">${Dis_arr.temperature}</p>
                                        </div>
                                        <div class="bg-space-blue/70 p-4 rounded-lg">
                                            <h4 class="font-orbitron text-neon-blue mb-2">Atmosphere</h4>
                                            <p class="text-gray-300">${Dis_arr.atmosphere}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        Destination_container_id.innerHTML += destination_card;
        }
    }else{
        console.log('im inside the destination hhhihsdgjqghsdkgkqds');
        Destination_container_id.innerHTML = '';
    }

}

const destination = document.getElementById('destination');
const totalprice_input = document.getElementById('total-price');

if (destination) {

    destination.addEventListener('change', (e) => {
        // console.log(e.target.value);
        let selected_destinations ;
        destinations_data.forEach(destinations_val => {
            if (e.target.value === destinations_val.id) {
                selected_destinations = destinations_val;
                Afficher_Accommodation(selected_destinations.id);
                Afficher_Destination(selected_destinations);
                console.log(selected_destinations);
            }

            // console.log(e.target.value);
        });
        if (e.target.value === 'default_option') {
            Afficher_Accommodation(null);
            Afficher_Destination(null);
        }
    });
    Calculat_price();
}

function Passenger_inputset_load_inputs(val) {
    for (let index = 0; index < val; index++) {
        const inner_inputset = `
                    <h3 class="font-orbitron text-2xl font-bold mb-4 mt-8 border-b border-neon-blue/20 pb-2">Personal
                            Information (Passenger N°${index + 1})</h3>
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
                                <textarea id="requirements" name="requirements[]"
                                    placeholder="Any special requirements or notes..."
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors min-h-[100px]"></textarea>
                            </div>
                        </div>
                `;
        Passenger_inputset_container.innerHTML += inner_inputset;
    }
}


function Passenger_inputset_load_inputs_single(val) {

    const inner_inputset = `
                    <h3 class="font-orbitron text-2xl font-bold mb-4 mt-8 border-b border-neon-blue/20 pb-2">Personal
                            Information (Passenger N°${val + 1})</h3>
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
                                <textarea id="requirements" name="requirements[]"
                                    placeholder="Any special requirements or notes..."
                                    class="w-full p-3 rounded-lg bg-space-blue border border-neon-blue/30 text-white focus:border-neon-blue focus:outline-none transition-colors min-h-[100px]"></textarea>
                            </div>
                        </div>
                `;
    Passenger_inputset_container.innerHTML += inner_inputset;
}

const Passenger_inputset_container = document.getElementById('Passenger_inputset_container');
const add_passenger_btn = document.getElementById('add_passenger_btn');
// const add_passenger_btn = document.getElementById('add_passenger_btn');

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
        let add_passenger_counter = 0;

    }
}

// function Add_multi_passenger() {

// }
let radio_option;

if (add_passenger_btn) {


    add_passenger_btn.addEventListener('click', () => {
        const allFirstNameInputs = document.querySelectorAll('input[name="firstName[]"]');
        // console.log(allFirstNameInputs.length);
        let add_passenger_counter = allFirstNameInputs.length;

        Passenger_inputset_load_inputs_single(add_passenger_counter);
        Calculat_price();
    });

}

const radio_container = document.getElementById('radio_container');

if (radio_container) {
    radio_container.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'radio') {
            // console.log('TEST');
            const radio_selected = e.target.value;
            radio_option = e.target.value;
            // console.log(radio_selected);
            Passenger_inputset(radio_selected);
            Calculat_price();
        }

    });

}

if (radio_container) {
    Passenger_inputset_load_inputs_single(0);
}

const accommodationContainer = document.getElementById('Accommodation_container_id');

if (accommodationContainer) {
    accommodationContainer.addEventListener('click', (e) => { 
        const arr_lables = document.querySelectorAll('.Accommodation_card_iteam');
        arr_lables.forEach(lable => {
            // console.log(lable);
            lable.classList.remove('active-card');
        });
        if (e.target.name == 'accommodation' && e.target.type == 'radio') {
            let selected_acc = e.target.closest('label');
            selected_acc.classList.add('active-card');
            console.log(selected_acc);
        }        
        Calculat_price();
    });
}

function findDataById(data_arr, selected_id) {
    return data_arr.find(item => item.id === selected_id);
}

function Calculat_price() {
    let Total_price = 0;

    const destination_select_input = document.getElementById('destination');
    // const radio_container = document.getElementById('radio_container');
    const totalpriceInput = document.getElementById('total-price');

    const selectedDestId = destination_select_input.value;

    // const travelDuration = destinations_data.filter(des => des.id == selectedDestId);
    // console.log(travelDuration.forEach(tr => {console.log(tr.travelDuration)}));
    const checkedAccommInput = document.querySelector('input[name="accommodation"]:checked');
    const checkedPassengerInput = document.querySelector('input[name="passengers"]:checked');

    if (destination_select_input === 'default_option' || !checkedAccommInput || !checkedPassengerInput) {
        totalpriceInput.textContent = '$0.00';
        return;
    }

    const selectedAccommId = checkedAccommInput.value;
    const allFirstNameInputs = document.querySelectorAll('input[name="firstName[]"]');
    const actualPassengerCount = allFirstNameInputs.length;

    const destObject = findDataById(destinations_data, selectedDestId);
    const accommObject = findDataById(accommodation_data, selectedAccommId);

    const travelDuration = parseInt(document.getElementById('travelDuration').value);

    if (!destObject || !accommObject) {
        totalpriceInput.textContent = '$0.00 (Data Error)';
        return;
    }
    Total_price += destObject.price;

    // Total_price += accommObject.pricePerDay;

    let temp = accommObject.pricePerDay * actualPassengerCount * travelDuration * 2;

    Total_price += temp;

    totalpriceInput.textContent = `$${Total_price.toLocaleString()}.00`;
}



const confirm_booking_btn = document.getElementById('confirm-booking-btn');

if (confirm_booking_btn) {
    confirm_booking_btn.addEventListener('click', () => {

        const userlogin_string = localStorage.getItem('login');
        const user = JSON.parse(userlogin_string);

        if (user.islogin === false) {
            alert('Please login so you can book your destination.');
            window.location.href = "login.html";
        }
        // Get_all_inputset_data();
        let check = Valide_Form();

        if (check === false) {
            alert('plz make sure to fix the error above !!');
        }
        else{
            Add_new_booking();
            alert('Your booking is saved!');
        }
        // window.print();
    });
} 

const Name_msg_error = 'Please enter a valid name.';
const Email_msg_error = 'Please enter a valid Email.';
const Phone_msg_error = 'Please enter a valid phone number (10 digits).';
const message_msg_error = 'Please enter a Msg / min 10Le';

const first_name_spanId = 'first-name-errormsg';
const email_input_spanId = 'email-errormsg';
const last_name_spanId = 'last-name-errormsg';
const phone_input_spanId = 'phone-errormsg';
const Message_input_spanId = 'message-errormsg';



const NAME_REGEX = /^[A-Za-z]+(?:[\sA-Za-z])+$/;
const EMAIL_REGEX = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,3}$/; 
const PHONE_REGEX = /^\+212\d{8,9}$/; 
const REQ_REGEX = /^.{10,250}$/;


function Check_input_regex(inputElement, regex, msgerror, errorSpanId) {
    const value = inputElement.value.trim();
    let isValid = regex.test(value);

        if (value === '') {
        
        inputElement.classList.remove('border-red-500', 'border-green-500'); 
        
        return true; 
    }

    if (inputElement.required && value === '') {
        isValid = false;
        msgerror = 'This field is required.';
    }


    if (isValid) {

        inputElement.classList.remove('border-red-500'); 
        inputElement.classList.add('border-green-500');

    } else {

        inputElement.classList.remove('border-green-500'); 
        inputElement.classList.add('border-red-500');

    }
    return isValid;
}


if (Passenger_inputset_container) {
    Passenger_inputset_container.addEventListener('input', (e) => {
        
        const target = e.target;

        switch (target.name) {
            case 'firstName[]':
            case 'lastName[]':
                Check_input_regex(target, NAME_REGEX, Name_msg_error, first_name_spanId);
                break;
            case 'email[]':
                Check_input_regex(target, EMAIL_REGEX, Email_msg_error, email_input_spanId);
                break;
            case 'phone[]':
                Check_input_regex(target, PHONE_REGEX, Phone_msg_error, phone_input_spanId);
                break;
            case 'requirements[]':
                Check_input_regex(target, REQ_REGEX, message_msg_error, Message_input_spanId);
                break;
        }
         
    });
}


function Get_all_inputset_data() {

    let Array_First_name_Values = [];
    let Array_Last_name_Values = [];
    let Array_Email_Values = [];
    let Array_Phone_Values = [];
    let Array_Message_Values = [];

    const firstNameElements = document.querySelectorAll('input[name="firstName[]"]');
    const lastNameElements = document.querySelectorAll('input[name="lastName[]"]');
    const emailElements = document.querySelectorAll('input[name="email[]"]');
    const phoneElements = document.querySelectorAll('input[name="phone[]"]');
    // const messageElements = document.querySelectorAll('textarea[name="requirements[]"]');
    const messageElements = document.querySelectorAll('textarea[name="requirements[]"]');

    firstNameElements.forEach(F_name_val => {Array_First_name_Values.push(F_name_val.value)});
    lastNameElements.forEach(L_name_val => {Array_Last_name_Values.push(L_name_val.value)});
    emailElements.forEach(Email_val => {Array_Email_Values.push(Email_val.value)});
    phoneElements.forEach(Phone_val => {Array_Phone_Values.push(Phone_val.value)});
    messageElements.forEach(Message_val => {
        const trimmedValue = Message_val.value.trim();
        
            if (trimmedValue !== '') { 
                Array_Message_Values.push(trimmedValue);
            }
    });

    return {
        firstNames: Array_First_name_Values,
        lastNames: Array_Last_name_Values,
        emails: Array_Email_Values,
        phones: Array_Phone_Values,
        messages: Array_Message_Values
    };

}


function Valide_Form() {

    const formData = Get_all_inputset_data();

    // let Array_First_name_Values = [];
    // let Array_Last_name_Values = [];
    // let Array_Email_Values = [];
    // let Array_Phone_Values = [];
    // let Array_Message_Values = [];

    // const firstNameElements = document.querySelectorAll('input[name="firstName[]"]');
    // const lastNameElements = document.querySelectorAll('input[name="lastName[]"]');
    // const emailElements = document.querySelectorAll('input[name="email[]"]');
    // const phoneElements = document.querySelectorAll('input[name="phone[]"]');
    // // const messageElements = document.querySelectorAll('textarea[name="requirements[]"]');
    // const messageElements = document.querySelectorAll('textarea[name="requirements[]"]');

    // firstNameElements.forEach(F_name_val => {Array_First_name_Values.push(F_name_val.value)});
    // lastNameElements.forEach(L_name_val => {Array_Last_name_Values.push(L_name_val.value)});
    // emailElements.forEach(Email_val => {Array_Email_Values.push(Email_val.value)});
    // phoneElements.forEach(Phone_val => {Array_Phone_Values.push(Phone_val.value)});
    // messageElements.forEach(Message_val => {
    //     const trimmedValue = Message_val.value.trim();
        
    //         // Only push the message if the field is NOT empty
    //         if (trimmedValue !== '') { 
    //             Array_Message_Values.push(trimmedValue);
    //         }
    // });



    let Is_Form_valid = true ;

    formData.firstNames.forEach(val => {
        if (!NAME_REGEX.test(val) && val !== '') {
            Is_Form_valid = false;
            console.log('false');
        }
        if (val === '') {
            Is_Form_valid = false;
        }
    });

    formData.lastNames.forEach(val => {
        if (!NAME_REGEX.test(val) && val !== '') {
            Is_Form_valid = false;
            console.log('false');
        }
        if (val === '') {
            Is_Form_valid = false;
        }
    });

    formData.emails.forEach(val => {
        if (!EMAIL_REGEX.test(val) && val !== '') {
            Is_Form_valid = false;
            console.log('false');
        }
        if (val === '') {
            Is_Form_valid = false;
        }
    });

    formData.phones.forEach(val => {
        if (!PHONE_REGEX.test(val) && val !== '') {
            Is_Form_valid = false;
            console.log('false');
        }
        if (val === '') {
            Is_Form_valid = false;
        }
    });

    formData.messages.forEach(val => {
        if (!REQ_REGEX.test(val) && val !== '') {
            Is_Form_valid = false;
            console.log('false');
        }
        if (val === '') {
            Is_Form_valid = false;
        }
    });

    return Is_Form_valid;
}

function Add_new_booking() {
const ALL_BOOKINGS_KEY = 'ALL_BOOKING';
    const formData = Get_all_inputset_data();
    const destinationSelect = document.getElementById('destination');
    const travelDateInput = document.getElementById('travel-date');
    const totalpriceInput = document.getElementById('total-price');

    const structuredPassengers = [];
    const passengerCount = formData.firstNames.length;
    
    for (let i = 0; i < passengerCount; i++) {
        structuredPassengers.push({
            id: i + 1,
            firstName: formData.firstNames[i],
            lastName: formData.lastNames[i],
            email: formData.emails[i],
            phone: formData.phones[i],
            requirements: formData.messages[i] || null
        });
    }

    const bookingID = Date.now().toString() + Math.floor(Math.random() * 1000); 

    const newBooking = {
        id: bookingID,
        userId: JSON.parse(localStorage.getItem(SESSION_KEY)).user,
        destinationId: destinationSelect.value,
        travelDate: travelDateInput.value,
        passengers: structuredPassengers,
        finalPrice: totalpriceInput.textContent,
        dateBooked: new Date().toISOString()
    };

    const existingBookingsString = localStorage.getItem(ALL_BOOKINGS_KEY);
    const existingBookings = existingBookingsString ? JSON.parse(existingBookingsString) : [];

    existingBookings.push(newBooking);
    localStorage.setItem('ALL_BOOKING', JSON.stringify(existingBookings));

    My_Booking.push(newBooking); 
    
    console.log(My_Booking);
}


function getAllBookings() {
    const bookingsString = localStorage.getItem('ALL_BOOKING');

    return bookingsString ? JSON.parse(bookingsString) : [];
}

function generatePassengerDetailsHtml(booking) {
    let passengerHtml = '';
    
    booking.passengers.forEach((p, index) => {

        passengerHtml += `
            <div class="space-y-1 ${index > 0 ? 'mt-4 pt-4 border-t border-space-blue' : ''}">
                <p class="font-orbitron text-md text-neon-blue">Passenger N°${p.id}: ${p.firstName} ${p.lastName}</p>
                <div class="grid grid-cols-2 text-gray-400 text-sm">
                    <span>Email: <span class="text-white">${p.email}</span></span>
                    <span>Phone: <span class="text-white">${p.phone}</span></span>
                </div>
                ${p.requirements ? `<p class="text-sm italic text-gray-500 mt-2">Special Note: ${p.requirements}</p>` : ''}
            </div>
        `;
    });
    return passengerHtml;
}


function renderMyBookings() {
    const listContainer = document.getElementById('bookings-list-container');
    const bookings = getAllBookings();
    

    
    let bookingHtml = '';
    
    bookings.forEach(booking => {
        // let count = index + 1;
        
        const passengerCount = booking.passengers.length;
        

        const detailedPassengerHtml = generatePassengerDetailsHtml(booking);
        
        bookingHtml += `
            <div class="booking-card p-4 space-y-3">
                

                <div class="grid grid-cols-6 md:grid-cols-8 gap-4 items-center">

                    <div class="col-span-3 md:col-span-2">
                        <p class="text-neon-cyan font-orbitron text-lg">Booking ID: ${booking.id.substring(0, 8)}</p>
                        
                    </div>

                    <div class="col-span-1 md:col-span-2 text-center">
                        <p class="text-gray-300 font-semibold">${booking.travelDate}</p>
                        <p class="text-gray-500 text-xs">${passengerCount} Travelers</p>
                    </div>

                    <div class="col-span-2 md:col-span-2 text-right">
                        <p class="font-bold text-xl text-neon-blue">${booking.finalPrice}</p>
                    </div>
                    
                    <div class="actions-cell col-span-6 md:col-span-2 flex justify-end space-x-2">
                        <button class="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded text-xs hover:bg-neon-blue/30" onclick="toggleDetails('${booking.id}')">
                            <i class="fas fa-eye mr-1"></i> Details
                        </button>
                        <button class="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded text-xs hover:bg-neon-purple/30" onclick="editBooking('${booking.id}')">Edit</button>
                        <button class="bg-red-600/20 text-red-400 px-3 py-1 rounded text-xs hover:bg-red-600/30" onclick="cancelBooking('${booking.id}')">Cancel</button>
                    </div>
                </div>
                
                <div id="details-${booking.id}" class="hidden p-4 border border-neon-cyan/10 rounded-lg">
                    <h4 class="font-orbitron text-lg mb-3 border-b border-neon-cyan/20 pb-2 text-neon-cyan">Passenger Manifest</h4>
                    ${detailedPassengerHtml}
                    <button class="mt-4 bg-neon-blue/20 text-neon-blue px-3 py-1 rounded text-xs hover:bg-neon-blue/30" onclick="viewTicket('${booking.id}')">View Printable Ticket</button>
                </div>

            </div>
        `;
    });
    
    listContainer.innerHTML = bookingHtml;
}


function toggleDetails(bookingId) {
    const detailElement = document.getElementById(`details-${bookingId}`);
    if (detailElement) {
        detailElement.classList.toggle('hidden');
    }
}

const booking_card = document.querySelector('.booking-card');

if (booking_card) {
    renderMyBookings();
}

