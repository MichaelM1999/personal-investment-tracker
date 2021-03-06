// import axios from 'axios';
const uri = "http://localhost:4202"
function submitBtn (buttonId) {
    let goalNum = buttonId.slice(buttonId.length -1)
    let funcId = {
        origianl: buttonId,
        input: "goalInp" + goalNum,
        Quan: "goalQuan" + goalNum,
        units: "units" + goalNum,
        Goal: "GoalName" + goalNum,
        chartName: "myChart" + goalNum,
        form: "form" + goalNum,
        current: 'current' + goalNum,
    }
    let Goals = {
        name: document.getElementById(funcId.input).value,
        Quantity: document.getElementById(funcId.Quan).value,
        units: document.getElementById(funcId.units).value,
        current: document.getElementById(funcId.current).value,
        user: sessionStorage.getItem("username")
    }
    if (Goals.name === '' || Goals.Quantity === '' || Goals.units === '' || Goals.units === '' || Goals.current === ''){
        window.alert("Must fill in Goal completly to graph");
    } else {
        changeHTML(funcId);
        LoadChart(funcId, Goals);
        goalPost(funcId);
        console.log(funcId);
    }

}
function changeHTML (funcId) {
    let GoalName = document.getElementById(funcId.input).value;
    document.getElementById(funcId.Goal).textContent = GoalName;
    document.getElementById(funcId.chartName).style.display = 'block';
    document.getElementById(funcId.form).style.display = 'none';
}
function LoadChart (funcId, Goals) {
    var ctx = document.getElementById(funcId.chartName).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
            data: {
                labels: [Goals.units],
                datasets: [{
                    label: "Current Value",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [Goals.current]
                    },{
                    label: "Goal",
                    backgroundColor: "rgb(135,206,235)",
                    borderColor: "rgb(135,206,235)",
                    data: [(Goals.Quantity)-(Goals.current)]
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    tooltips: {enabled: false},
                    hover: {mode: null},
                }
                });
}
function logInPage () {
        const logBtn = document.getElementById('logBtn')
        document.getElementById("LoginPage").style.display = 'block';
        document.getElementById('AccountBtn').style.display = 'none';
        document.getElementById('CreateAccountPage').style.display = 'none';
        logBtn.style.display = 'none';
        logBtn.innerHTML = 'Log-Out';
        console.log(logBtn.innerHTML)
}
function loginForm() {
    let username = document.getElementById("username").value;
    let Password = document.getElementById("Password").value;
    
    if (username === "" || Password === ""){
        alert("Must enter a valid username and password")
    } else {
        let userInfo = {
            username: username,
            password: Password
        }
        sessionStorage.setItem("Username", username);
        sessionStorage.setItem("Password", Password);
        document.getElementById("LoginPage").style.display = 'none';
        document.getElementById("MainPage").style.display = 'block';
        document.getElementById("WelcomeTxt").style.display = 'block';
        document.getElementById("WelcomeTxt").innerHTML = "Welcome " + username;
        document.getElementById("viewProfile").style.display = 'inline';
        userLoginInfo(userInfo);
    }
}
function AccountPage() {
    const accountBtn = document.getElementById('AccountBtn');
    document.getElementById('CreateAccountPage').style.display = 'block';
    document.getElementById('logBtn').style.display = 'none';
    accountBtn.style.display = 'none';
    document.getElementById('LoginPage').style.display = 'none';
}
function AccountForm() {
    //if account exists dont login
    let username = document.getElementById("usernameA").value;
    let password = document.getElementById("PasswordA").value;
    let confirmP = document.getElementById("Confirm").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;

    if (username === ""){
        alert("Must have valid username.");
    }
    if (password === ""){
        alert("Must have valid password.");
    }
    if (confirmP === ""){
        alert("Must confirm password.");
    }
    if (firstName === ""){
        alert("Must have valid first name.");
    }
    if (lastName === ""){
        alert("Must have valid last name.");
    }
    if (password !== confirmP){
        alert("passwords must match.");
    }
    if (password.length < 6 || password.includes("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9") === false){
        alert("Password must have more the 6 charaters and contain a number.")
    }
    else {
        let userAccount = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
        }
        userCreate(userAccount);
    }
}
function logoutB() {
    sessionStorage.clear();
    document.getElementById('MainPage').style.display = 'none';
    document.getElementById("LoginPage").style.display = 'block';
    document.getElementById("WelcomeTxt").innerHTML = "";
    document.getElementById("WelcomeTxt").style.display = 'none';
    document.getElementById("viewProfile").style.display = 'none';
}
function viewProfile() {
    let user = sessionStorage.getItem("Username");
    document.getElementById("WelcomeTxt").style.display = 'none';
    document.getElementById("WelcomeTxt").innerHTML = "";
    document.getElementById("viewProfile").style.display = 'none';
    document.getElementById('MainPage').style.display = 'none';
    document.getElementById("userInfoPage").style.display = 'block';
    document.getElementById("userTitle").innerHTML = user
}
function updateUserInfo() {
    document.getElementById("NoImage").style.display = 'none';
    document.getElementById("NOBIO").style.display = 'none';
    document.getElementById('BIO').style.display = 'none';
    document.getElementById('IMAGE').style.display = 'none';
    document.getElementById("userUpdateForm").style.display = 'block';
    document.getElementById('updateUserInfo').style.display = 'none';

}
function SubmitUpdates() {
    let username = sessionStorage.getItem('Username');
    let password = sessionStorage.getItem('Password');
    document.getElementById('BIO').style.display = 'none';
    document.getElementById('IMAGE').style.display = 'none';
    let bio = document.getElementById('userBioUpdate').value;
    let url = document.getElementById('userPicUrl').value;
    let user = {
        username: username,
        password: password,
        bio: bio,
        url: url
    }
    console.log(user);
    UserUpdateData(user);
}
//backend functions
//create user needs wiring
function userCreate (userInfo) {
    //check if user exists if it does throw error and stay at acount screen
    axios.post(uri + '/user/create', userInfo)
    .then(res => {
        console.log(res);
        document.getElementById('CreateAccountPage').style.display = 'none';
        document.getElementById('MainPage').style.display = 'block';
        sessionStorage.setItem("Username", userInfo.username);
        sessionStorage.setItem("Password", userInfo.password);
        document.getElementById("WelcomeTxt").style.display = 'block';
        document.getElementById("WelcomeTxt").innerHTML = "Welcome " + userInfo.username;
        document.getElementById("viewProfile").style.display = 'inline';

    })
    .catch(error => console.error(error.response));
}
//userlogin working needs database wiring
function userLoginInfo (userInfo) {
    axios.post(uri + '/user/login', userInfo)
    .then(res => {
        console.log(res);
    })
    .catch(error => console.error(error.response));
}
//user add goal 
function goalPost (goal) {
    axios.post(uri + '/goal/add', goal)
    .then(res => {
        console.log(res);
    })
    .catch(error => console.error(error.response));
}
//update user bio and image
function UserUpdateData (user) {
    axios.post(uri + '/user/update', user)
    .then(res => {
        //if only one is returned make sure the old one stays
        console.log(res);
        document.getElementById('BIO').style.display = 'block';
        document.getElementById("BIO").innerHTML = user.bio;
        document.getElementById('IMAGE').style.display = 'block';
        document.getElementById('IMAGE').src = user.url;
        document.getElementById('userUpdateForm').style.display = 'none';
        document.getElementById('updateUserInfo').style.display = 'block';
    })
    .catch(error => console.error(error.response));
}
//test function
function fool () {
    axios.post(uri + '/foo')
    .then(res => {
        console.log(res);
    })
    .catch(error => console.error(error.response));
}