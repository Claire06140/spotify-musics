/* 
import { firebaseConfig } from "../../../firebase.config.js";
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDocs, collection, query, limit } from "firebase/firestore"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app) */

export async function retrieveTenMusics(){
    /* try{
      const q = query(collection(db, "musics"), limit(3))
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
      const musicHash = querySnapshot.docs.reduce((acc, doc) => {
        acc[doc.id] = doc.data();
        return acc;
      }, {});
      
      console.log(musicHash);
      const musicsList = document.querySelector('#musics')
  
      for (const musicId in musicHash) {
        const music = musicHash[musicId]
  
        const myLi = document.createElement("li")
        musicsList.append(myLi)
  
        const myTitle = document.createElement("ul")
        myTitle.innerText = music.title
  
        const myArtist = document.createElement("ul")
        myArtist.innerText = music.artist
  
        myLi.append(myTitle, myArtist)
      }
     
    } catch(err){
      console.log("voici l'erreur dans query à firebase: ", err)
    } */
  }
  