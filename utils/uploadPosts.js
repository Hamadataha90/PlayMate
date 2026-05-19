import { doc, setDoc, getFirestore, collection, getDocs, deleteDoc } from "firebase/firestore";
import app from "@/config/Firebase";
import postsData from "@/data/postsData";

const db = getFirestore(app);

const uploadPosts = async () => {
  try {
    // 1. Delete all existing posts to clean up broken images and old data
    const querySnapshot = await getDocs(collection(db, "posts"));
    const deletePromises = [];
    querySnapshot.forEach((document) => {
      deletePromises.push(deleteDoc(doc(db, "posts", document.id)));
    });
    await Promise.all(deletePromises);
    console.log("Old posts successfully cleared.");

    // 2. Upload the fresh posts
    for (const post of postsData) {
      await setDoc(
        doc(db, "posts", post.title),
        {
          ...post,
          createdAt: new Date(),
        }
      );
      console.log(`${post.title} uploaded`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default uploadPosts;