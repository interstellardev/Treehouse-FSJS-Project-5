const grid = document.querySelector('.grid_wrapper');
const modal = document.querySelector('.modal');
const div = document.createElement('div');
const focusCard = document.querySelector('.focus_item');
const nav = document.querySelector('header');
let indexCurrent;
let cardCount;
let seed = 'e6f1eb12a70145eb';
//inserting search bar
nav.innerHTML += `<input type="text" placeholder="Search">`;
const searchBox = document.querySelector('input');
matchedList = [];


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
    const formattedDate = date.slice(0,10);
    return formattedDate;
}

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url).then(res => res.json());
}

// fetchData(`https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture`)
//     .then(data => {
//         console.log(data);
//     });

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
                    <h4>${employeeFirstName} ${employeeLastName}</h4>
                    <p>${element.email}</p>
                    <p>${emLocation}</p>
                </div>
            </div>`;
        });
        const gridItems = document.querySelectorAll('.grid_item');
        createEvent(gridItems);
        search(gridItems);
    })
}());

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

//function that creates an event listener for each item in a list
function createEvent(itemList) {
    for(let i = 0; i < itemList.length; i++) {
        matchedList.push(i);
        let employeeCard = itemList[i];
        employeeCard.addEventListener('click', (e) => {
            getThisEmployeeData(i);
            modal.style.display = '';
        })
        
    }
}

modal.addEventListener('click', (e) => {
    const event = e.target;
    if(event.id === 'close') {
        modal.style.display = 'none';
    }
    if(event.className === 'modal') {
        modal.style.display = 'none';
    }
    if(event.id === 'left') {
        getThisEmployeeData((indexCurrent - 1));
    }
    if(event.id === 'right') {
        getThisEmployeeData((indexCurrent + 1));
    }
})

function getThisEmployeeData(index) {
    indexCurrent = index;
    focusCard.innerHTML = '';
    fetchData(`https://randomuser.me/api/?seed=${seed}&results=12&noinfo`)
    .then(data => {
        const employees = data.results;
        const employeesImage = employees[index].picture.large;
        const employeesFirstName = capitalize(employees[index].name.first);
        const employeesLastName = capitalize(employees[index].name.last);
        const emsLocation = capitalize(employees[index].location.city);
        const employeesStreet = employees[index].location.street;
        const employeesState =  capitalize(employees[index].location.state);
        const employeesDOB = formatDate(`${employees[index].dob.date}`);
        focusCard.innerHTML += `
        <div class="focus_item">
            <img src="img/x-mark.svg" alt="x mark to close window" id="close" display = ''>
            <img src="img/left_arrow.svg" alt="left arrow" id="left">
            <img src="img/right_arrow.svg" alt="right arrow" id="right">
            <div class="image_container">
                <img src="${employeesImage}" class="employee_image">
            </div>
            <h4>${employeesFirstName} ${employeesLastName}</h4>
            <p>${employees[index].email}</p>
            <p>${emsLocation}</p>
            <div class="location_detail">
                <p>${employees[index].phone}</p>
                <p>${employeesStreet} ${emsLocation}, ${employeesState}</p>
                <p>Birthday: ${employeesDOB}</p>
            </div>
        </div>
        `;
        
        const leftArrow = document.getElementById('left');
        const rightArrow = document.getElementById('right');
        if(indexCurrent === 0) {
            leftArrow.style.display = 'none';
        }
        if(indexCurrent === 11) {
            rightArrow.style.display = 'none';
        }
        });
}

// ------------------------------------------
//  SEARCH FUNCTIONS
// ------------------------------------------

function search(list) {
    searchBox.addEventListener("keyup", (e) => searchBuild(list));
}




// this function gets value of the search input and then hides everything not matching search.
function searchBuild(list) {
    matchedList = [];
    let searchValue = searchBox.value.toLowerCase();
    //looping through the employee list to see if there are any matches to the search.
    for (let i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
        let employeeNames = list[i].querySelector('h4').innerHTML.toLowerCase();
        let employeeEmail = list[i].querySelector('p').innerHTML.toLowerCase();
        employeeEmail = employeeEmail.substring(0, employeeEmail.indexOf('@'));
        let doesContainName = employeeNames.search(searchValue);
        let doesContainEmail = employeeEmail.search(searchValue);
        if (doesContainName != -1 || doesContainEmail != -1) {
            matchedList.push(i);
            list[i].removeAttribute('style');
        } 
    }
    
    // checking to see if the matchedList array is empty meaning no mathces found.
    if (matchedList <= 0) {
        alert("no employees found");
    }
}


