import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
  getDoc,
  Firestore,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";
import { auth, firebaseApp } from "./firebaseConfig";
import { Research } from "../screens/HomeScreen";
import { IconName } from "../const/AvailableIcons";
import { sendPasswordResetEmail } from "firebase/auth";

export class FirestoreService {
  db: Firestore;
  researchCollection: CollectionReference;

  constructor() {
    this.db = getFirestore(firebaseApp);
    this.researchCollection = collection(this.db, "researches");
  }

  async save(data: Omit<Research, "id">): Promise<string> {
    try {
      const docRef = await addDoc(this.researchCollection, data);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao salvar pesquisa:", error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Research>): Promise<void> {
    try {
      const researchDoc = doc(this.db, "researches", id);
      await updateDoc(researchDoc, data);
    } catch (error) {
      console.error("Erro ao atualizar pesquisa:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const researchDoc = doc(this.db, "researches", id);
      await deleteDoc(researchDoc);
    } catch (error) {
      console.error("Erro ao deletar pesquisa:", error);
      throw error;
    }
  }

  async addVote(id: string, vote: string): Promise<void> {
    try {
      const researchDoc = doc(this.db, "researches", id);
      await updateDoc(researchDoc, { votes: arrayUnion(vote) });
    } catch (error) {
      console.error("Erro ao adicionar voto:", error);
      throw error;
    }
  }

  async search(userId: string): Promise<Research[]> {
    try {
      const researches: Research[] = [];
      const querySnapshot = await getDocs(
        query(this.researchCollection, where("userId", "==", userId))
      );

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        researches.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          image: data.image,
          description: data.description,
          votes: data.votes || [],
          userId: data.userId,
        });
      });
      return researches;
    } catch (error) {
      console.error("Erro ao buscar pesquisas:", error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Erro ao enviar email de recuperação de senha:", error);
      throw error;
    }
  }
}
