/**
 * Texture Preloader Utility
 * 
 * Preloads all texture assets used by investigation tools to improve performance
 * and prevent loading delays during tool rendering.
 */

// All texture assets used by investigation tools
export const TEXTURE_ASSETS = {
  // Metal textures
  metalTexture: '/src/assets/texture/metalscratchedtexture.png',
  rust: '/src/assets/texture/brownrust.png',
  
  // Plastic textures
  smoothPlastic: '/src/assets/texture/smoothplastictexture.png',
  scratchedPlasticDark: '/src/assets/texture/scratchedplasticdark.png',
  
  // Glass/screen textures
  crtTexture: '/src/assets/texture/crtexture.png',
  dirtyGlass: '/src/assets/texture/dirtyglass.png',
  
  // General textures
  dust: '/src/assets/texture/dust.png',
  filmgrain: '/src/assets/texture/filmgrain.png',
  wrinkledPaper: '/src/assets/texture/wrinkledpaper.png',
  tape: '/src/assets/texture/tape.png',
} as const;

export type TextureAssetKey = keyof typeof TEXTURE_ASSETS;

interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  currentAsset: string;
}

interface PreloadResult {
  success: boolean;
  loadedTextures: Set<string>;
  failedTextures: string[];
  totalTime: number;
}

/**
 * Preload a single texture image
 */
function preloadTexture(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Removed log for cleaner console
      resolve(img);
    };
    
    img.onerror = () => {
      console.error(`❌ Failed to load texture: ${src}`);
      reject(new Error(`Failed to load texture: ${src}`));
    };
    
    img.src = src;
  });
}

/**
 * Preload all textures with progress tracking
 */
export async function preloadAllTextures(
  onProgress?: (progress: PreloadProgress) => void
): Promise<PreloadResult> {
  const startTime = performance.now();
  const textures = Object.entries(TEXTURE_ASSETS);
  const total = textures.length;
  const loadedTextures = new Set<string>();
  const failedTextures: string[] = [];
  
  console.log(`🎨 Starting texture preload: ${total} textures`);
  
  for (let i = 0; i < textures.length; i++) {
    const [key, src] = textures[i];
    
    // Report progress
    if (onProgress) {
      onProgress({
        loaded: i,
        total,
        percentage: Math.floor((i / total) * 100),
        currentAsset: key,
      });
    }
    
    try {
      await preloadTexture(src);
      loadedTextures.add(key);
    } catch (error) {
      console.error(`Failed to preload ${key}:`, error);
      failedTextures.push(key);
    }
  }
  
  // Final progress update
  if (onProgress) {
    onProgress({
      loaded: total,
      total,
      percentage: 100,
      currentAsset: 'complete',
    });
  }
  
  const totalTime = performance.now() - startTime;
  const success = failedTextures.length === 0;
  
  console.log(`🎨 Texture preload ${success ? 'complete' : 'finished with errors'}: ${loadedTextures.size}/${total} loaded in ${totalTime.toFixed(0)}ms`);
  
  if (failedTextures.length > 0) {
    console.warn(`⚠️ Failed textures:`, failedTextures);
  }
  
  return {
    success,
    loadedTextures,
    failedTextures,
    totalTime,
  };
}

/**
 * Check if textures are already cached in browser
 */
export function checkTextureCache(): Promise<boolean[]> {
  const textures = Object.values(TEXTURE_ASSETS);
  
  return Promise.all(
    textures.map(src => 
      fetch(src, { method: 'HEAD' })
        .then(response => response.ok)
        .catch(() => false)
    )
  );
}

/**
 * Get estimated cache size for all textures
 */
export async function estimateCacheSize(): Promise<number> {
  const textures = Object.values(TEXTURE_ASSETS);
  let totalSize = 0;
  
  for (const src of textures) {
    try {
      const response = await fetch(src, { method: 'HEAD' });
      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        totalSize += parseInt(contentLength, 10);
      }
    } catch (error) {
      console.warn(`Could not estimate size for ${src}`);
    }
  }
  
  return totalSize;
}
