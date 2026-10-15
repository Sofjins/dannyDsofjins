export const CAT_GROUND = 778;
export const CAT_BOX_TOP = 707;
export const CAT_BOWL_X = 745;
export const CAT_CRATE_X = 1268;

const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const progress = clamp(value); return progress * progress * (3 - 2 * progress); };
const mix = (start, end, progress) => start + (end - start) * progress;

export function createCatBehavior(seed = 97402971) {
  let randomState = seed >>> 0, clock = 0, position = CAT_BOWL_X, surface = CAT_GROUND, direction = 1, sitting = true;
  const events = [];
  const random = () => { randomState = Math.imul(randomState, 1664525) + 1013904223 >>> 0; return randomState / 4294967296; };
  const range = (minimum, maximum) => mix(minimum, maximum, random());
  function add(mode, duration, extra = {}) {
    const event = { mode, start: clock, duration, fromX: position, toX: position,
      fromY: surface, toY: surface, facing: direction, nextFacing: direction, rate: range(.83, 1.07), ...extra };
    events.push(event); clock += duration;
    position = event.toX; surface = event.toY; direction = event.nextFacing;
  }
  function stand() { if (sitting) { add('stand', 1.5); sitting = false; } }
  function turn(next) { if (direction !== next) add('turn', range(1.2, 1.8), { nextFacing: next }); }
  function walk(target) {
    stand(); turn(target > position ? 1 : -1);
    if (Math.abs(target - position) > 5) add('walk', Math.abs(target - position) / range(34, 43), { toX: target });
  }
  function rest(duration) { add('sit-down', 1.5); sitting = true; add(surface === CAT_BOX_TOP ? 'perch' : 'sit', duration); }
  function visit(destination) {
    if (destination === 'crate') {
      walk(1167); add('look', range(1.8, 4.2));
      add('crouch', .65); add('jump', .72, { toX: CAT_CRATE_X, toY: CAT_BOX_TOP });
      add('land', .55); rest(range(22, 46));
    } else if (destination === 'bowl') {
      walk(CAT_BOWL_X); turn(1); add('drink', range(9, 19)); rest(range(10, 25));
    } else {
      walk(destination === 'left' ? range(340, 555) : range(890, 1110));
      add('look', range(2.5, 7)); rest(range(14, 39));
    }
  }
  add('sit', range(10, 22));
  stand(); add('drink', range(8, 15));
  visit('left');
  visit('crate');
  function extend(seconds) {
    while (clock < seconds + 120) {
      if (surface === CAT_BOX_TOP) {
        stand(); turn(-1); add('crouch', .5);
        add('jump-down', .66, { toX: 1154, toY: CAT_GROUND });
        add('land', .55);
      }
      const choice = random();
      visit(choice < .28 ? 'bowl' : choice < .54 ? 'left' : choice < .78 ? 'right' : 'crate');
    }
  }
  function poseAt(seconds, greetingAt = -100) {
    const time = Math.max(0, seconds); extend(time);
    const event = events.find(event => time >= event.start && time < event.start + event.duration);
    const progress = clamp((time - event.start) / event.duration);
    const local = time - event.start;
    const pose = { mode: event.mode, x: event.fromX, screenY: event.fromY, surfaceY: event.fromY,
      facing: event.facing, clip: 'Idle', clipTime: local * event.rate % 2,
      blend: 1, previousClip: null, previousTime: 0, progress, greeting: 0,
      jump: 0, crouch: 0, pitch: 0, drink: 0, frontContact: false, rearContact: false };
    if (event.mode === 'sit' || event.mode === 'perch') pose.clip = 'SittingIdle';
    if (event.mode === 'stand' || event.mode === 'sit-down') {
      pose.clip = event.mode === 'stand' ? 'StandUp' : 'SitDown'; pose.clipTime = local;
    }
    if (event.mode === 'turn') {
      pose.facing = mix(event.facing, event.nextFacing, ease(progress));
      pose.clip = 'WalkClean'; pose.clipTime = local * .45 % (4 / 3);
    }
    if (event.mode === 'walk') {
      const ramp = Math.min(.08, .35 / event.duration);
      const travelled = progress < ramp ? progress * progress / (2 * ramp) :
        progress > 1 - ramp ? 1 - ramp - (1 - progress) ** 2 / (2 * ramp) : progress - ramp / 2;
      const fraction = travelled / (1 - ramp);
      pose.x = mix(event.fromX, event.toX, fraction);
      pose.clip = 'WalkClean'; pose.clipTime = Math.abs(pose.x - event.fromX) / 45 * (4 / 3) % (4 / 3);
      pose.blend = Math.min(ease(local / .25), ease((event.duration - local) / .25));
      pose.previousClip = 'Idle';
    }
    if (event.mode === 'drink') {
      pose.drink = ease(local / 1.4) * ease((event.duration - local) / 1.5);
    }
    if (event.mode === 'crouch') {
      pose.clip = 'SitDown'; pose.clipTime = .65 * ease(progress); pose.crouch = ease(progress);
    }
    if (event.mode === 'jump' || event.mode === 'jump-down') {
      const rise = event.fromY - event.toY;
      const arc = event.mode === 'jump' ? 42 : 43;
      pose.x = mix(event.fromX, event.toX, progress);
      pose.screenY = event.fromY - rise * progress - arc * 4 * progress * (1 - progress);
      pose.surfaceY = pose.x >= 1228 ? CAT_BOX_TOP : CAT_GROUND;
      pose.clipTime = 0; pose.jump = Math.sin(progress * Math.PI);
      pose.pitch = event.mode === 'jump' ? .27 * Math.sin(progress * Math.PI * 2) : -.12 * Math.sin(progress * Math.PI);
      pose.blend = ease(local / .15); pose.previousClip = 'SitDown'; pose.previousTime = .65;
      pose.frontContact = progress > .94;
    }
    if (event.mode === 'land') {
      pose.clip = 'SitDown'; pose.clipTime = .48 * Math.sin(progress * Math.PI);
      pose.frontContact = true; pose.rearContact = progress > .28;
      pose.crouch = Math.sin(progress * Math.PI);
      pose.pitch = -.10 * Math.sin(progress * Math.PI);
    }
    const greetingTime = time - greetingAt;
    if (greetingTime >= 0 && greetingTime < 2.4 && !event.mode.includes('jump')) pose.greeting = Math.sin(greetingTime / 2.4 * Math.PI);
    return pose;
  }
  extend(0);
  return { poseAt, plan: () => events.map(event => ({ ...event })), seed };
}

const defaultBehavior = createCatBehavior();
export const catPose = (seconds, greetingAt) => defaultBehavior.poseAt(seconds, greetingAt);
