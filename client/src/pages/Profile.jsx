import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, list, deleteObject } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, currentUser.uid);
      const fileList = await list(storageRef);
      const filesData = await Promise.all(
        fileList.items.map(async (item) => {
          const downloadURL = await getDownloadURL(item);
          return { name: item.name, url: downloadURL };
        })
      );
      setUploadedFiles(filesData);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentUser]);

  const handleFileUpload = async () => {
    try {
      if (files.length === 0) {
        console.error('No files selected');
        return;
      }

      const storage = getStorage(app);

      files.forEach(async (file) => {
        const fileName = currentUser.uid + '_' + new Date().getTime() + '_' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload progress:', progress);
            setFilePerc(Math.round(progress));
          },
          (error) => {
            console.error('Error uploading file:', error);
            setFileUploadError(true);
          },
          async () => {
            console.log('File uploaded successfully:', fileName);
            setFiles([]);
            setFilePerc(0); // Reset progress after successful upload
            fetchFiles(); // Refresh the file list
          }
        );
      });
    } catch (error) {
      console.error('Error handling file upload:', error);
      setFileUploadError(true);
    }
  };

  const handleFileDelete = async (fileName) => {
    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, currentUser.uid + '/' + fileName);
      await deleteObject(storageRef);
      fetchFiles(); // Refresh the file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const viewFile = async (file) => {
    try {
      window.open(file.url, '_blank');
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  return (
    <div className='h-screen p-6'>
      <div className='max-w-lg mx-auto'>
        <div className='flex items-center space-x-4 mb-4'>
          <input
            onChange={(e) => setFiles(Array.from(e.target.files))}
            type='file'
            ref={fileRef}
            hidden
            multiple
          />
          <button
            onClick={() => fileRef.current.click()}
            className='bg-slate-700 text-white rounded-lg p-2 uppercase text-sm hover:opacity-95 disabled:opacity-80'
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
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : (
            ''
          )}
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {uploadedFiles.map((file, index) => (
          <div key={index} className='bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300'>
            <div className='text-lg font-semibold mb-2'>{file.name}</div>
            <button
              onClick={() => viewFile(file)}
              className='text-blue-700 underline cursor-pointer mx-5'
            >
              View
            </button>
            <button
              onClick={() => handleFileDelete(file.name)}
              className='text-red-700 underline cursor-pointer'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
