import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFile = async (file) => {
    const storageRef = ref(storage, file.name);
    // lưu file lên FIREBASE
    const respone = await uploadBytes(storageRef, file);
    // lấy đường dẫn đến file vừa được tạo
    const downloadURL = await getDownloadURL(respone.ref);
    return downloadURL
}
export default uploadFile;