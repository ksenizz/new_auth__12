import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = 
{
    apiKey: "AIzaSyB8FCWid4iHnbKhN1miF2ttXn_rIJQhw1M",
    authDomain: "login-form-3359d.firebaseapp.com",
    projectId: "login-form-3359d",
    storageBucket: "login-form-3359d.appspot.com",
    messagingSenderId: "1026850914814",
    appId: "1:1026850914814:web:7464a525c0fb6dc3fcc0af"
};
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);
  const db=getFirestore(app);

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('userName').value = userData.name;
                document.getElementById('userEmail').value = userData.email;
                document.getElementById('userPassword').value = userData.password;
            }
            else{
                console.log("Не найден документ, соответствующий идентификатору")
            }
        })
        .catch((error)=>{
            console.log("Ошибка при получении документа");
        })
    }
    else{
        console.log("Идентификатор пользователя не найден в локальном хранилище")
    }
  })

  