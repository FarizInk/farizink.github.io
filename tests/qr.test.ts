import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  wifiPayload,
  escapeWifi,
  emailPayload,
  phonePayload,
  smsPayload,
  vcardPayload,
  escapeVCard,
  contrastRatio,
  scanWarning,
  capacityHint,
  utf8Length,
  normalizeHex,
  isHexColor
} from '../src/lib/tools/qr.ts';

test('wifi: basic WPA payload', () => {
  assert.equal(
    wifiPayload({ ssid: 'Home', password: 'secret', security: 'WPA' }),
    'WIFI:T:WPA;S:Home;P:secret;H:false;;'
  );
});

test('wifi: escapes ; " \\ , : in SSID and password', () => {
  assert.equal(escapeWifi('a;b"c\\d,e:f'), 'a\\;b\\"c\\\\d\\,e\\:f');
  assert.equal(
    wifiPayload({ ssid: 'My;"Net"', password: 'p:w,d', hidden: true }),
    'WIFI:T:WPA;S:My\\;\\"Net\\";P:p\\:w\\,d;H:true;;'
  );
});

test('wifi: open network uses T:nopass and omits the password', () => {
  assert.equal(
    wifiPayload({ ssid: 'Cafe', password: 'ignored', security: 'nopass' }),
    'WIFI:T:nopass;S:Cafe;H:false;;'
  );
});

test('wifi: empty SSID gives empty payload', () => {
  assert.equal(wifiPayload({ ssid: '' }), '');
});

test('email: subject and body are URL-encoded', () => {
  assert.equal(
    emailPayload({ to: 'me@example.com', subject: 'Hi & bye', body: 'Line 1\nLine 2?' }),
    'mailto:me@example.com?subject=Hi%20%26%20bye&body=Line%201%0ALine%202%3F'
  );
  assert.equal(emailPayload({ to: 'me@example.com' }), 'mailto:me@example.com');
  assert.equal(emailPayload({ to: '' }), '');
});

test('phone and sms: number cleaned, SMSTO format', () => {
  assert.equal(phonePayload('+62 812-3456 (789)'), 'tel:+628123456789');
  assert.equal(phonePayload('  '), '');
  assert.equal(smsPayload('+1 555 0100', 'See you: 7pm'), 'SMSTO:+15550100:See you: 7pm');
  assert.equal(smsPayload('0812'), 'SMSTO:0812');
});

test('vcard: escapes , ; \\ and newlines', () => {
  assert.equal(escapeVCard('a,b;c\\d\ne'), 'a\\,b\\;c\\\\d\\ne');
  const card = vcardPayload({
    firstName: 'Nizar',
    lastName: 'Akbar, Jr.',
    phone: '+62 812',
    email: 'n@example.com',
    org: 'Acme; Inc',
    url: 'https://fariz.dev'
  });
  assert.equal(
    card,
    [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Akbar\\, Jr.;Nizar;;;',
      'FN:Nizar Akbar\\, Jr.',
      'ORG:Acme\\; Inc',
      'TEL;TYPE=CELL:+62 812',
      'EMAIL:n@example.com',
      'URL:https://fariz.dev',
      'END:VCARD'
    ].join('\r\n')
  );
  assert.equal(vcardPayload({}), '');
});

test('contrast: black on white is 21, same color is 1', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21);
  assert.equal(contrastRatio('#fff', '#000'), 21);
  assert.equal(contrastRatio('#777777', '#777777'), 1);
});

test('scanWarning: none for dark on light', () => {
  assert.equal(scanWarning('#000000', '#ffffff'), null);
});

test('scanWarning: inverted colors warn', () => {
  const w = scanWarning('#ffffff', '#000000');
  assert.ok(w);
  assert.match(w, /inverted/);
});

test('scanWarning: low contrast warns', () => {
  const w = scanWarning('#888888', '#aaaaaa');
  assert.ok(w);
  assert.match(w, /Contrast is/);
});

test('scanWarning: ignores invalid colors', () => {
  assert.equal(scanWarning('#12', '#ffffff'), null);
});

test('hex helpers', () => {
  assert.equal(normalizeHex('ABC'), '#aabbcc');
  assert.equal(normalizeHex('#123456'), '#123456');
  assert.equal(normalizeHex('#12345'), null);
  assert.equal(isHexColor('#fff'), true);
  assert.equal(isHexColor('red'), false);
});

test('capacity: version-40 byte capacity per level', () => {
  assert.equal(capacityHint('L').bytes, 2953);
  assert.equal(capacityHint('M').bytes, 2331);
  assert.equal(capacityHint('Q').bytes, 1663);
  assert.equal(capacityHint('H').bytes, 1273);
  assert.match(capacityHint('M').text, /2,331 bytes/);
});

test('utf8Length counts bytes, not characters', () => {
  assert.equal(utf8Length('abc'), 3);
  assert.equal(utf8Length('é'), 2);
  assert.equal(utf8Length('😀'), 4);
});
