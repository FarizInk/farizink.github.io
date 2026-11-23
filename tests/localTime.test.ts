import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zonedTime, clock, status, offsetFromViewer } from '../src/lib/localTime.ts';

test('zonedTime: converts to WIB (UTC+7)', () => {
  // Mon 2026-11-23 02:44 UTC → 09:44 WIB, same Monday
  const t = zonedTime(new Date('2026-11-23T02:44:30Z'));
  assert.deepEqual(t, { hour: 9, minute: 44, weekday: 1, offset: 420 });
});

test('zonedTime: crosses midnight into the next weekday', () => {
  // Sun 2026-11-22 18:05 UTC → Mon 01:05 WIB
  const t = zonedTime(new Date('2026-11-22T18:05:00Z'));
  assert.equal(t.hour, 1);
  assert.equal(t.weekday, 1);
});

test('zonedTime: hour is 0, never 24, at midnight', () => {
  assert.equal(zonedTime(new Date('2026-11-22T17:00:00Z')).hour, 0);
});

test('zonedTime: reads offsets of other zones, including half hours', () => {
  assert.equal(zonedTime(new Date('2026-11-23T00:00:00Z'), 'Asia/Kolkata').offset, 330);
  assert.equal(zonedTime(new Date('2026-11-23T00:00:00Z'), 'UTC').offset, 0);
});

test('clock: zero-pads', () => {
  assert.equal(clock({ hour: 7, minute: 5 }), '07:05');
  assert.equal(clock({ hour: 23, minute: 59 }), '23:59');
});

test('status: asleep at night, at work on weekday office hours, around otherwise', () => {
  assert.equal(status({ hour: 2, weekday: 3 }), 'Probably asleep');
  assert.equal(status({ hour: 23, weekday: 6 }), 'Probably asleep');
  assert.equal(status({ hour: 10, weekday: 1 }), 'Probably at work');
  assert.equal(status({ hour: 16, weekday: 5 }), 'Probably at work');
  assert.equal(status({ hour: 17, weekday: 5 }), 'Probably around');
  assert.equal(status({ hour: 10, weekday: 0 }), 'Probably around');
  assert.equal(status({ hour: 10, weekday: 6 }), 'Probably around');
});

test('offsetFromViewer: same, ahead, behind, half hours', () => {
  assert.equal(offsetFromViewer(420, 420), 'Same time as you');
  assert.equal(offsetFromViewer(420, 0), '7h ahead of you');
  assert.equal(offsetFromViewer(420, 540), '2h behind you');
  assert.equal(offsetFromViewer(420, 330), '1h 30m ahead of you');
  assert.equal(offsetFromViewer(420, 450), '30m behind you');
});
