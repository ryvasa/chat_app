// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { updateUser } from './api';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyANE0ZSywhX8x7sqhCD9FBUx4UEXzYOWfM',
  authDomain: 'chat-app-c2c4b.firebaseapp.com',
  projectId: 'chat-app-c2c4b',
  storageBucket: 'chat-app-c2c4b.appspot.com',
  messagingSenderId: '266142351604',
  appId: '1:266142351604:web:f75af72bcc95a64e989ea1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const updateUserWithImg = (id, file, inputs, callback) => {
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} + % done`);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      updateUser(id, { ...inputs, img: downloadURL }, callback);
    },
  );
};
export default updateUserWithImg;
