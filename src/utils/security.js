/* eslint-disable no-control-regex */
/**
 * Centralized Frontend Input Validation & Sanitization Security Utilities
 * Vetrigaram Tech Services
 *
 * Designed to strictly prevent XSS, script injection, control character injection,
 * and malformed payloads while preserving legitimate user data (Unicode, Tamil script,
 * apostrophes, hyphens, and address formats).
 */

// Regex for invisible / control characters excluding standard whitespace (\t, \n, \r)
const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u0080-\u009F]/g;

// Regex to detect HTML/script tags or event handler patterns
const HTML_TAG_REGEX = /<[^>]*>/g;
const SCRIPT_INJECTION_REGEX = /<\s*script\b[^>]*>|javascript:|vbscript:|data:\s*text\/html/i;

/**
 * Strips dangerous control characters and normalizes Unicode without destroying
 * legitimate language characters, Tamil script, or valid punctuation.
 *
 * @param {any} value - The input value to sanitize
 * @param {Object} [options={}] - Options
 * @param {boolean} [options.allowNewlines=false] - Whether to allow newlines (\n, \r)
 * @param {number} [options.maxLength=1000] - Max length cutoff
 * @returns {string} Sanitized string
 */
export function sanitizeText(value, options = {}) {
  if (value === null || value === undefined) return '';
  const str = String(value);

  const { allowNewlines = false, maxLength = 1000 } = options;

  // 1. Unicode NFC Normalization
  let cleaned = str.normalize('NFC');

  // 2. Remove illegal control characters
  cleaned = cleaned.replace(CONTROL_CHARS_REGEX, '');

  if (!allowNewlines) {
    // Replace newlines and tabs with spaces for single-line inputs
    cleaned = cleaned.replace(/[\r\n\t]+/g, ' ');
  } else {
    // Normalize CRLF to LF, keep valid indentation/newlines
    cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  // 3. Normalize whitespace (collapse multiple spaces, preserving single spaces)
  if (!allowNewlines) {
    cleaned = cleaned.replace(/\s+/g, ' ');
  } else {
    // For multiline, only collapse multiple horizontal spaces
    cleaned = cleaned.replace(/[^\S\r\n]+/g, ' ');
  }

  // 4. Strip dangerous HTML/script tags
  cleaned = cleaned.replace(HTML_TAG_REGEX, '');

  // 5. Trim leading/trailing whitespace
  cleaned = cleaned.trim();

  // 6. Enforce hard maximum length
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }

  return cleaned;
}

/**
 * Checks whether a string contains HTML/script tags or dangerous protocol injections.
 * @param {string} value
 * @returns {boolean} True if malicious markup is found
 */
export function containsMaliciousMarkup(value) {
  if (!value || typeof value !== 'string') return false;
  return SCRIPT_INJECTION_REGEX.test(value) || /<[/a-z!][\s\S]*>/i.test(value);
}

/**
 * Validates a Person's Name.
 *
 * Supports:
 * - English/Latin names: John Doe, Mary-Jane, O'Brien, René
 * - Indic & Tamil names: Vasanth Kumar, சென்னை, செந்தில்குமார், தமிழ்
 * - Periods in initials: Dr. A. P. J. Abdul Kalam
 *
 * Rejects:
 * - HTML/script tags (<script>, <img>)
 * - Raw control characters
 * - Numbers and special symbols (!@#$%^&*)
 * - Excessive length (> 70 chars) or too short (< 2 chars)
 *
 * @param {string} name
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateName(name, options = {}) {
  const { isRequired = true, maxLength = 70, minLength = 2 } = options;

  if (!name || typeof name !== 'string' || !name.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please enter your full name.', sanitized: '' };
  }

  if (containsMaliciousMarkup(name)) {
    return { isValid: false, error: 'Name cannot contain HTML or script tags.', sanitized: '' };
  }

  const trimmed = name.trim();
  if (trimmed.length > maxLength) {
    return { isValid: false, error: `Name cannot exceed ${maxLength} characters.`, sanitized: '' };
  }

  const sanitized = sanitizeText(trimmed, { allowNewlines: false, maxLength });

  if (sanitized.length < minLength) {
    return { isValid: false, error: `Name must be at least ${minLength} characters.`, sanitized };
  }

  // Allow Unicode letters (\p{L}), marks (\p{M} for Tamil vowel signs), spaces, hyphens, apostrophes, and periods
  // Supports: Dr. A. P. J. Abdul Kalam, O'Brien, Mary-Jane Watson, Vasanth, சென்னை, தமிழ்நாடு
  const namePattern = /^[\p{L}\p{M}]+(?:\.?\s*['-]?\s*[\p{L}\p{M}]+)*\.?$/u;

  if (!namePattern.test(sanitized)) {
    return {
      isValid: false,
      error: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only).',
      sanitized
    };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Phone Number.
 *
 * In the context of this Tamil Nadu / India home services app:
 * - 10-digit Indian mobile numbers starting with 6, 7, 8, or 9
 * - Supports optional prefix: +91, 91, or 0
 * - Supports common display formatting: +91 98765-43210, (555) 000-0000 (international fallback)
 *
 * @param {string} phone
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string, rawDigits: string }}
 */
