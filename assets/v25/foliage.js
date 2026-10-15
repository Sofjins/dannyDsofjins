export const FOLIAGE = [
  { id: 'hanging-ivy', rect: [558, 0, 138, 152], pivot: [590, 0], anchor: 'top', amplitude: 2.6, phase: .7,
    path: 'M559 0 L668 0 L682 18 L676 37 L692 53 L680 72 L695 91 L679 107 L686 129 L666 151 L654 127 L647 102 L620 89 L610 65 L580 58 L564 37 Z' },
  { id: 'magic-maple', rect: [554, 448, 160, 150], pivot: [636, 595], amplitude: 2.4, phase: 2.3,
    path: 'M639 596 L616 571 L587 565 L576 547 L554 542 L569 523 L557 504 L579 488 L576 467 L603 474 L618 450 L641 466 L657 450 L679 474 L708 472 L696 497 L714 519 L691 539 L701 559 L665 570 Z' },
  { id: 'bowl-plant', rect: [722, 553, 137, 140], pivot: [783, 691], amplitude: 2.1, phase: 4.7,
    path: 'M780 691 L757 670 L738 671 L735 650 L722 632 L740 614 L727 602 L748 587 L764 591 L769 562 L792 553 L803 578 L827 574 L824 603 L850 600 L859 628 L838 644 L841 663 L816 667 L809 690 Z' },
  { id: 'left-fern', rect: [1, 424, 153, 192], pivot: [65, 614], amplitude: 2.3, phase: 6.8,
    path: 'M61 615 L29 591 L4 586 L0 551 L21 542 L0 518 L5 475 L28 482 L18 456 L41 441 L61 449 L74 426 L102 434 L110 454 L136 451 L153 477 L136 488 L145 515 L117 529 L125 554 L95 562 L88 593 Z' },
  { id: 'hub-vine', rect: [1385, 384, 110, 176], pivot: [1455, 552], amplitude: 2, phase: 9.4,
    path: 'M1455 553 L1428 538 L1435 514 L1408 512 L1418 492 L1388 478 L1399 457 L1385 440 L1411 427 L1400 409 L1426 400 L1450 384 L1464 405 L1490 410 L1480 439 L1495 461 L1474 477 L1485 506 L1465 523 Z' }
];

export function createFoliage({ THREE, parent, prepared, texture }) {
  const resources = [];
  const leaves = prepared.map(spec => {
    const [left, top, width, height] = spec.rect;
    const [anchorX, anchorY] = spec.pivot;
    const geometry = new THREE.PlaneGeometry(width, height, 8, 12);
    geometry.translate(left + width / 2 - anchorX, anchorY - top - height / 2, 0);
    const original = new Float32Array(geometry.attributes.position.array);
    const material = new THREE.MeshBasicMaterial({ map: texture(spec.texture), transparent: true,
      depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(anchorX, 1024 - anchorY, 9); mesh.renderOrder = 4; parent.add(mesh);
    resources.push(geometry, material);
    return { spec, mesh, original };
  });
  function update(seconds) {
    for (const leaf of leaves) {
      const { spec, original, mesh } = leaf;
      const positions = mesh.geometry.attributes.position;
      const height = spec.rect[3];
      for (let index = 0; index < positions.count; index++) {
        const offset = index * 3;
        const distance = Math.min(1, Math.abs(original[offset + 1]) / height);
        const weight = distance * distance;
        const breeze = Math.sin(seconds * .84 + spec.phase) * .68 + Math.sin(seconds * 1.71 + spec.phase + original[offset] * .032) * .32;
        positions.setXYZ(index, original[offset] + breeze * spec.amplitude * weight,
          original[offset + 1] + Math.sin(seconds * 1.13 + spec.phase + original[offset] * .04) * weight * .6,
          Math.sin(seconds * .77 + spec.phase) * weight * 1.8);
      }
      positions.needsUpdate = true;
    }
  }
  return {
    update,
    snapshot: () => ({ count: leaves.length, anchored: true, maxDisplacement: 2.6 }),
    dispose: () => { leaves.forEach(leaf => parent.remove(leaf.mesh)); resources.forEach(resource => resource.dispose()); }
  };
}
