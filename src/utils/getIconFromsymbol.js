/**
 * Some of this code may or may not be borrowed from APRS.fi with good intentions...
 * Hessu if you read this, don't ban me please.
 * It is believed that in the nature of this service, according to https://aprs.fi/page/tos,
 * we are not contravening the ToS points 6 and 7 as they are written as we are
 * linking back to APRS.fi, and we are not recreating UI based on existing APRS.fi functionality.
 * If the open source icons (https://github.com/hessu/aprs-symbols) were published
 * in a way where we could utilize them and serve them from our own web servers
 * to satisfy the http://www.aprs.org/symbols/symbols-new.txt new overlay table structure,
 * then it would gladly be done!
 */

let decimalToHexStrings = [];
const characterSet = '0123456789abcdef';
for (let i = 0; i < 256; i++) {
  const s1 = i >> 4;
  const s2 = i & 15;
  decimalToHexStrings[i] = characterSet.substring(s1, s1 + 1) + characterSet.substring(s2, s2 + 1);
}

export function getIconURLFromSymbol(symbol) {
  let code;
  const char1 = symbol.charCodeAt(0);
  const char2 = symbol.charCodeAt(1);
  if (char1 == 47) {
    code = `p${decimalToHexStrings[char2]}`;
  } else if (char1 == 92) {
    code = `a${decimalToHexStrings[char2]}`;
  } else if (char1 == 97) {
    code = `i${decimalToHexStrings[char2]}`;
  } else if ((char1 >= 48 && char1 <= 57) || (char1 >= 65 && char1 <= 90)) {
    code = symbol.charAt(0) + decimalToHexStrings[char2];
  }

  if (!code) {
    return;
  }

  return `https://aprs.fi/s1/f24/${code}${code}.png`;
}
