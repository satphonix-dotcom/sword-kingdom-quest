interface CsvFormatGuideProps {
  className?: string;
}

export const CsvFormatGuide = ({ className }: CsvFormatGuideProps) => {
  return (
    <div className={`space-y-2 border border-gray-700 rounded-lg p-4 bg-gray-900/50 ${className}`}>
      <p className="text-sm text-gray-400 font-medium">CSV Format Requirements:</p>
      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
        <li>File must be in CSV format (.csv)</li>
        <li>Each row must contain exactly 6 columns in this order:</li>
        <li className="ml-6">1. Question text</li>
        <li className="ml-6">2. Correct answer</li>
        <li className="ml-6">3-6. Four options</li>
        <li>The correct answer must be one of the options</li>
        <li>No empty fields are allowed</li>
        <li>Headers are optional (will be skipped if present)</li>
        <li>Example row: What is 2+2?,4,2,3,4,5</li>
        <li className="text-yellow-400">Important: Remove any trailing commas at the end of each line</li>
      </ul>
    </div>
  );
};