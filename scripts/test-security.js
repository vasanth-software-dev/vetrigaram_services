/**
 * Security & Input Validation Test Suite
 * Vetrigaram Tech Services
 */

import {
  sanitizeText,
  containsMaliciousMarkup,
  validateName,
  validatePhone,
  validateEmail,
  validateAddress,
  validateDescription,
  validateCategory,
  validateService,
  validateDate,
  validateTimeSlot,
  validatePincode,
  validateCityOrArea,
  validateNumber,
  validateSlug,
  validateUrl,
  escapeJsonForScript
} from '../src/utils/security.js';

import { safeGetStorage, safeSetStorage } from '../src/utils/storage.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

console.log('\n--- 1. Normal Input Tests ---');
{
  const n1 = validateName("Vasanth");
  assert(n1.isValid && n1.sanitized === "Vasanth", "Accepts standard single name: 'Vasanth'");

  const n2 = validateName("Vasanth Kumar");
  assert(n2.isValid && n2.sanitized === "Vasanth Kumar", "Accepts full name: 'Vasanth Kumar'");

  const n3 = validateName("O'Brien");
  assert(n3.isValid && n3.sanitized === "O'Brien", "Preserves apostrophe in name: 'O'Brien'");

  const n4 = validateName("Mary-Jane Watson");
  assert(n4.isValid && n4.sanitized === "Mary-Jane Watson", "Preserves hyphens in name: 'Mary-Jane Watson'");

  const n5 = validateName("Dr. A. P. J. Abdul Kalam");
  assert(n5.isValid && n5.sanitized === "Dr. A. P. J. Abdul Kalam", "Preserves periods in initials: 'Dr. A. P. J. Abdul Kalam'");

  const n6 = validateName("சென்னை");
  assert(n6.isValid && n6.sanitized === "சென்னை", "Accepts Tamil name: 'சென்னை'");

  const n7 = validateName("தமிழ்நாடு");
  assert(n7.isValid && n7.sanitized === "தமிழ்நாடு", "Accepts Tamil script: 'தமிழ்நாடு'");

  const n8 = validateName("வெற்றிகரம் சர்வீசஸ்");
  assert(n8.isValid && n8.sanitized === "வெற்றிகரம் சர்வீசஸ்", "Accepts multi-word Tamil: 'வெற்றிகரம் சர்வீசஸ்'");
}

console.log('\n--- 2. XSS & Malicious Input Tests ---');
{
  const xssPayloads = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '"><svg onload=alert(1)>',
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    '<iframe src="malicious.html"></iframe>',
    '<a href="javascript:alert(1)">Click</a>',
    '"><script>alert(document.cookie)</script>'
  ];

  for (const payload of xssPayloads) {
    assert(containsMaliciousMarkup(payload), `Detects malicious markup: ${payload}`);

    const nameRes = validateName(payload);
    assert(!nameRes.isValid, `Rejects XSS in validateName: ${payload}`);

    const addrRes = validateAddress(payload, { isRequired: true });
    assert(!addrRes.isValid, `Rejects XSS in validateAddress: ${payload}`);

    const descRes = validateDescription(payload, { isRequired: true });
    assert(!descRes.isValid, `Rejects XSS in validateDescription: ${payload}`);

    const cityRes = validateCityOrArea(payload, { isRequired: true });
    assert(!cityRes.isValid, `Rejects XSS in validateCityOrArea: ${payload}`);
  }
}

console.log('\n--- 3. Boundary & Edge Case Tests ---');
{
  // Empty & whitespace
  assert(!validateName("").isValid, "Rejects empty name");
  assert(!validateName("   ").isValid, "Rejects whitespace-only name");
  assert(!validatePhone("").isValid, "Rejects empty phone");
  assert(!validatePhone("   ").isValid, "Rejects whitespace-only phone");

  // Under minimum length
  assert(!validateName("A").isValid, "Rejects 1-char name (min 2)");
  assert(validateName("Al").isValid, "Accepts 2-char name");

  // Maximum length boundaries
  const max70Name = "A".repeat(70);
  assert(validateName(max70Name).isValid, "Accepts exactly 70-character name");

  const max71Name = "A".repeat(71);
  assert(!validateName(max71Name).isValid, "Rejects 71-character name (max 70)");

  // Extremely long strings (10,000 chars)
  const hugeString = "Lorem ipsum ".repeat(1000);
  const sanitizedHuge = sanitizeText(hugeString, { maxLength: 1000 });
  assert(sanitizedHuge.length <= 1000, "SanitizeText properly truncates 12,000 chars to maxLength");
}

