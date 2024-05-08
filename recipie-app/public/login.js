import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";





// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsyWvD988CbK4VvsZvwKmZefCefB1VAx0",
    authDomain: "recipe-dash.firebaseapp.com",
    projectId: "recipe-dash",
    storageBucket: "recipe-dash.appspot.com",
    messagingSenderId: "828821873451",
    appId: "1:828821873451:web:7f17bdd8c5670a1ba21b6e"
  };
  // Initialize Firebase
 
const app = firebase.initializeApp(firebaseConfig);

  
  // code for Firebase 
  const auth = firebase(auth);
  const database = firebase(database); 
  
  // set up Sign-up Function 
  function signup() {
    // Get all input fields 
    email = document.getElementById('Email').value;
    password = document.getElementById('Password').value;
    username = document.getElementById('Username').value;
  
    // Validiate input fields  
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Wrong ');
      return;
    }
    if (validate_field(full_name) == false) {
      return;
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        var user = auth.currentUser;
        // add this user to Firebase 
        var database_ref = database.ref();
  
        // Create User data
        var user_data = {
          email: email,
          full_name: full_name,
          last_login: Date.now()
        };
  
        database_ref.child('users/' + user.uid).set(user_data);
  
        alert('User Created');
      })
      .catch(function (error) {
        var error_code = error.code;
        var error_message = error.message;
  
        alert(error_message);
      });
  }
  
  // Validation For Email address
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
      // Email is good
      return true;
    } else {
      // Email is not Good
      return false;
    }
  }
  
  // Validation for Password
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false;
    } else {
      return true;
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false;
    }
  
    if (field.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
  