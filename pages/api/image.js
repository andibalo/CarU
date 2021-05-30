import { storage } from "../../utils/db/index";

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    let storageRef = storage.ref();
    let uploadTask = storageRef
      .child("images/" + req.body.name)
      .put(req.body.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("SS", snapshot);
      },
      (error) => {
        throw new Error(error);
      },
      () => {
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log("DOWNLOAD", url);
        });
      }
    );
  }
}
