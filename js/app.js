const grid = document.querySelector('.grid_wrapper');
const div = document.createElement('div');
let seed = '98a517cc24fba74d';

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url).then(res => res.json());
}

fetchData(`https://randomuser.me/api/?seed=${seed}&results=12&nat=us&inc=name,location,email,dob,phone,picture`)
    .then(data => {
        console.log(data);
    });

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

(function buildCards() {
    fetchData(`https://randomuser.me/api/?seed=${seed}&results=12&noinfo`)
    .then(data => {
        data.results.forEach(element => {
            const employeeImage = element.picture.large;
            const employeeFirstName = capitalize(element.name.first);
            const employeeLastName = capitalize(element.name.last); 
            const emLocation = capitalize(element.location.city);
            grid.innerHTML += `<div class="grid_item">
                <img src="${employeeImage}" class="employee_image">
                <div class="info_wrapper">
                    <h3>${employeeFirstName} ${employeeLastName}</h3>
                    <p>${element.email}</p>
                    <p>${emLocation}</p>
                </div>
            </div>`;
        });
    })
}());

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------


