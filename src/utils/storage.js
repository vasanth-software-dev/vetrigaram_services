/**
 * Safe Browser Storage Utility
 * Vetrigaram Tech Services
 *
 * Provides defensive reading, parsing, and writing for localStorage and sessionStorage.
 * Protects against:
 * - Malformed JSON strings
 * - Prototype pollution
 * - Spreading arbitrary/unvalidated stored objects into React application state
 * - QuotaExceeded errors
 */

/**
 * Safely retrieves and parses an item from localStorage or sessionStorage.
 *
 * @param {Storage} storage - localStorage or sessionStorage
 * @param {string} key - Key name
 * @param {any} [fallback=null] - Default fallback if not found or invalid
 * @param {Function} [validator=null] - Optional validation function (returns boolean)
 * @returns {any} Sanitized, validated value or fallback
 */
export function safeGetStorage(storage, key, fallback = null, validator = null) {
  try {
    if (!storage || typeof storage.getItem !== 'function') return fallback;
    const raw = storage.getItem(key);
    if (raw === null || raw === undefined) return fallback;

    const parsed = JSON.parse(raw);

    // Prevent __proto__, constructor, or prototype own property pollution
    if (parsed && typeof parsed === 'object') {
      if (
        Object.prototype.hasOwnProperty.call(parsed, '__proto__') ||
        Object.prototype.hasOwnProperty.call(parsed, 'constructor') ||
        Object.prototype.hasOwnProperty.call(parsed, 'prototype')
      ) {
        return fallback;
      }
    }

    if (typeof validator === 'function') {
      return validator(parsed) ? parsed : fallback;
    }

    return parsed;
  } catch {
    return fallback;
  }
}

/**
 * Safely saves a JSON-serializable item to localStorage or sessionStorage.
 *
 * @param {Storage} storage - localStorage or sessionStorage
 * @param {string} key - Key name
 * @param {any} value - Value to serialize and store
 * @returns {boolean} True if successfully stored
 */
export function safeSetStorage(storage, key, value) {
  try {
    if (!storage || typeof storage.setItem !== 'function') return false;
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely removes an item from storage.
 *
 * @param {Storage} storage
 * @param {string} key
 */
export function safeRemoveStorage(storage, key) {
  try {
    if (storage && typeof storage.removeItem === 'function') {
      storage.removeItem(key);
    }
  } catch {
    // Ignore storage deletion errors
  }
}
