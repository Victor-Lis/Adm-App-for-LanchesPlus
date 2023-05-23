import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBoRVeP8zoNJo-BTQB2kuGt7mfWWNgyFzk",
    authDomain: "lanches-website.firebaseapp.com",
    databaseURL: "https://lanches-website-default-rtdb.firebaseio.com",
    projectId: "lanches-website",
    storageBucket: "lanches-website.appspot.com",
    messagingSenderId: "985383985789",
    appId: "1:985383985789:web:6713e954352c6fa44b4714",
    measurementId: "G-R58NM39WQE"
};

const app = initializeApp(firebaseConfig);

// Obtenção da instância do Realtime Database
const database = getDatabase(app);

async function login(email, password){

    const auth = getAuth();
    let newEmail = email.toLowerCase()
    newEmail = newEmail.replace(" ", "")

    const userCredential = await signInWithEmailAndPassword(auth, newEmail, password);

    // Obter o ID do usuário logado
    const userId = userCredential.user.uid;

    // Exemplo de acesso a dados no Realtime Database
    const userRef = ref(database, `usuarios/${userId}`);
    let userData;
  
    await get(userRef).then((snapshot) => {
  
      userData = snapshot.val()
      console.log(userData.cargo)

    })

    if(userData.cargo != "Cliente"){

        return true;

    }else{

        alert("Seu login não condiz com os dados necessários")
        return false;

    }

}

export { database, login, app };