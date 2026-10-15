import test from 'node:test';
import assert from 'node:assert/strict';
import { catPose, solveLeg, CAT_BOX_TOP, CAT_CYCLE, CAT_GROUND } from '../assets/v25/cat-motion.js';

test('the cat walks from its bowl, lands on the actual crate, and returns', () => {
  assert.equal(catPose(0).x, 724);
  assert.equal(catPose(8).mode, 'walk');
  assert.ok(catPose(8).x > catPose(4).x);
  assert.equal(catPose(13).mode, 'jump');
  assert.ok(catPose(13.3).screenY < CAT_BOX_TOP);
  assert.equal(catPose(16).screenY, CAT_BOX_TOP);
  assert.equal(catPose(16).mode, 'perch');
  assert.equal(catPose(23).screenY, CAT_GROUND);
  assert.ok(catPose(29).x < catPose(25).x);
  assert.equal(catPose(CAT_CYCLE).x, catPose(0).x);
});

test('no teleportation, ground penetration, or invalid poses across the loop', () => {
  let previous = catPose(0);
  for (let frame = 1; frame <= CAT_CYCLE * 120; frame++) {
    const pose = catPose(frame / 120);
    assert.ok(Math.abs(pose.x - previous.x) < 2, `horizontal discontinuity at ${frame / 120}`);
    assert.ok(Math.abs(pose.height - previous.height) < 3, `vertical discontinuity at ${frame / 120}`);
    assert.ok(pose.height >= 0 && pose.height < 130);
    assert.ok(pose.x >= 724 && pose.x <= 1268);
    assert.ok(Object.values(pose).every(value => typeof value !== 'number' || Number.isFinite(value)));
    previous = pose;
  }
});

test('greeting animates the head without interrupting or teleporting the cat', () => {
  const original = catPose(7);
  const greeted = catPose(7, 6);
  assert.equal(greeted.x, original.x);
  assert.equal(greeted.height, original.height);
  assert.equal(greeted.gait, original.gait);
  assert.ok(greeted.greeting > 0);
  assert.ok(greeted.head > original.head);
  assert.equal(catPose(10, 6).greeting, 0);
  assert.equal(catPose(13, 12.8).greeting, 0);
});

test('jointed paws remain planted through a complete stance', () => {
  for (const bend of [-1, 1]) for (const horizontal of [-16.2, -8, 0, 8, 16.2]) {
    const angles = solveLeg(horizontal, -36.5, bend);
    const footX = Math.sin(angles.upper) * 23 + Math.sin(angles.upper + angles.lower) * 17;
    const footY = -Math.cos(angles.upper) * 23 - Math.cos(angles.upper + angles.lower) * 17;
    assert.ok(Math.abs(footX - horizontal) < .02);
    assert.ok(Math.abs(footY + 36.5) < .02);
  }
});
