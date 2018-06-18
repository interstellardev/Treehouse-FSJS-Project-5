// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url).then(res => res.json());
}

fetchData('https://randomuser.me/api/?results=12').then(data => console.log(data));