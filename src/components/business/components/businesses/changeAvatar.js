import React from 'react';
import { useState,forwardRef, useImperativeHandle} from 'react';
import { useEffect } from 'react';
import { isWebUri } from 'valid-url';
import { storage } from "../../../../firebase"
import { ref as reff , uploadBytesResumable, getDownloadURL } from "firebase/storage";


function ChangeAvatar(props,ref ) {
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    // clear function
    return (() => { avatar && URL.revokeObjectURL(avatar.preview) })

  }, [avatar])

  //send data to detailBusinesses
  function sendData(sendDataUrl) {
    props.parentCallback(sendDataUrl);
  }

  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    const file = event.target.files[0]
    file.preview = URL.createObjectURL(file)
    setAvatar(file)
    setFile(event.target.files[0]);
  }

 
  // handleUpload from detail Businesses
  useImperativeHandle(ref,
    () => ({
      handleUpload(){
        if (file) {
          const storageRef = reff(storage, `/files/${file.name}`);
    
          // progress can be paused and resumed. It also exposes progress updates.
          // Receives the storage reference and the file to upload.
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
      
              // update progress
              setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log("url firebase trả về", url);
                sendData(url);
              });
            }
          );
        }
      }
    ,
    }));

  return (
    <>
      {avatar && (
        <img src={avatar.preview} alt='' style={{ height: '284px', width: '264px' }} />
      )}
       {!avatar && (!isWebUri(props.preUrl)?
                <img style={{ height: '284px', width: '264px' }}  src="https://image.shutterstock.com/image-vector/man-icon-profile-member-user-260nw-1335068444.jpg" alt="" />
              :  <img style={{ height: '284px', width: '264px' }}  src={props.preUrl} alt="" />
              
      )}
      <div className="mt-3 row">
        <div className="col-12"><input type="file" accept="image/*" onChange={handleChange} /></div>
      </div>
    </>

  );
}

export default forwardRef(ChangeAvatar);


