var contentDiv = document.getElementById("contentdiv");
var content, nameData;


function checkName(){
    if(document.getElementById("getName").value.length<3){
        contentDiv.innerHTML = `
        <p class="alert alert-danger h3">That's an Invalid name BOSS!!</p>
        `
    }
    else{
        fetch(`https://api.nationalize.io/?name=${document.getElementById("getName").value}`)
            .then((res=>res.json()))
            .then((data=>{
                if(data.count == 0){
                    contentDiv.innerHTML = `
                        <p class="alert alert-success h3">That's an Invalid name or this name a <span class="text-capitalize en-iceberg text-secondary">RARE</span> name !!</p>
                    `
                }
                else{
                    nameData = data;
                    console.log(nameData)
                    displayContent();
                }
            }));
    }
}

function displayContent() {
    let content = `
    <p class="p-0 en-iceberg h1 text-light name">Name: <span class="innerName">${nameData.name}</span></p>
    <p class="p py-2 count">Number of ${nameData.name}'s worldwide: <span class="innerCount en-iceland h4">${nameData.count}</span></p>
    <p class="chanceHead">Chance to be named as ${nameData.name} - country wise: </p>
    <table class="table text-center">
        <thead>
            <tr class="text-secondary">
                <th class="">Country</th>
                <th class="">Chance to be named as ${nameData.name}</th>
            </tr>
        </thead>
        <tbody class="">`;

    // ... (previous code remains the same)

const fetchPromises = nameData.country.map(country => {
    return fetch(`https://restcountries.com/v3.1/alpha/${country.country_id}`)
        .then(res => res.json())
        .then(data => {
            const countryName = data[0].name.common || 'Country Not Found'; // Modify here to access the correct property for country name
            content += `<tr>
                <td class="text-secondary">${countryName}</td>
                <td class="text-secondary">${country.probability}</td>
            </tr>`;
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
        });
});
    Promise.all(fetchPromises)
        .then(() => {
            content += `</tbody></table>`;
            console.log(content);
            contentDiv.innerHTML = content;
        });

}
