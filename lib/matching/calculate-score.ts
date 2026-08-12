export const MATCH_THRESHOLD = 60;

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

function sameValue(a?: string | null, b?: string | null) {
  return !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function calculateMatchScore(lost: LostData, found: FoundData) {
  let score = 0;

  if (sameValue(lost.lastName, found.lastName)) score += 30;
  if (sameValue(lost.firstName, found.firstName)) score += 20;
  if (sameValue(lost.fatherName, found.fatherName)) score += 15;
  if (sameValue(lost.motherName, found.motherName)) score += 15;
  if (sameValue(lost.birthPlace, found.birthPlace)) score += 10;
  if (sameValue(lost.profession, found.profession)) score += 10;

  return Math.min(score, 100);
}
