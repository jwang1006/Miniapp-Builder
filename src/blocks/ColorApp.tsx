import { BlockModel, ComposerComponentProps, FeedComponentProps } from './types';
import { useState, useRef, useEffect } from 'react';
import FileUploadComponent from './utils/FileUploadComponent';

export const ColorFeedComponent = ({ model }: FeedComponentProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1>Hi, I'm in the feed!</h1>
      <h2>{model.data.title}</h2>
      {/* Display the uploaded image if available */}
      {model.data.url && <img src={model.data.url} alt="Uploaded" />} 
    </div>
  );
}
export const ColorComposerComponent = ({ model, done }: ComposerComponentProps) => {
  const [title, setTitle] = useState(model.data.title || ''); 
  const [previewUrl, setPreviewUrl] = useState(model.data.url || "");

  const handleSubmit = () => {
    model.data.title = title;
    model.data.url = previewUrl; 
    done(model);
  }

  const handleUpdate = (uploadedUrls: string[]) => {
    // Assuming you only want to store the first uploaded URL
    setPreviewUrl(uploadedUrls[0]); 
  };

  useEffect(() => {
    console.log("Updated previewUrl:", previewUrl);
  }, [previewUrl]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1>Hi, I'm in the composer!</h1>

      <input 
        className="text-2xl font-bold mb-4"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='flex flex-col w-full h-full aspect-square border-2 border-[#cccccc] rounded-lg drop-shadow-md items-center justify-center overflow-hidden relative'>
        {
          previewUrl 
            ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            : <p>No image selected</p> 
        }
      </div>

      {/* Integrate FileUploadComponent */}
      <FileUploadComponent 
        fileTypes="image/*" 
        label="Upload Image"
        onUpdate={handleUpdate}
        multiple={false} // Assuming you only want to upload one image at a time
        maxFiles={1} 
      />

      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
}