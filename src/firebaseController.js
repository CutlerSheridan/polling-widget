import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  getDoc,
  collection,
  doc,
  updateDoc,
  increment,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYiFPJvAxFGKeKyudyU-n0oTpGSn2C4Q4',
  authDomain: 'polling-widget-f365b.firebaseapp.com',
  projectId: 'polling-widget-f365b',
  storageBucket: 'polling-widget-f365b.appspot.com',
  messagingSenderId: '716030042047',
  appId: '1:716030042047:web:b015648af470bf06940b0a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchQuestion = async (pollId) => {
  const snapshot = await getDoc(doc(db, 'polls', pollId));

  return snapshot.data().question;
};
const fetchAnswers = async (pollId) => {
  const snapshot = await getDocs(collection(db, 'polls', pollId, 'answers'));
  const answers = [];
  snapshot.forEach((doc) =>
    answers.push({
      id: doc.id,
      votes: doc.data().votes,
      name: doc.data().name,
    })
  );
  return answers;
};
const vote = (pollId, answerObj) => {
  try {
    const answerRef = doc(db, 'polls', pollId, 'answers', answerObj.id);
    updateDoc(answerRef, {
      votes: increment(1),
    });
  } catch (err) {
    console.log(err);
  }
};

export { fetchQuestion, fetchAnswers, vote, db };