console.log('\n--- 4. Address Validation Tests ---');
{
  const addr1 = "Flat #12, No. 24/7, 2nd Cross Street, Ambattur Industrial Estate, Chennai - 600053";
  const r1 = validateAddress(addr1);
  assert(r1.isValid && r1.sanitized === addr1, "Preserves #, /, -, numbers, commas in address");

  const addrTamil = "எண் 12, அண்ணா சாலை, சென்னை 600001";
  const r2 = validateAddress(addrTamil);
  assert(r2.isValid && r2.sanitized === addrTamil, "Preserves Tamil script in address");

  const addrXss = "No. 12 <script>alert(1)</script> Street";
  const r3 = validateAddress(addrXss);
  assert(!r3.isValid, "Rejects address with script tag");
}

console.log('\n--- 5. Phone Validation Tests ---');
{
  // Valid Indian 10-digit formats
  assert(validatePhone("6374121120").isValid, "Valid 10-digit mobile starting with 6");
  assert(validatePhone("9876543210").isValid, "Valid 10-digit mobile starting with 9");
  assert(validatePhone("+91 6374121120").isValid, "Valid +91 prefixed mobile");
  assert(validatePhone("09876543210").isValid, "Valid 0-prefixed 11-digit mobile");
  assert(validatePhone("(555) 000-0000").isValid, "Valid formatted number (display tolerance)");

  // Invalid formats
  assert(!validatePhone("123456").isValid, "Rejects too short phone (<8 digits)");
  assert(!validatePhone("98765abcde").isValid, "Rejects letters in phone");
  assert(!validatePhone("12345678901234567").isValid, "Rejects too long phone (>15 digits)");
}

console.log('\n--- 6. Email Validation Tests ---');
{
  assert(validateEmail("support@vetikharam.com").isValid, "Valid standard email");
  assert(validateEmail("user.name+tag@domain.co.in").isValid, "Valid email with plus and subdomains");
  assert(!validateEmail("invalid-email").isValid, "Rejects email without @");
  assert(!validateEmail("user@").isValid, "Rejects email without domain");
  assert(!validateEmail("user@domain").isValid, "Rejects email without TLD");
  assert(!validateEmail("<script>@domain.com").isValid, "Rejects malicious email");
}

console.log('\n--- 7. Date & Time Validation Tests ---');
{
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  const todayStr = `${y}-${m}-${d}`;

  // Valid today
  assert(validateDate(todayStr).isValid, `Accepts today's date (${todayStr})`);

  // Future valid date (in 30 days)
  const in30Days = new Date(today);
  in30Days.setDate(in30Days.getDate() + 30);
  const futureStr = `${in30Days.getFullYear()}-${String(in30Days.getMonth() + 1).padStart(2, '0')}-${String(in30Days.getDate()).padStart(2, '0')}`;
  assert(validateDate(futureStr).isValid, `Accepts future date within 90 days (${futureStr})`);

  // Past date rejected
  assert(!validateDate("2020-01-01").isValid, "Rejects past date: 2020-01-01");

  // More than 90 days rejected
  const in120Days = new Date(today);
  in120Days.setDate(in120Days.getDate() + 120);
  const farFutureStr = `${in120Days.getFullYear()}-${String(in120Days.getMonth() + 1).padStart(2, '0')}-${String(in120Days.getDate()).padStart(2, '0')}`;
  assert(!validateDate(farFutureStr).isValid, `Rejects date beyond 90 days (${farFutureStr})`);

  // Invalid calendar dates
  assert(!validateDate("2025-02-30").isValid, "Rejects non-existent day: Feb 30");
  assert(!validateDate("2025-13-01").isValid, "Rejects month 13");
  assert(!validateDate("not-a-date").isValid, "Rejects non-date string");

  // Time slot allowlist
  const validSlots = ["09:00 AM - 12:00 PM (Morning)", "12:00 PM - 03:00 PM (Afternoon)"];
  assert(validateTimeSlot("09:00 AM - 12:00 PM (Morning)", validSlots).isValid, "Accepts allowed slot");
  assert(!validateTimeSlot("11:00 PM - 03:00 AM (Midnight)", validSlots).isValid, "Rejects unknown slot");
}

