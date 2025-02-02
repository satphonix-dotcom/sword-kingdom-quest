import { Question } from "@/types/quiz";

export const parseCsvContent = (text: string, level: number = 1): { questions: Question[], error: string | null } => {
  try {
    // Split by newline and filter out empty rows
    const rows = text.split('\n')
      .map(row => row.split(','))
      .filter(row => row.length > 0 && row.some(cell => cell.trim().length > 0));

    if (rows.length === 0) {
      return { questions: [], error: "The CSV file appears to be empty. Please check the file content." };
    }
    
    // Skip header row if it exists
    const dataRows = rows[0][0].toLowerCase().includes('question') ? rows.slice(1) : rows;
    
    if (dataRows.length === 0) {
      return { questions: [], error: "No valid data rows found in the CSV file. Please check the format." };
    }

    // Process valid rows into questions
    const questions: Question[] = dataRows.map(row => {
      // Filter out empty cells that might come from trailing commas
      const cleanedRow = row.map(cell => cell.trim()).filter(cell => cell.length > 0);
      const [question, correctAnswer, ...options] = cleanedRow;
      return {
        id: crypto.randomUUID(),
        question,
        correct_answer: correctAnswer,
        options: [...new Set([...options, correctAnswer])].sort(() => Math.random() - 0.5),
        level,
        quiz_id: crypto.randomUUID()
      };
    });

    return { questions, error: null };
  } catch (error: any) {
    return { 
      questions: [], 
      error: "Failed to parse the CSV file. Please ensure it follows the required format." 
    };
  }
};