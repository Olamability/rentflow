import type { User, Tenant, Landlord, TenantProfile, LandlordProfile } from '@/types';

/**
 * Calculate profile completeness percentage for a tenant
 */
export const calculateTenantProfileCompleteness = (user: Tenant): number => {
  const profile = user.profile;
  let completed = 0;
  let total = 0;

  // Basic user info (weight: 30%)
  const basicFields = [
    user.name,
    user.email,
    user.phone,
  ];
  total += 3;
  completed += basicFields.filter(Boolean).length;

  if (!profile) return Math.round((completed / total) * 100);

  // Personal info (weight: 25%)
  const personalFields = [
    profile.firstName,
    profile.lastName,
    profile.dateOfBirth,
    profile.nationalId,
    profile.address?.street,
    profile.address?.city,
    profile.address?.state,
    profile.address?.zipCode,
  ];
  total += personalFields.length;
  completed += personalFields.filter(Boolean).length;

  // Employment info (weight: 25%)
  if (profile.employment) {
    const employmentFields = [
      profile.employment.status,
      profile.employment.employer,
      profile.employment.position,
      profile.employment.monthlyIncome !== undefined && profile.employment.monthlyIncome !== null && !isNaN(profile.employment.monthlyIncome),
    ];
    total += employmentFields.length;
    completed += employmentFields.filter(Boolean).length;
  } else {
    total += 4;
  }

  // Emergency contact (weight: 10%)
  if (profile.emergencyContact) {
    const emergencyFields = [
      profile.emergencyContact.name,
      profile.emergencyContact.relationship,
      profile.emergencyContact.phone,
    ];
    total += emergencyFields.length;
    completed += emergencyFields.filter(Boolean).length;
  } else {
    total += 3;
  }

  // References (weight: 10%)
  if (profile.references && profile.references.length > 0) {
    total += 2;
    completed += 2;
  } else {
    total += 2;
  }

  return Math.round((completed / total) * 100);
};

/**
 * Calculate profile completeness percentage for a landlord
 */
export const calculateLandlordProfileCompleteness = (user: Landlord): number => {
  const profile = user.profile;
  let completed = 0;
  let total = 0;

  // Basic user info (weight: 25%)
  const basicFields = [
    user.name,
    user.email,
    user.phone,
  ];
  total += 3;
  completed += basicFields.filter(Boolean).length;

  if (!profile) return Math.round((completed / total) * 100);

  // Personal info (weight: 25%)
  const personalFields = [
    profile.firstName,
    profile.lastName,
    profile.dateOfBirth,
    profile.nationalId,
    profile.address?.street,
    profile.address?.city,
    profile.address?.state,
    profile.address?.zipCode,
  ];
  total += personalFields.length;
  completed += personalFields.filter(Boolean).length;

  // Business info (weight: 25%)
  if (profile.businessInfo) {
    // Only count business fields if registered as a business
    if (profile.businessInfo.registeredBusiness) {
      const businessFields = [
        true, // registeredBusiness is true
        profile.businessInfo.businessName,
        profile.businessInfo.businessRegistrationNumber,
      ];
      total += businessFields.length;
      completed += businessFields.filter(Boolean).length;
    } else {
      // If not registered as business, count it as complete
      total += 1;
      completed += 1;
    }
  } else {
    total += 1;
  }

  // Bank details (weight: 25%)
  if (profile.bankDetails) {
    const bankFields = [
      profile.bankDetails.bankName,
      profile.bankDetails.accountNumber,
      profile.bankDetails.accountName,
    ];
    total += bankFields.length;
    completed += bankFields.filter(Boolean).length;
  } else {
    total += 3;
  }

  return Math.round((completed / total) * 100);
};

/**
 * Calculate profile completeness percentage for any user type
 */
export const calculateProfileCompleteness = (user: User): number => {
  if (user.role === 'tenant') {
    return calculateTenantProfileCompleteness(user as Tenant);
  } else if (user.role === 'landlord') {
    return calculateLandlordProfileCompleteness(user as Landlord);
  }
  
  // For admin or other roles, just check basic fields
  const basicFields = [user.name, user.email, user.phone];
  const completed = basicFields.filter(Boolean).length;
  return Math.round((completed / basicFields.length) * 100);
};

/**
 * Check if profile is complete enough to access features
 */
export const isProfileComplete = (user: User, minimumCompleteness = 70): boolean => {
  return calculateProfileCompleteness(user) >= minimumCompleteness;
};
