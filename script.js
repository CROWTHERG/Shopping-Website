// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAEbBawoQYfwP05C0Sbb55JKdKRztXJHG0",
    authDomain: "e-commerce-61c1e.firebaseapp.com",
    projectId: "e-commerce-61c1e",
    storageBucket: "e-commerce-61c1e.appspot.com",
    messagingSenderId: "79007529273",
    appId: "1:79007529273:web:93a98a16617921bb4690e8",
    measurementId: "G-CNXMFYWCNR"
  };
  
  // Init Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  
  // Init EmailJS
  emailjs.init("X4nqjyIZYk99IJj45"); // Replace with your EmailJS public key
  
  let generatedCode = null;
  
  // Send verification code
  document.getElementById('get-code').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    if (!email) return alert("Enter your email first");
  
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  
    const templateParams = {
      to_email: email,
      code: generatedCode
    };
  
    emailjs.send("service_6zsvu1s", "template_2q12t7z", templateParams)
      .then(() => {
        alert(`Verification code sent to ${email}`);
      }, (error) => {
        alert("Error sending code: " + error.text);
      });
  });
  
  // Handle Sign Up
  document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const enteredCode = document.getElementById('code').value;
  
    if (enteredCode !== generatedCode) {
      alert("Incorrect verification code.");
      return;
    }
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
  
        db.ref('users/' + user.uid).set({
          email: user.email,
          role: role
        });
  
        alert("Sign-up successful!");
        window.location.href = "index.html"; // Redirect or load home page
      })
      .catch(error => {
        alert(error.message);
      });
  });
  
  // Handle Login
  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert("Login successful!");
        window.location.href = "index.html";
      })
      .catch(error => {
        alert(error.message);
      });
  });
  