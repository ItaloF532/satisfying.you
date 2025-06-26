import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";
import { Research } from "../screens/HomeScreen";
import { IconName } from "../const/AvailableIcons";

const db = getFirestore(firebaseApp);
const researchCollection = collection(db, "researches");

type ResearchData = {
  title: string;
  date: Date;
  icon: IconName;
};

export const FirestoreService = {
  save: async (data: ResearchData): Promise<string> => {
    try {
      const docRef = await addDoc(researchCollection, {
        ...data,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Erro ao salvar pesquisa:", error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<ResearchData>): Promise<void> => {
    try {
      const researchDoc = doc(db, "researches", id);
      await updateDoc(researchDoc, data);
    } catch (error) {
      console.error("Erro ao atualizar pesquisa:", error);
      throw error;
    }
  },

  search: async (): Promise<Research[]> => {
    try {
      const querySnapshot = await getDocs(researchCollection);
      const researches: Research[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        researches.push({
          id: doc.id,
          title: data.title,
          date: data.date.toDate().toLocaleDateString("pt-BR"),
          image: data.icon,
          description: data.description,
        });
      });
      return researches;
    } catch (error) {
      console.error("Erro ao buscar pesquisas:", error);
      throw error;
    }
  },
};