export function validatePhone(phone, options = {}) {
  const { isRequired = true, allowInternational = true } = options;

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '', rawDigits: '' };
    return { isValid: false, error: 'Phone number is required.', sanitized: '', rawDigits: '' };
  }

  if (containsMaliciousMarkup(phone)) {
    return { isValid: false, error: 'Invalid characters in phone number.', sanitized: '', rawDigits: '' };
  }

  const sanitized = sanitizeText(phone, { allowNewlines: false, maxLength: 25 });

  // Extract raw digits
  const rawDigits = sanitized.replace(/\D/g, '');

  if (rawDigits.length < 8) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number (at least 8 digits).',
      sanitized,
      rawDigits
    };
  }

  if (rawDigits.length > 15) {
    return {
      isValid: false,
      error: 'Phone number cannot exceed 15 digits.',
      sanitized,
      rawDigits
    };
  }

  // India Mobile Standard: 10 digits starting with 6-9, optionally prefixed by 91 or 0
  let isIndiaMobile = false;
  if (rawDigits.length === 10 && /^[6-9]\d{9}$/.test(rawDigits)) {
    isIndiaMobile = true;
  } else if (rawDigits.length === 11 && rawDigits.startsWith('0') && /^[6-9]\d{9}$/.test(rawDigits.slice(1))) {
    isIndiaMobile = true;
  } else if (rawDigits.length === 12 && rawDigits.startsWith('91') && /^[6-9]\d{9}$/.test(rawDigits.slice(2))) {
    isIndiaMobile = true;
  }

  // If allowInternational is true and not India format, permit standard international 8-15 digits
  if (!isIndiaMobile && !allowInternational) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.',
      sanitized,
      rawDigits
    };
  }

  // Ensure input doesn't contain forbidden alphabetic characters
  if (/[a-zA-Z]/.test(sanitized)) {
    return {
      isValid: false,
      error: 'Phone number cannot contain letters.',
      sanitized,
      rawDigits
    };
  }

  return { isValid: true, error: '', sanitized, rawDigits };
}

