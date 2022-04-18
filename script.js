//The regular expressions to match to the input from the form
const nameReg = /([a-zA-Z]+\s*)+/;
const emailReg = /(\w+@)(\w+)([-\.]\w+)?\.(org|net|com)/;
const phoneReg = /(\+\d+\s+)?(\(?\d{3}\)?)[\s\.-]?(\d{3})[\s\.-]?(\d{4})/;
const addressReg = /(\w[\s,]*)+/;
const stateReg = /([A-Za-z]+\s*)+/;
const zipReg = /\d{5}/;
const specialCatch = [/[\+\*\?\^\$\\\[\]\{\}\(\)\|\/#%!&<>`~_=;:'"@]+/g, /[\*\?\^\$\\\[\]\{\}\|\/#%!&<>`~_=;:'"@,]+/, /[\+\*\?\^\$\\\[\]\{\}\(\)\|\/#%!&<>`~_=;:'"@0-9]+/g];


const err = {
    name: true,
    email: true,
    phone: true,
    address: true,
    state: true,
    zip: true
};

//Checks the form as you fill it out and lets the user know if it's an invalid input
function checkInput(type, element, errEl) {
    var spaceNode = element.nextSibling;
    if (errEl === 'email') {
        if (element.value.match(type)) {
            spaceNode.nextSibling.style.opacity = 0;
            err[errEl] = false;
        } else {
            spaceNode.nextSibling.style.opacity = 1;
            err[errEl] = true;
        }
    } else if (errEl === 'phone') {
        if (element.value.match(specialCatch[1])) {
            spaceNode.nextSibling.style.opacity = 1;
            err[errEl] = true
        } else {
            if (element.value.match(type)) {
                spaceNode.nextSibling.style.opacity = 0;
                err[errEl] = false;
            } else {
                spaceNode.nextSibling.style.opacity = 1;
                err[errEl] = true;
            }
        }
    } else if (errEl === 'name' || errEl === 'state') {
        if (element.value.match(specialCatch[2])) {
            spaceNode.nextSibling.style.opacity = 1;
            err[errEl] = true;
        } else {
            if (element.value.match(type)) {
                spaceNode.nextSibling.style.opacity = 0;
                err[errEl] = false;
            } else {
                spaceNode.nextSibling.style.opacity = 1;
                err[errEl] = true;
            }
        }
    } else {
        if (element.value.match(specialCatch[0])) {
            spaceNode.nextSibling.style.opacity = 1;
            err[errEl] = true;
        } else {
            if (element.value.match(type)) {
                spaceNode.nextSibling.style.opacity = 0;
                err[errEl] = false;
            } else {
                spaceNode.nextSibling.style.opacity = 1;
                err[errEl] = true;
            }
        }
    }
}

//Checks to see if any errors were in the form
function errorCheck() {
    if (err.name === false && err.email === false && err.phone === false && err.address === false && err.state === false && err.zip === false) {
        saveFile();
    } else {
        document.getElementById('formSubmitMsg').style.opacity = 1;
        setTimeout(function () {document.getElementById('formSubmitMsg').style.opacity = 0}, 5000);
    }
}

//Download form data
function saveFile() {
    	
    // Get the data from each element on the form.
    const name = document.getElementById('exampleInputFName1');
    const email = document.getElementById('exampleInputEmail1');
    const cell = document.getElementById('exampleInputPhone1');
    const address = document.getElementById('exampleInputStreet1');
    const state = document.getElementById('exampleInputState1');
    const zip = document.getElementById('exampleInputZipCode1');
    
    // This variable stores all the data.
    let data = 
        '\r Name: ' + name.value + ' \r\n ' + 
        'Email: ' + email.value + ' \r\n ' + 
        'Phone: ' + cell.value + ' \r\n ' + 
        'Address: ' + address.value + ' \r\n ' + 
        'State: ' + state.value + '\r\n ' + 
        'Zip Code: ' + zip.value;
    
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}

//All the event listeners for each input of the form
document.getElementById('request').addEventListener('click', errorCheck);

document.getElementById('exampleInputFName1').addEventListener('blur', function () {checkInput(nameReg, document.getElementById('exampleInputFName1'), 'name')});

document.getElementById('exampleInputEmail1').addEventListener('blur', function () {checkInput(emailReg, document.getElementById('exampleInputEmail1'), 'email')});

document.getElementById('exampleInputPhone1').addEventListener('blur', function () {checkInput(phoneReg, document.getElementById('exampleInputPhone1'), 'phone')});

document.getElementById('exampleInputStreet1').addEventListener('blur', function () {checkInput(addressReg, document.getElementById('exampleInputStreet1'), 'address')});

document.getElementById('exampleInputState1').addEventListener('blur', function () {checkInput(stateReg, document.getElementById('exampleInputState1'), 'state')});

document.getElementById('exampleInputZipCode1').addEventListener('blur', function () {checkInput(zipReg, document.getElementById('exampleInputZipCode1'), 'zip')});