import * as THREE from './three.js';
import {box,sphere,cylinder,tube,mat,point,rnd} from './primitives.js';

// Real articulated stylized 3D cat — no billboards or sprite sheets.
export function createCat(scene){
  const root=new THREE.Group();root.position.set(.0,.0,3.7);scene.add(root);
  const dark=mat('#090c13',.91),coat=mat('#151a24',.94),nose=mat('#93686b',.95),eye=mat('#d3b95f',.54);
  const torso=sphere(root,.37,0,.52,0,coat,14);torso.scale.set(1.45,.79,.67);
  const chest=sphere(root,.27,.40,.49,0,dark,12);chest.scale.set(.75,1,.68);
  const head=new THREE.Group();head.position.set(.57,.81,0);root.add(head);
  const face=sphere(head,.27,0,0,0,coat,12);face.scale.set(.87,.84,.83);
  for(const d of [-1,1]){
    const ear=new THREE.Mesh(new THREE.ConeGeometry(.12,.26,3),coat);ear.position.set(-.09,.22,d*.17);ear.rotation.z=-.24;head.add(ear);
    sphere(head,.046,.20,.035,d*.125,eye,8);
    sphere(head,.018,.237,.034,d*.132,mat('#111313',.4),7);
    tube(head,[[.24,-.08,d*.1],[.31,-.08,d*.12]],.008,mat('#a7a4a0',1));
  }
  sphere(head,.04,.24,-.075,0,nose,7);
  const legs=[];
  for(const x of [-.35,.31])for(const z of [-.17,.17]){
    const leg=new THREE.Group();leg.position.set(x,.35,z);root.add(leg);
    const upper=cylinder(leg,.081,.065,.32,0,-.12,0,dark,8);
    sphere(leg,.092,.0,-.30,.045,coat,9);legs.push(leg);
  }
  const tail=new THREE.Group();tail.position.set(-.50,.51,0);root.add(tail);
  tube(tail,[[0,0,0],[-.20,.22,0],[-.30,.55,.02],[-.49,.69,.03]],.077,coat);
  const bowl=new THREE.Group();scene.add(bowl);bowl.position.set(.55,.13,3.95);
  const dish=cylinder(bowl,.29,.19,.17,0,0,0,mat('#535866',.47,.48),18);
  cylinder(bowl,.242,.242,.016,0,.092,0,mat('#899aa9',.18,.38),18);
  const state={mode:'walk',target:0,heading:1,time:0,petUntil:0,start:0};
  const sequence=[{mode:'walk',to:-1.65,duration:4},{mode:'sit',duration:3.1},{mode:'groom',duration:3.3},{mode:'walk',to:.42,duration:3.9},{mode:'drink',duration:3.4},{mode:'look',duration:2.2},{mode:'walk',to:1.55,duration:3.2},{mode:'sit',duration:4.5},{mode:'walk',to:-.02,duration:3.7}];
  let step=0,modeStart=0,fromX=0,targetX=0;
  const next=(t)=>{const action=sequence[step%sequence.length];step++;state.mode=action.mode;state.start=t;state.time=action.duration;fromX=root.position.x;targetX=action.to??fromX;state.heading=Math.sign(targetX-fromX)||state.heading;};
  next(0);
  function update(t,dt,mobile=false){
    if(t-state.start>state.time)next(t);
    const elapsed=t-state.start;const a=THREE.MathUtils.clamp(elapsed/Math.max(.01,state.time),0,1);
    const active=state.mode==='walk';const pet=t<state.petUntil;
    if(active){root.position.x=THREE.MathUtils.lerp(fromX,targetX,a);root.rotation.y=state.heading===1?0:Math.PI;}
    else if(state.mode==='drink'){root.rotation.y=0;}
    root.position.y=active?Math.abs(Math.sin(t*12))*.025:0;
    head.rotation.z=state.mode==='drink'?-.38+Math.sin(t*5)*.08:state.mode==='groom'?-.14+Math.sin(t*8)*.2:pet?.13:Math.sin(t*1.4)*.04;
    head.rotation.y=pet?-.25:Math.sin(t*.52)*.08;
    torso.scale.y= .79+Math.sin(t*2.2)*.011;
    for(let i=0;i<legs.length;i++)legs[i].rotation.z=active?Math.sin(t*12+i*1.9)*.37:0;
    tail.rotation.z=Math.sin(t*1.85)*.13+(pet?.2:0);
    if(state.mode==='sit'||state.mode==='groom')torso.position.y=.43;else torso.position.y=.52;
    return root.position;
  }
  function pet(t){state.petUntil=t+2.0;}
  return {root,head,update,pet};
}
