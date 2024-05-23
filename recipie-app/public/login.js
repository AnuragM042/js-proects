import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsyWvD988CbK4VvsZvwKmZefCefB1VAx0",
  authDomain: "recipe-dash.firebaseapp.com",
  databaseURL: "https://recipe-dash-default-rtdb.firebaseio.com/",
  projectId: "recipe-dash",
  storageBucket: "recipe-dash.appspot.com",
  messagingSenderId: "828821873451",
  appId: "1:828821873451:web:7f17bdd8c5670a1ba21b6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Set up Sign-up Function
function signup(event) {
  event.preventDefault(); // Prevent form submission if used within a form
  // Get all input fields
  const email = document.querySelector('.Email').value;
  const password = document.querySelector('.Password').value;
  const username = document.getElementById('Username').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is Wrong');
    return;
  }

  if (!validate_field(username)) {
    alert('Username is required');
    return;
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User created: ', user);

      // Create User data
      const user_data = {
        email: email,
        full_name: username,
        last_login: Date.now()
      };

      // Push to Firebase Database
      set(ref(database, 'users/' + user.uid), user_data)
        .then(() => {
          alert('User Created!!');
        })
        .catch((error) => {
          console.error('Failed to create user data:', error);
          alert('Failed to create user data: ' + error.message);
        });
    })
    .catch((error) => {
      console.error('Failed to create user:', error);
      alert(error.message);
    });
}

// Set up login function
function login(event) {
  event.preventDefault(); // Prevent form submission if used within a form
  // Get all input fields
  const email = document.querySelector('.Email').value;
  const password = document.querySelector('.Password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is WRONG!!');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Create User data
      const user_data = {
        last_login: Date.now()
      };

      // Update Firebase Database
      update(ref(database, 'users/' + user.uid), user_data)
        .then(() => {
          alert('User Logged In!!');
        })
        .catch((error) => {
          console.error('Failed to update user data:', error);
          alert('Failed to update user data: ' + error.message);
        });
    })
    .catch((error) => {
      console.error('Failed to sign in:', error);
      alert(error.message);
    });
}

// Validate Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  return password.length >= 6;
}

function validate_field(field) {
  return field != null && field.length > 0;
}

//  Firebase code ends here 









// Animation code for login Page
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", () => {
  container.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click", () => {
  container.classList.remove("sign-up-mode2");
});








 // Default Value to login 
 const loginForm = document.querySelector('.sign-in-form');
 const signupForm = document.querySelector('.sign-up-form');
 const PreUsername = "Anurag Mishra";
 const PreEmail = "anuragmishra098@gmail.com";
 const PrePassword = "123456789";

 loginForm.addEventListener('submit', function(e) {
     e.preventDefault();
     const email = loginForm.querySelector('.Email').value;
     const password = loginForm.querySelector('.Password').value;

     if (email === PreEmail && password === PrePassword) {
         alert('Login successful!');
         window.location.href = 'Recipie.html';   // file location 
     } else {
         alert('Invalid email or password.');
     }
 });

 signupForm.addEventListener('submit', function(e) {
     e.preventDefault();
     const email = signupForm.querySelector('.Email').value;
     const password = signupForm.querySelector('.Password').value;
     const username = signupForm.querySelector('#Username').value;

     if (email === PreEmail && password === PrePassword && username === PreUsername) {
         alert('Signup successful!');
         window.location.href = 'Recipie.html';   // file location 
     } else {
         alert('Invalid signup details.');
     }
 });

