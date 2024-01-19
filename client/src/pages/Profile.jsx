import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleFileUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + '_' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress);
        },
        (error) => {
          console.error('Error uploading file:', error);
          setFileUploadError(true);
        },
        () => {
          console.log('File uploaded successfully');
          setFile(null);
        }
      );
    } catch (error) {
      console.error('Error handling file upload:', error);
      setFileUploadError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
        />
        <button
          onClick={() => fileRef.current.click()}
          className='bg-slate-700 text-white rounded-lg p-2 uppercase text-sm hover:opacity-95 disabled:opacity-80 mx-10'
        >
          Select File
        </button>
        <button
          onClick={handleFileUpload}
          className='bg-slate-700 text-white rounded-lg p-2 uppercase text-sm hover:opacity-95 disabled:opacity-80'
        >
          Upload File
        </button>
      </div>
      <p className='text-sm self-center mt-2'>
        {fileUploadError ? (
          <span className='text-red-700'>
            Error uploading file (ensure the file size is within limits)
          </span>
        ) : (
          ''
        )}
      </p>
    </div>
  );
}
