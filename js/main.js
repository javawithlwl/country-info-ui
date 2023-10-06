const idCountryInfoContent = document.getElementById('idCountryInfoContent');

idCountryInfoContent.innerHTML = `Country Information will be displayed here`;

const baseUrl = "https://country-info-kl1q.onrender.com/api/country";

const idCountryName = document.getElementById('idCountryName');



idCountryName.addEventListener('change', (event)=>{
    let countryName = event.target.value;
    if(countryName !== ""){
        fetch(`${baseUrl}/search?str=${countryName}`)
            .then(response => response.json())
            .then(data => {
                displayCountryInfo(data);
            });
    }
    
});
const idRegion = document.getElementById('idRegion');
idRegion.addEventListener('change', (event)=>{
    let regionName = event.target.value;
    if(regionName !== ""){
        fetch(`${baseUrl}/regionstats/${regionName}`)
            .then(response => response.json())
            .then(data => {
                showRegionStats(data);
            });
    }
});
function showRegionStats(regionStats){

    if(regionStats.length === 0){
        idCountryInfoContent.innerHTML = `<h3>No country information is found</h3>`;
        return;
    }
    let output = "";
    output += `<table border="1" class='table table-striped mt-2'>`
    output += `
        <tr>
            <th>Region Name</th>
            <th>Total Population</th>
            <th>Total Area</th>
            <th>Max Population</th>
            <th>Min Population</th>
        </tr>
    `;
    regionStats.forEach(region=>{
        output += `
            <tr>
                <td>${region.regionName}</td>
                <td>${region.totalPopulation}</td>
                <td>${region.totalArea}</td>
                <td>${region.maxPopulation}</td>
                <td>${region.minPopulation}</td>
            </tr>
        `;
    });
    output += `</table>`;
    document.getElementById("idRegionStats").innerHTML = output;
}
function showTop5PopulatedCountries(){
    fetch(`${baseUrl}/top5populated`)
        .then(response => response.json())
        .then(data => {
            displayCountryBasicInfo(data);
        });

}

function showCountryInfo(){
        console.log("showCountryInfo() called");
        fetch(`${baseUrl}/info`)
            .then(response => response.json())
            .then(data => {
                displayCountryInfo(data);
            });
}

function displayCountryBasicInfo(countryInfo){
    if(countryInfo.length === 0){
        idCountryInfoContent.innerHTML = `<h3>No country information is found</h3>`;
        return;
    }
    let output = "";
    output += `<table border="1" class='table table-striped'>`
    output += `
        <tr>
            <th>Country Name</th>
            <th>Region</th>
            <th>Population</th>
            <th>Area</th>
         </tr>
    `;
    countryInfo.forEach(country=>{
        output += `
            <tr>
                <td>${country.countryName}</td>
                <td>${country.region}</td>
                <td>${country.population}</td>
                <td>${country.area}</td>
            </tr>
        `;
    });
    output += `</table>`;
    document.getElementById("idTopPopulatedCountries").innerHTML = output;

}
function displayCountryInfo(countryInfo){
    if(countryInfo.length === 0){
        idCountryInfoContent.innerHTML = `<h3>No country information is found</h3>`;
        return;
    }
    let output = "";
    output += `<table border="1" class='table table-striped'>`
    output += `
        <tr>
            <th>Country Name</th>
            <th>Region</th>
            <th>Population</th>
            <th>Area</th>
            <th>Flag</th>
        </tr>
    `;
    countryInfo.forEach(country=>{
        output += `
            <tr>
                <td>${country.countryName}</td>
                <td>${country.region}</td>
                <td>${country.population}</td>
                <td>${country.area}</td>
                <td><img src="${country.flagSvg}" alt="" id="idCountryInfoFlag" style="width: 80px; height: 50px;"></td>
            </tr>
        `;
    });
    output += `</table>`;
    idCountryInfoContent.innerHTML = output;

}

google.charts.load('current', {'packages':['corechart']});

function getRegionStats(){
    fetch(`${baseUrl}/regionstats`)
        .then(response => response.json())
        .then(data => {
           console.log(data);
           chartData = [];
           data.forEach(region=>{
               console.log(region);
               chartData.push([region.regionName, region.totalPopulation]);
           });
           console.log(chartData);
           drawChart(chartData);
        });

}

function drawChart(inputData) {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Region');
    data.addColumn('number', 'Total Population');
    data.addRows(inputData);
    // Set chart options
    var options = {'title':'Region wise population',
                   'width':600,
                   'height':400};
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('idRegionPopulation'));
    chart.draw(data, options);
}
showCountryInfo();
showTop5PopulatedCountries();
getRegionStats();