/**
 * Validates an Email Address.
 *
 * @param {string} email
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateEmail(email, options = {}) {
  const { isRequired = false, maxLength = 100 } = options;

  if (!email || typeof email !== 'string' || !email.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Email address is required.', sanitized: '' };
  }

  if (containsMaliciousMarkup(email)) {
    return { isValid: false, error: 'Invalid characters in email address.', sanitized: '' };
  }

  const sanitized = sanitizeText(email, { allowNewlines: false, maxLength }).toLowerCase();

  if (sanitized.length > maxLength) {
    return { isValid: false, error: `Email cannot exceed ${maxLength} characters.`, sanitized };
  }

  // Standard RFC 5322 compatible email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid email address.', sanitized };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Street Address.
 *
 * Permissive for real-world addresses:
 * Supports:
 * - Tamil and Unicode script (e.g. சென்னை, தமிழ்நாடு)
 * - Address punctuation: commas, periods, slashes (/), hyphens (-), hash signs (#), numbers
 * - Apartment / Floor notation: Flat #12, No. 24/7, 2nd Floor, Ambattur Industrial Estate
 *
 * Rejects:
 * - HTML and script injection tags
 * - Control characters
 * - Unreasonable length (> 300 chars)
 *
 * @param {string} address
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateAddress(address, options = {}) {
  const { isRequired = false, maxLength = 300, minLength = 5 } = options;

  if (!address || typeof address !== 'string' || !address.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Full address is required.', sanitized: '' };
  }

  if (containsMaliciousMarkup(address)) {
    return { isValid: false, error: 'Address cannot contain HTML or script markup.', sanitized: '' };
  }

  const sanitized = sanitizeText(address, { allowNewlines: false, maxLength });

  if (isRequired && sanitized.length < minLength) {
    return { isValid: false, error: `Address must be at least ${minLength} characters.`, sanitized };
  }

  if (sanitized.length > maxLength) {
    return { isValid: false, error: `Address cannot exceed ${maxLength} characters.`, sanitized };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Problem Description or Comment.
 *
 * Supports multiline, Unicode/Tamil, and standard punctuation.
 *
 * @param {string} desc
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateDescription(desc, options = {}) {
  const { isRequired = false, maxLength = 1000, minLength = 5 } = options;

  if (!desc || typeof desc !== 'string' || !desc.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please provide a problem description.', sanitized: '' };
  }

  if (containsMaliciousMarkup(desc)) {
    return { isValid: false, error: 'Description cannot contain script tags or HTML markup.', sanitized: '' };
  }

  const sanitized = sanitizeText(desc, { allowNewlines: true, maxLength });

  if (isRequired && sanitized.length < minLength) {
    return { isValid: false, error: `Description must be at least ${minLength} characters.`, sanitized };
  }

  if (sanitized.length > maxLength) {
    return { isValid: false, error: `Description cannot exceed ${maxLength} characters.`, sanitized };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Category against an explicit allowlist.
 *
 * @param {string} category
 * @param {string[]} allowedCategories
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateCategory(category, allowedCategories = ['appliances', 'electrical', 'plumbing'], options = {}) {
  const { isRequired = false } = options;

  if (!category || typeof category !== 'string' || !category.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please select a service category.', sanitized: '' };
  }

  const sanitized = sanitizeText(category, { allowNewlines: false, maxLength: 50 });

  if (!allowedCategories.includes(sanitized)) {
    return { isValid: false, error: 'Selected service category is not valid.', sanitized: '' };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Service Name against an array of catalog items.
 *
 * @param {string} service
 * @param {string[]} allowedServices
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateService(service, allowedServices = [], options = {}) {
  const { isRequired = false } = options;

  if (!service || typeof service !== 'string' || !service.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please select a specific service.', sanitized: '' };
  }

  const sanitized = sanitizeText(service, { allowNewlines: false, maxLength: 80 });

  if (allowedServices.length > 0 && !allowedServices.includes(sanitized)) {
    return { isValid: false, error: 'Selected service is not recognized.', sanitized: '' };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Preferred Booking Date (YYYY-MM-DD).
 *
 * Checks:
 * - Proper format (YYYY-MM-DD)
 * - Actual calendar existence (leap years, 30/31 days)
 * - Not in past (must be today or later)
 * - Not more than maxDaysAhead in future (default 90 days)
 *
 * @param {string} dateString
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateDate(dateString, options = {}) {
  const { isRequired = false, maxDaysAhead = 90 } = options;

  if (!dateString || typeof dateString !== 'string' || !dateString.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please select a preferred date.', sanitized: '' };
  }

  const sanitized = sanitizeText(dateString, { allowNewlines: false, maxLength: 10 });

  // Format check
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = sanitized.match(dateRegex);

  if (!match) {
    return { isValid: false, error: 'Please enter a valid date in YYYY-MM-DD format.', sanitized };
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Invalid month in selected date.', sanitized };
  }

  // Days in month validation including leap years
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { isValid: false, error: 'Invalid day for the selected month.', sanitized };
  }

  const inputDate = new Date(year, month - 1, day);
  inputDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return { isValid: false, error: 'Preferred date cannot be in the past.', sanitized };
  }

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxDaysAhead);

  if (inputDate > maxDate) {
    return {
      isValid: false,
      error: `Please select a date within the next ${maxDaysAhead} days.`,
      sanitized
    };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Time Slot selection against an allowlist.
 *
 * @param {string} timeSlot
 * @param {string[]} allowedSlots
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateTimeSlot(timeSlot, allowedSlots = [], options = {}) {
  const { isRequired = false } = options;

  if (!timeSlot || typeof timeSlot !== 'string' || !timeSlot.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please select a preferred time slot.', sanitized: '' };
  }

  const sanitized = sanitizeText(timeSlot, { allowNewlines: false, maxLength: 60 });

  if (allowedSlots.length > 0 && !allowedSlots.includes(sanitized)) {
    return { isValid: false, error: 'Selected time slot is not recognized.', sanitized: '' };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a 6-digit Indian Postal Pincode.
 *
 * @param {string} pincode
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validatePincode(pincode, options = {}) {
  const { isRequired = false } = options;

  if (!pincode || typeof pincode !== 'string' || !pincode.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Pincode is required.', sanitized: '' };
  }

  const trimmed = pincode.trim();

  if (trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid 6-digit postal pincode.', sanitized: '' };
  }

  const sanitized = sanitizeText(trimmed, { allowNewlines: false, maxLength: 6 });

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a City or Locality/Area name.
 *
 * @param {string} text
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, sanitized: string }}
 */
