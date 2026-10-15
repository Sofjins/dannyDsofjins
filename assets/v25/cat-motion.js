export const CAT_CYCLE = 36;
export const CAT_GROUND = 778;
export const CAT_BOX_TOP = 707;

const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const progress = clamp(value); return progress * progress * (3 - 2 * progress); };
const mix = (start, end, progress) => start + (end - start) * progress;

export function solveLeg(targetX, targetY, bend = 1) {
  const upperLength = 23, lowerLength = 17;
  const distance = Math.min(39.99, Math.max(6.01, Math.hypot(targetX, targetY)));
  const direction = Math.atan2(targetX, -targetY);
  const shoulder = Math.acos(Math.max(-1, Math.min(1,
    (distance * distance + upperLength * upperLength - lowerLength * lowerLength) / (2 * distance * upperLength))));
  const knee = Math.PI - Math.acos(Math.max(-1, Math.min(1,
    (upperLength * upperLength + lowerLength * lowerLength - distance * distance) / (2 * upperLength * lowerLength))));
  return { upper: direction - bend * shoulder, lower: bend * knee };
}

export function catPose(seconds, greetingAt = -100) {
  const time = ((seconds % CAT_CYCLE) + CAT_CYCLE) % CAT_CYCLE;
  const pose = { mode: 'drink', x: 724, ground: CAT_GROUND, height: 0,
    facing: 1, walk: 0, gait: 0, crouch: 0, pitch: 0, sit: 0, head: -.25, greeting: 0 };
  if (time < 3) {
    pose.head = -.26 + Math.sin(time * 8) * .045;
  } else if (time < 12) {
    const progress = (time - 3) / 9;
    pose.mode = 'walk'; pose.x = mix(724, 1164, progress);
    pose.walk = Math.min(1, progress * 14, (1 - progress) * 14);
    pose.gait = (pose.x - 724) / 54 * Math.PI * 2; pose.head = -.035;
  } else if (time < 12.7) {
    pose.mode = 'crouch'; pose.x = 1164; pose.crouch = ease((time - 12) / .7);
    pose.head = .14;
  } else if (time < 13.6) {
    const progress = (time - 12.7) / .9;
    pose.mode = 'jump'; pose.x = mix(1164, 1268, progress);
    pose.height = mix(0, CAT_GROUND - CAT_BOX_TOP, progress) + 51 * 4 * progress * (1 - progress);
    pose.pitch = .23 * Math.cos(progress * Math.PI);
    pose.crouch = .38 * Math.sin(progress * Math.PI); pose.head = .1;
  } else if (time < 14.25) {
    const progress = (time - 13.6) / .65;
    pose.mode = 'land'; pose.x = 1268; pose.height = CAT_GROUND - CAT_BOX_TOP;
    pose.crouch = Math.sin(progress * Math.PI) * .62; pose.head = .05;
  } else if (time < 21) {
    pose.mode = 'perch'; pose.x = 1268; pose.height = CAT_GROUND - CAT_BOX_TOP;
    pose.sit = ease((time - 14.25) / .8) * (1 - ease((time - 20.2) / .8));
    pose.facing = 1 - ease((time - 19.2) / .9) * 2;
    pose.head = .07 + Math.sin(time * .75) * .07;
  } else if (time < 21.8) {
    const progress = (time - 21) / .8;
    pose.mode = 'jump-down'; pose.x = mix(1268, 1154, progress); pose.facing = -1;
    pose.height = (CAT_GROUND - CAT_BOX_TOP) * (1 - progress) + 19 * Math.sin(progress * Math.PI);
    pose.pitch = -.17; pose.crouch = .25 * Math.sin(progress * Math.PI);
  } else if (time < 22.4) {
    pose.mode = 'land'; pose.x = 1154; pose.facing = -1;
    pose.crouch = .5 * Math.sin((time - 21.8) / .6 * Math.PI); pose.head = -.07;
  } else if (time < 31.4) {
    const progress = (time - 22.4) / 9;
    pose.mode = 'walk'; pose.x = mix(1154, 724, progress); pose.facing = -1;
    pose.walk = Math.min(1, progress * 14, (1 - progress) * 14);
    pose.gait = (1154 - pose.x) / 54 * Math.PI * 2; pose.head = -.035;
  } else {
    pose.mode = 'look'; pose.facing = -1 + 2 * ease((time - 32) / 1.3);
    pose.head = mix(.03, -.25, ease((time - 34) / 2));
  }
  const greetingTime = seconds - greetingAt;
  if (greetingTime >= 0 && greetingTime < 2.4 && !pose.mode.includes('jump')) {
    pose.greeting = Math.sin(greetingTime / 2.4 * Math.PI);
    pose.head += pose.greeting * .12;
  }
  pose.screenY = pose.ground - pose.height;
  return pose;
}
