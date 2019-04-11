console.log('Client side js');

// fetch api not part of js, it is browser based api, we can use in all modern browser but not accessible in nodejs

document.querySelector('#myForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const address = document.querySelector('#address').value;

    if (address === '') {
        console.log('Address is required');
        return;
    }

    // wala akong ininstall na package dito sa fetch at gumagamit sya ng middle function para makuha yung mismong data. yung json() method at then()
    fetch(`/weather?address=${address}`).then((res) => {
        if (res.status === 200) {
            res.json().then((data) => {
                console.log(data);
                document.querySelector('#resultsList').insertAdjacentHTML('beforeend', `
                    <li>
                        Report: ${data.report}<br>
                        Temprature in ${address} is ${data.temperature} but it feels like ${data.apparentTemperature}
                    </li>      
                `);
            });
        } else {
            console.log(res.statusText);
        }
    });
});