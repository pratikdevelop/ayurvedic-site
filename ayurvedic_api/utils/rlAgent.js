const Solution = require('../models/Solution');
const UserInteraction = require('../models/UserInteraction');

const recommendSolution = async (userId, healthConcerns = []) => {
  try {
    // Prioritize solutions matching health concerns
    if (healthConcerns.length > 0) {
      const matchingSolutions = await Solution.find({ title: { $in: healthConcerns } });
      if (matchingSolutions.length > 0) {
        return matchingSolutions[Math.floor(Math.random() * matchingSolutions.length)];
      }
    }
    // Fallback to interactions-based recommendation
    const interactions = await UserInteraction.find({ userId }).populate('solution');
    const solutionScores = {};
    interactions.forEach(inter => {
      const sid = inter.solution._id.toString();
      solutionScores[sid] = (solutionScores[sid] || 0) + (inter.rating || 1);
    });
    const topSolutionId = Object.keys(solutionScores).sort((a, b) => solutionScores[b] - solutionScores[a])[0];
    if (topSolutionId) {
      return await Solution.findById(topSolutionId);
    }
    // Fallback to random solution
    const solutions = await Solution.find();
    return solutions[Math.floor(Math.random() * solutions.length)];
  } catch (err) {
    console.error('Recommendation error:', err);
    return null;
  }
};

const updateAgent = async (userId, solutionId, action, rating) => {
  // Update interaction for learning (placeholder)
  console.log(`Updating agent: user=${userId}, solution=${solutionId}, action=${action}, rating=${rating}`);
};

module.exports = { recommendSolution, updateAgent };