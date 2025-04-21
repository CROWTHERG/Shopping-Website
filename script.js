// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEbBawoQYfwP05C0Sbb55JKdKRztXJHG0",
    authDomain: "e-commerce-61c1e.firebaseapp.com",
    projectId: "e-commerce-61c1e",
    storageBucket: "e-commerce-61c1e.firebasestorage.app",
    messagingSenderId: "79007529273",
    appId: "1:79007529273:web:93a98a16617921bb4690e8",
    measurementId: "G-CNXMFYWCNR"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  
  // Handle user login
  document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Check if email is verified
        if (user.emailVerified) {
          alert('Login successful!');
          // Redirect to home page or dashboard
          window.location.href = 'index.html'; // Redirect to homepage
        } else {
          alert('Please verify your email first.');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
  });
  




  // Handle user sign-up
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Store user role in Firebase Database
        db.ref('users/' + user.uid).set({
          email: user.email,
          role: role,
        });
  
        // Send email verification
        user.sendEmailVerification()
          .then(() => {
            alert('Please check your email for verification!');
          });
  
        alert('Sign-up successful!');
        window.location.href = 'login.html'; // Redirect to login page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
  });
  