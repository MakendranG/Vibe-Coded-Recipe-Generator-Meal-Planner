import React, { useState, useCallback, useMemo } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ImageUploaderProps {
  onImagesChange: (images: File[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      const newFiles = [...files, ...selectedFiles];
      const newPreviews = [...imagePreviews];

      // Fix: Explicitly type `file` as `File` to resolve type inference issue.
      selectedFiles.forEach((file: File) => {
        newPreviews.push(URL.createObjectURL(file));
      });
      
      setFiles(newFiles);
      setImagePreviews(newPreviews);
      onImagesChange(newFiles);
    }
  }, [files, imagePreviews, onImagesChange]);
  
  const handleRemoveImage = useCallback((indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    const newPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    
    // Revoke object URL to free up memory
    URL.revokeObjectURL(imagePreviews[indexToRemove]);

    setFiles(newFiles);
    setImagePreviews(newPreviews);
    onImagesChange(newFiles);
  }, [files, imagePreviews, onImagesChange]);

  const memoizedPreviews = useMemo(() => {
    return imagePreviews.map((src, index) => (
      <div key={index} className="relative group w-32 h-32 rounded-lg overflow-hidden shadow-sm">
        <img src={src} alt={`Ingredient ${index + 1}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => handleRemoveImage(index)}
            className="p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300"
            aria-label={`Remove image ${index + 1}`}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    ));
  }, [imagePreviews, handleRemoveImage]);

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {memoizedPreviews}
        <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-emerald-400 transition-all duration-300 text-gray-500 hover:text-emerald-600">
          <CameraIcon className="w-8 h-8 mb-1" />
          <span className="text-sm text-center">Add Photo</span>
          <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};