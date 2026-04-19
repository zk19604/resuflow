function validateProfile(profile) {
  const errors = [];

  if (!profile.personalInfo?.name) errors.push('Missing name');
  if (!profile.personalInfo?.email) errors.push('Missing email');
  if (!profile.skills) errors.push('Missing skills object');

  // Normalize dates in workExperience
  profile.workExperience = profile.workExperience?.map(exp => ({
    ...exp,
    startDate: normalizeDate(exp.startDate),
    endDate: exp.endDate?.toLowerCase() === 'present' ? 'Present' : normalizeDate(exp.endDate)
  })) || [];

  // Normalize dates in education
  profile.education = profile.education?.map(edu => ({
    ...edu,
    startDate: normalizeDate(edu.startDate),
    endDate: normalizeDate(edu.endDate)
  })) || [];

  return { valid: errors.length === 0, errors, profile };
}

function normalizeDate(dateStr) {
  if (!dateStr) return '';
  const parsed = new Date(dateStr);
  if (!isNaN(parsed)) {
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}`;
  }
  return dateStr;
}

module.exports = { validateProfile };