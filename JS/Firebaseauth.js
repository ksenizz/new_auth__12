import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB8FCWid4iHnbKhN1miF2ttXn_rIJQhw1M",
    authDomain: "login-form-3359d.firebaseapp.com",
    projectId: "login-form-3359d",
    storageBucket: "login-form-3359d.appspot.com",
    messagingSenderId: "1026850914814",
    appId: "1:1026850914814:web:7464a525c0fb6dc3fcc0af"
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById('addinfo');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('regMail').value;
    const password = document.getElementById('regPassword').value;
    const repeatRegPassword = document.getElementById('repeatRegPassword').value;
    
    if (password !== repeatRegPassword) {
        showMessage('Пароли не совпадают', 'signUpMessage');
        return;
    }
    
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const useruid = userCredential.user;
            localStorage.setItem('loggedInUserId', useruid.uid);
            const user = userCredential.user;
            const userData = {
                name:name,
                email: email,
                password: password,
            };
            showMessage('Учетная запись успешно создана', 'signUpMessage');

            const db = getFirestore(app);
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'PersonalAccount.html';
                })
                .catch((error) => {
                    console.error("Ошибка документа", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Данный адрес электронной почты уже существует', 'signUpMessage');
            } else {
                showMessage('Не удалось создать пользователя', 'signUpMessage');
            }
        });
});

const signIn = document.getElementById('auth');
signIn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Вход в систему завершен успешно', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'PersonalAccount.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Неверный адрес электронной почты или пароль', 'signInMessage');
            } else {
                showMessage('Учетная запись не существует', 'signInMessage');
            }
        });
});

