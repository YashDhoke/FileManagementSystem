import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleFileUpload = async () => {
    try {
      if (files.length === 0) {
        console.error('No files selected');
        return;
      }

      const storage = getStorage(app);

      // Iterate through each selected file and upload
      files.forEach(async (file) => {
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
            console.log('File uploaded successfully:', fileName);
            setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
          }
        );
      });
    } catch (error) {
      console.error('Error handling file upload:', error);
      setFileUploadError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div>
        <input
          onChange={(e) => setFiles(Array.from(e.target.files))}
          type='file'
          ref={fileRef}
          hidden
          multiple
        />
        <button
          onClick={() => fileRef.current.click()}
          className='bg-slate-700 text-white rounded-lg p-2 uppercase text-sm hover:opacity-95 disabled:opacity-80 mx-6'
        >
          Select Files
        </button>
        <button
          onClick={handleFileUpload}
          className='bg-slate-700 text-white rounded-lg p-2 uppercase text-sm hover:opacity-95 disabled:opacity-80'
        >
          Upload Files
        </button>
      </div>
      <p className='text-sm self-center mt-2'>
        {fileUploadError ? (
          <span className='text-red-700'>
            Error uploading files (ensure the file sizes are within limits)
          </span>
        ) : (
          ''
        )}
      </p>
    </div>
  );
}
