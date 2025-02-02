export const validateCsvRow = (row: string[], rowIndex: number): string | null => {
  // First, filter out empty cells that might come from trailing commas
  const cleanedRow = row
    .map(cell => cell.trim())
    .filter(cell => cell.length > 0);
  
  // Check if row has exactly 6 columns
  if (cleanedRow.length !== 6) {
    return `Row ${rowIndex + 1} is invalid. Expected 6 columns but found ${cleanedRow.length}. Please remove any trailing commas and ensure each row contains exactly: question, correct answer, and 4 options.`;
  }

  // Check for empty cells in the cleaned row
  const emptyIndex = cleanedRow.findIndex(cell => !cell);
  if (emptyIndex !== -1) {
    const fieldName = emptyIndex === 0 ? "Question" : 
                     emptyIndex === 1 ? "Correct answer" : 
                     `Option ${emptyIndex - 1}`;
    return `Row ${rowIndex + 1}: ${fieldName} cannot be empty`;
  }

  // Validate that the correct answer appears in the options
  const [, correctAnswer, ...options] = cleanedRow;
  if (!options.includes(correctAnswer)) {
    return `Row ${rowIndex + 1}: Correct answer "${correctAnswer}" must be one of the options`;
  }

  return null;
};