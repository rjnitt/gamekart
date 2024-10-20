const db = require('../config/db');

class Question {
  // Helper method to execute queries
  static async executeQuery(query, params = []) {
    try {
      console.log("Query:: ", query);
      const connection = await db;
      const [result] = await connection.query(query, params);
      return result;
    } catch (error) {
      console.error('Database query error:', error.message);
      throw error;
    }
  }

  // Fetch all questions from the database
  static async getAllQuestions() {
    return this.executeQuery('SELECT * FROM questions');
  }

  // Fetch a single question by its ID
  static async getQuestionById(id) {
    console.log("call question by id", id);
    const result = await this.executeQuery('SELECT * FROM questions WHERE id = ?', [id]);
    return result[0] || null;  // Return the question or null if not found
  }

  // Create a new question
  static async createQuestion(category, questionText, imageUrl, correctAnswer) {
    const result = await this.executeQuery(
      'INSERT INTO questions (category, question_text, image_url, correct_answer) VALUES (?, ?, ?, ?)',
      [category, questionText, imageUrl, correctAnswer]
    );
    return result.insertId;  // Return the ID of the inserted question
  }

  // Fetch a single question by its ID
  static async getRandomQuestion(categoryName) {
    console.log("categoryName called:: ", categoryName);
    // SQL query
    let query = 'SELECT * FROM questions';
    // If category_id is provided, add WHERE clause
    if (categoryName) {
      query += " WHERE category = '" + categoryName + "'";
    }
    query += ' ORDER BY RAND() LIMIT 1'; // Fetch one random question
    const result =  await this.executeQuery(query);
    return result[0] || null;  // Return the question or null if not found    
  }  
  
}

module.exports = Question;
