import { json } from "@assetpack/core/dist/json";
import { texturePackerCacheBuster } from "@assetpack/core/dist/texture-packer";
import { cacheBuster } from "@assetpack/core/dist/cache-buster";
import { spineAtlasCacheBuster } from "@assetpack/core/dist/spine";
import { pixiManifest } from "@assetpack/core/dist/manifest";
import { webfont } from "@assetpack/core/dist/webfont";

interface AssetPackConfig {
    entry: string;
    output: string;
    pipes: any[];
}

const assetPackConfig: AssetPackConfig = {
    entry: "./assets",
    output: "./assetsPack",
    pipes: [
        json(),
        webfont(),
        cacheBuster(),
        texturePackerCacheBuster(),
        spineAtlasCacheBuster(),
        pixiManifest({
            output: "manifest.json",
            createShortcuts: true,
            trimExtensions: true,
            includeMetaData: false
        })
    ]
};

export default assetPackConfig;
