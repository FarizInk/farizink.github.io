// Fariz's local time for the Home "Based in" tile. Pure; no relative imports.

export const HOME_TZ = 'Asia/Jakarta';

export interface ZonedTime {
  hour: number;
  minute: number;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  /** Offset from UTC in minutes (WIB = 420). */
  offset: number;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function zonedTime(now: Date, timeZone = HOME_TZ): ZonedTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short'
  }).formatToParts(now);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  const num = (type: string) => Number(get(type));

  const wallAsUtc = Date.UTC(num('year'), num('month') - 1, num('day'), num('hour'), num('minute'));
  const nowMinute = Math.floor(now.getTime() / 60_000) * 60_000;
  return {
    hour: num('hour'),
    minute: num('minute'),
    weekday: WEEKDAYS.indexOf(get('weekday')),
    offset: Math.round((wallAsUtc - nowMinute) / 60_000)
  };
}

export function clock(t: Pick<ZonedTime, 'hour' | 'minute'>): string {
  return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}`;
}

/** A guess, phrased as one — never presented as a live presence signal. */
export function status(t: Pick<ZonedTime, 'hour' | 'weekday'>): string {
  if (t.hour >= 23 || t.hour < 6) return 'Probably asleep';
  const weekday = t.weekday >= 1 && t.weekday <= 5;
  if (weekday && t.hour >= 9 && t.hour < 17) return 'Probably at work';
  return 'Probably around';
}

/**
 * How far the home zone is from the viewer.
 * @param viewerOffset viewer's UTC offset in minutes (i.e. `-new Date().getTimezoneOffset()`).
 */
export function offsetFromViewer(homeOffset: number, viewerOffset: number): string {
  const diff = homeOffset - viewerOffset;
  if (diff === 0) return 'Same time as you';
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const span = [h ? `${h}h` : '', m ? `${m}m` : ''].filter(Boolean).join(' ');
  return `${span} ${diff > 0 ? 'ahead of' : 'behind'} you`;
}
