import { Button } from "@/components/ui/button";

interface FileUploadInputProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
}

export const FileUploadInput = ({ file, onFileChange, onUpload }: FileUploadInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="flex-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
      />
      <Button 
        onClick={onUpload}
        disabled={!file}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Parse CSV
      </Button>
    </div>
  );
};