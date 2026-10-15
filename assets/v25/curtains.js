export const CURTAINS = [
  { id: 'noren-left', rect: [289, 315, 99, 142], pivot: [338, 316], phase: .4,
    path: 'M291 316 L386 316 L381 347 L380 408 L377 450 L356 453 L324 450 L291 452 Z' },
  { id: 'noren-center', rect: [380, 315, 124, 144], pivot: [442, 316], phase: 1.3,
    path: 'M386 316 L501 316 L498 350 L499 400 L496 451 L474 455 L442 452 L410 454 L382 451 L384 394 Z' },
  { id: 'noren-right', rect: [499, 315, 106, 143], pivot: [551, 316], phase: 2.6,
    path: 'M503 316 L603 316 L600 351 L600 402 L596 450 L566 453 L539 450 L501 453 L503 390 Z' }
];

export function createCurtains({ THREE, parent, prepared, texture }) {
  const panels = prepared.map(spec => {
    const [left, top, width, height] = spec.rect;
    const [anchorX, anchorY] = spec.pivot;
    const geometry = new THREE.PlaneGeometry(width, height, 16, 24);
    geometry.translate(left + width / 2 - anchorX, anchorY - top - height / 2, 0);
    const material = new THREE.MeshBasicMaterial({ map: texture(spec.texture), transparent: true,
      depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(anchorX, 1024 - anchorY, 12); mesh.renderOrder = 5;
    parent.add(mesh);
    return { spec, mesh, rest: new Float32Array(geometry.attributes.position.array) };
  });
  return {
    update(seconds) {
      for (const { spec, mesh, rest } of panels) {
        const positions = mesh.geometry.attributes.position;
        const gust = .65 + .35 * Math.sin(seconds * .31);
        for (let index = 0; index < positions.count; index++) {
          const offset = index * 3;
          const weight = Math.pow(Math.max(0, -rest[offset + 1]) / spec.rect[3], 1.7);
          const billow = Math.sin(seconds * 1.05 + spec.phase + rest[offset] * .021);
          positions.setXYZ(index, rest[offset] + weight * billow * gust * 7.5,
            rest[offset + 1] + weight * Math.sin(seconds * 1.3 + spec.phase + rest[offset] * .055) * 2.6,
            weight * billow * 10);
        }
        positions.needsUpdate = true;
        const brightness = 1 + .035 * Math.sin(seconds * 1.05 + spec.phase);
        mesh.material.color.setRGB(brightness, brightness, brightness);
      }
    },
    snapshot: () => ({ count: panels.length, topAnchored: true }),
    dispose() { for (const { mesh } of panels) { parent.remove(mesh); mesh.geometry.dispose(); mesh.material.dispose(); } }
  };
}
