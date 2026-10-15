const ATLAS_RECTS = {
  'hanging-ivy': [553, 0, 150, 155],
  'magic-maple': [548, 398, 193, 226],
  'bowl-plant': [721, 556, 169, 158],
  'left-fern': [0, 395, 210, 190],
  'hub-vine': [1365, 367, 159, 318],
  'left-low-fern': [0, 575, 150, 110],
  'doorway-fern': [210, 613, 146, 120],
  'lantern-pot': [575, 593, 143, 111],
  'foreground-garden': [0, 850, 390, 174]
};

export const FOLIAGE = [
  { id: 'hanging-ivy', rect: [558, 0, 138, 152], pivot: [590, 0], anchor: 'top', amplitude: 5.8, phase: .7,
    path: 'M559 0 L668 0 L682 18 L676 37 L692 53 L680 72 L695 91 L679 107 L686 129 L666 151 L654 127 L647 102 L620 89 L610 65 L580 58 L564 37 Z' },
  { id: 'magic-maple', rect: [550, 440, 170, 179], pivot: [636, 617], amplitude: 7.4, phase: 2.3, feather: 1.2,
    path: 'M639 596 L616 571 L587 565 L576 547 L554 542 L569 523 L557 504 L579 488 L576 467 L603 474 L618 450 L641 466 L657 450 L679 474 L708 472 L696 497 L714 519 L691 539 L701 559 L665 570 Z' },
  { id: 'bowl-plant', rect: [720, 548, 143, 149], pivot: [783, 691], amplitude: 6.8, phase: 4.7, feather: 1,
    path: 'M780 691 L757 670 L738 671 L735 650 L722 632 L740 614 L727 602 L748 587 L764 591 L769 562 L792 553 L803 578 L827 574 L824 603 L850 600 L859 628 L838 644 L841 663 L816 667 L809 690 Z' },
  { id: 'left-fern', rect: [0, 418, 182, 204], pivot: [76, 620], amplitude: 7.8, phase: 6.8, feather: 1.1,
    path: 'M75 620 L45 600 L21 591 L2 580 L0 550 L21 542 L0 518 L5 475 L28 482 L18 456 L41 433 L61 441 L74 422 L102 427 L110 446 L136 442 L153 459 L176 465 L169 479 L147 479 L136 488 L159 508 L145 523 L125 519 L125 544 L105 562 L98 594 Z' },
  { id: 'hub-vine', rect: [1385, 384, 110, 176], pivot: [1455, 552], amplitude: 7.2, phase: 9.4, feather: 1,
    path: 'M1455 553 L1428 538 L1435 514 L1408 512 L1418 492 L1388 478 L1399 457 L1385 440 L1411 427 L1400 409 L1426 400 L1450 384 L1464 405 L1490 410 L1480 439 L1495 461 L1474 477 L1485 506 L1465 523 Z' },
  { id: 'left-low-fern', rect: [0, 592, 117, 80], pivot: [59, 669], amplitude: 6.2, phase: 1.9, feather: 1,
    path: 'M58 669 L33 651 L3 656 L1 632 L17 617 L5 607 L30 600 L47 612 L63 594 L81 609 L107 602 L116 626 L97 633 L104 650 L78 653 Z' },
  { id: 'doorway-fern', rect: [251, 643, 95, 80], pivot: [286, 721], amplitude: 5.8, phase: 3.7, feather: 1,
    path: 'M284 721 L263 702 L252 687 L263 674 L251 660 L269 654 L281 670 L292 646 L306 661 L334 653 L344 675 L324 682 L338 698 L308 694 L300 718 Z' },
  { id: 'lantern-pot', rect: [588, 600, 93, 99], pivot: [633, 697], amplitude: 6.6, phase: 5.1, feather: 1,
    path: 'M634 697 L615 685 L599 687 L604 672 L590 663 L604 647 L593 635 L614 628 L620 610 L634 626 L650 602 L661 620 L679 632 L665 649 L679 663 L655 671 L652 688 Z' },
  { id: 'foreground-garden', rect: [70, 835, 270, 189], pivot: [166, 1023], amplitude: 3.8, phase: 7.2, feather: 12,
    path: 'M76 1023 C79 985 75 947 87 917 C78 886 94 854 111 857 C125 846 143 865 151 881 C170 871 181 887 188 904 C204 887 222 901 230 923 C254 907 277 923 282 943 C310 937 328 960 332 985 L331 1023 Z' }
].map(spec => ({ ...spec, atlasRect: ATLAS_RECTS[spec.id] }));

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
    if (spec.isolated) material.color.setRGB(.68, .72, .76);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(anchorX, 1024 - anchorY, spec.id === 'foreground-garden' ? 210 : 9);
    mesh.renderOrder = spec.id === 'foreground-garden' ? 18 : 4; parent.add(mesh);
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
        const weight = Math.pow(distance, 1.35);
        const gust = .65 + .35 * Math.sin(seconds * .19 + spec.phase * .3);
        const breeze = gust * (Math.sin(seconds * .71 + spec.phase) * .68 + Math.sin(seconds * 1.43 + spec.phase + original[offset] * .032) * .32);
        positions.setXYZ(index, original[offset] + breeze * spec.amplitude * weight,
          original[offset + 1] + Math.sin(seconds * 1.13 + spec.phase + original[offset] * .04) * weight * 1.5,
          Math.sin(seconds * .77 + spec.phase) * weight * 1.8);
      }
      positions.needsUpdate = true;
    }
  }
  return {
    update,
    setPortrait(value) { const foreground=leaves.find(leaf=>leaf.spec.id==='foreground-garden'); if(foreground)foreground.mesh.visible=!value; },
    snapshot: () => ({ count: leaves.length, anchored: true, maxDisplacement: 7.8,
      isolatedAlpha: leaves.every(leaf => leaf.spec.isolated), alphaOccupancy: leaves.map(leaf => [leaf.spec.id, leaf.spec.alphaOccupancy]),
      objects: leaves.map(leaf => leaf.spec.id) }),
    dispose: () => { leaves.forEach(leaf => parent.remove(leaf.mesh)); resources.forEach(resource => resource.dispose()); }
  };
}