console.log('\n--- 8. Category, Service & Pincode Tests ---');
{
  assert(validateCategory("appliances").isValid, "Accepts 'appliances'");
  assert(validateCategory("electrical").isValid, "Accepts 'electrical'");
  assert(validateCategory("plumbing").isValid, "Accepts 'plumbing'");
  assert(!validateCategory("hacking-category").isValid, "Rejects unknown category");

  const allowedServices = ["AC Repair & Servicing", "Refrigerator Repair"];
  assert(validateService("AC Repair & Servicing", allowedServices).isValid, "Accepts genuine service");
  assert(!validateService("Fake Unverified Service", allowedServices).isValid, "Rejects unauthorized service");

  assert(validatePincode("600053").isValid, "Accepts valid 6-digit Chennai pincode (600053)");
  assert(!validatePincode("60005").isValid, "Rejects 5-digit pincode");
  assert(!validatePincode("6000534").isValid, "Rejects 7-digit pincode");
  assert(!validatePincode("60005a").isValid, "Rejects alphanumeric pincode");

  // Numeric validation tests
  assert(validateNumber(149, { min: 0, max: 10000, integer: true }).isValid, "Accepts valid integer 149");
  assert(!validateNumber("abc").isValid, "Rejects non-numeric string");
  assert(!validateNumber(NaN).isValid, "Rejects NaN");
  assert(!validateNumber(Infinity).isValid, "Rejects Infinity");
  assert(!validateNumber(-5, { min: 0 }).isValid, "Rejects negative number when min is 0");
  assert(!validateNumber(10.5, { integer: true }).isValid, "Rejects decimal when integer is required");
}

console.log('\n--- 9. Route Slug & URL Safety Tests ---');
{
  assert(validateSlug("ac-repair").isValid, "Accepts valid slug: 'ac-repair'");
  assert(validateSlug("chennai").isValid, "Accepts valid slug: 'chennai'");
  assert(!validateSlug("../etc/passwd").isValid, "Rejects path traversal in slug");
  assert(!validateSlug("<script>").isValid, "Rejects script in slug");
  assert(!validateSlug("UPPERCASE").isValid, "Rejects uppercase in slug");

  assert(validateUrl("https://facebook.com/page") === "https://facebook.com/page", "Allows https URL");
  assert(validateUrl("tel:+916374121120") === "tel:+916374121120", "Allows tel: URL");
  assert(validateUrl("mailto:support@vetikharam.com") === "mailto:support@vetikharam.com", "Allows mailto: URL");
  assert(validateUrl("/services/ac-repair") === "/services/ac-repair", "Allows relative URL");
  assert(validateUrl("javascript:alert(1)") === "#", "Blocks javascript: URL and returns fallback '#'");
  assert(validateUrl("data:text/html,<script>alert(1)</script>") === "#", "Blocks data: URL and returns fallback '#'");
  assert(validateUrl("vbscript:alert(1)") === "#", "Blocks vbscript: URL and returns fallback '#'");
}

console.log('\n--- 10. JSON-LD in Script Escaping Tests ---');
{
  const testObject = {
    title: "Vetrigaram",
    comment: "</script><script>alert('XSS')</script>",
    link: "https://example.com?a=1&b=2"
  };

  const rawJson = JSON.stringify(testObject);
  const escaped = escapeJsonForScript(rawJson);

  assert(!escaped.includes('</script>'), "Escaped JSON has no raw </script>");
  assert(escaped.includes('\\u003c/script\\u003e'), "Escapes '<' to \\u003c");
  assert(escaped.includes('\\u003e'), "Escapes '>' to \\u003e");
  assert(escaped.includes('\\u0026'), "Escapes '&' to \\u0026");
}

console.log('\n--- 11. Storage Utility Tests ---');
{
  // Mock Storage
  const store = {};
  const mockStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };

  safeSetStorage(mockStorage, 'user_pref', { theme: 'light', count: 5 });
  const retrieved = safeGetStorage(mockStorage, 'user_pref', null, (data) => typeof data?.count === 'number');
  assert(retrieved !== null && retrieved.count === 5, "Successfully writes and validates storage data");

  // Malformed JSON test
  mockStorage.setItem('corrupt', '{{{bad-json');
  const corruptRetrieved = safeGetStorage(mockStorage, 'corrupt', 'fallback_val');
  assert(corruptRetrieved === 'fallback_val', "Safely handles corrupt JSON and returns fallback");

  // Prototype pollution attempt
  mockStorage.setItem('pollution', '{"__proto__": {"polluted": true}}');
  const polluted = safeGetStorage(mockStorage, 'pollution', 'safe');
  assert(polluted === 'safe', "Safely rejects prototype pollution in storage data");
}

console.log(`\n========================================`);
console.log(`Test Results: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
