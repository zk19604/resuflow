const mongoose = require('mongoose');

const portfolioDeploymentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  profile: { type: mongoose.Schema.Types.Mixed, required: true },
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('PortfolioDeployment', portfolioDeploymentSchema);
