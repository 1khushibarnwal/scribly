import { useRef } from "react";
import { ImagePlusIcon, XIcon } from "lucide-react";

const ImagePicker = ({ files, setFiles, maxFiles = 5 }) => {
  const inputRef = useRef(null);

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);
    const combined = [...files, ...selected].slice(0, maxFiles);
    setFiles(combined);
    e.target.value = ""; // allow selecting the same file again if removed
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        {files.map((file, i) => (
          <div key={i} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${i + 1}`}
              className="size-20 object-cover rounded-lg border border-base-300"
            />
            <button
              type="button"
              onClick={() => removeFile(i)}
              className="absolute -top-2 -right-2 bg-error text-error-content rounded-full size-5 flex items-center justify-center"
            >
              <XIcon className="size-3" />
            </button>
          </div>
        ))}

        {files.length < maxFiles && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="size-20 rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center text-base-content/50 hover:border-primary hover:text-primary"
          >
            <ImagePlusIcon className="size-6" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleSelect}
      />
      <p className="text-xs text-base-content/50">
        {files.length}/{maxFiles} images · JPG, PNG, up to 5MB each
      </p>
    </div>
  );
};

export default ImagePicker;
