### ~Three.js start template
**Start Shader project** - shader.js move to main.js

**GLTF Compressor** -  https://github.com/CesiumGS/gltf-pipeline
```javascript
save save textures and position
gltf-pipeline -i model.gltf -t
gltf-pipeline -i woman.gltf -o model.glb --draco.compressionLevel=10
```
