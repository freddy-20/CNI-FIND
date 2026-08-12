type LostData = {
  firstName?: string | null;
  lastName?: string | null;
  birthPlace?: string | null;
  profession?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
};

type FoundData = {
  firstName?: string | null;
  lastName?: string | null;
  birthPlace?: string | null;
  profession?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
};

export function calculateMatchScore(
  lost: LostData,
  found: FoundData
) {
  let score = 0;

  if (
    lost.lastName &&
    found.lastName &&
    lost.lastName.toLowerCase() ===
      found.lastName.toLowerCase()
  )
    score += 30;

  if (
    lost.firstName &&
    found.firstName &&
    lost.firstName.toLowerCase() ===
      found.firstName.toLowerCase()
  )
    score += 20;

  if (
    lost.birthPlace &&
    found.birthPlace &&
    lost.birthPlace.toLowerCase() ===
      found.birthPlace.toLowerCase()
  )
    score += 10;

  if (
    lost.profession &&
    found.profession &&
    lost.profession.toLowerCase() ===
      found.profession.toLowerCase()
  )
    score += 10;

  if (
    lost.fatherName &&
    found.fatherName &&
    lost.fatherName.toLowerCase() ===
      found.fatherName.toLowerCase()
  )
    score += 15;

  if (
    lost.motherName &&
    found.motherName &&
    lost.motherName.toLowerCase() ===
      found.motherName.toLowerCase()
  )
    score += 15;

  return Math.min(score, 100);
}