export function validateCityOrArea(text, options = {}) {
  const { isRequired = false, maxLength = 60 } = options;

  if (!text || typeof text !== 'string' || !text.trim()) {
    if (!isRequired) return { isValid: true, error: '', sanitized: '' };
    return { isValid: false, error: 'Please enter a city or area name.', sanitized: '' };
  }

  if (containsMaliciousMarkup(text)) {
    return { isValid: false, error: 'Input cannot contain HTML or script markup.', sanitized: '' };
  }

  const sanitized = sanitizeText(text, { allowNewlines: false, maxLength });

  if (sanitized.length > maxLength) {
    return { isValid: false, error: `Name cannot exceed ${maxLength} characters.`, sanitized };
  }

  // Allow Unicode letters (including Tamil), spaces, hyphens, periods, commas
  const areaPattern = /^[\p{L}\p{M}0-9\s.,'-]+$/u;
  if (!areaPattern.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid city or area name.', sanitized };
  }

  return { isValid: true, error: '', sanitized };
}

/**
 * Validates a Numeric Value.
 *
 * @param {any} value
 * @param {Object} [options={}]
 * @returns {{ isValid: boolean, error: string, value: number }}
 */
export function validateNumber(value, options = {}) {
  const { isRequired = true, min = -Infinity, max = Infinity, integer = false } = options;

  if (value === null || value === undefined || value === '') {
    if (!isRequired) return { isValid: true, error: '', value: 0 };
    return { isValid: false, error: 'A numeric value is required.', value: NaN };
  }

  const num = Number(value);

  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return { isValid: false, error: 'Please enter a valid number.', value: NaN };
  }

  if (integer && !Number.isInteger(num)) {
    return { isValid: false, error: 'Please enter a whole number (integer).', value: num };
  }

  if (num < min) {
    return { isValid: false, error: `Value must be at least ${min}.`, value: num };
  }

  if (num > max) {
    return { isValid: false, error: `Value cannot exceed ${max}.`, value: num };
  }

  return { isValid: true, error: '', value: num };
}

/**
 * Validates a Route Slug parameter.
 *
 * @param {string} slug
 * @returns {{ isValid: boolean, sanitized: string }}
 */
export function validateSlug(slug) {
  if (!slug || typeof slug !== 'string') return { isValid: false, sanitized: '' };

  const trimmed = slug.trim();

  // Route slugs must be strictly lowercase alphanumeric with hyphens, 1-60 chars
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed) && trimmed.length <= 60) {
    return { isValid: true, sanitized: trimmed };
  }

  return { isValid: false, sanitized: '' };
}

/**
 * Validates and sanitizes a URL against dangerous protocols (javascript:, data:, vbscript:).
 * Only permits safe protocols specified in allowlist.
 *
 * @param {string} url
 * @param {string[]} [allowedProtocols=['https:', 'http:', 'tel:', 'mailto:']]
 * @param {string} [fallback='#']
 * @returns {string} Safe URL or fallback
 */
export function validateUrl(url, allowedProtocols = ['https:', 'http:', 'tel:', 'mailto:'], fallback = '#') {
  if (!url || typeof url !== 'string') return fallback;

  const trimmed = url.trim();

  // Allow relative URLs starting with / or #
  if (trimmed.startsWith('/') || (trimmed.startsWith('#') && !trimmed.startsWith('#javascript:'))) {
    if (containsMaliciousMarkup(trimmed)) return fallback;
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed, 'https://dummy-base.org');
    if (allowedProtocols.includes(parsed.protocol)) {
      return trimmed;
    }
  } catch {
    // Malformed URL
  }

  return fallback;
}

/**
 * Safely escapes JSON strings for embedding into <script> tags (such as JSON-LD).
 * Replaces '<', '>', '&', and Unicode line terminators (\u2028, \u2029) to prevent
 * HTML script breakout (e.g. </script><script>alert(1)</script>).
 *
 * @param {string} jsonString
 * @returns {string} Escaped JSON string safe for <script> bodies
 */
export function escapeJsonForScript(jsonString) {
  if (!jsonString || typeof jsonString !== 'string') return '{}';
  return jsonString
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
