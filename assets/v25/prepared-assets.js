export async function loadPreparedAssets() {
  const image=async name=>{
    const source=new Image();source.decoding='async';
    source.src=new URL(name,import.meta.url).href;await source.decode();return source;
  };
  const [clean,atlas,manifest]=await Promise.all([
    image('./scene-base-v8.webp'),image('./scene-props-v8.webp'),
    fetch(new URL('./scene-props-v8.json',import.meta.url)).then(response=>{
      if(!response.ok)throw new Error('Scene manifest unavailable');return response.json();
    })
  ]);
  const result={clean,catRemoved:true};
  for(const group of ['lanterns','flames','foliage','curtains'])result[group]=manifest[group].map(spec=>{
    const texture=document.createElement('canvas');texture.width=spec.rect[2];texture.height=spec.rect[3];
    texture.getContext('2d').drawImage(atlas,...spec.packed,0,0,texture.width,texture.height);
    return {...spec,texture};
  });
  return result;
}
