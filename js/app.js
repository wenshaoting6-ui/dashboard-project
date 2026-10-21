import { initFranceWineMap, loadwinelayer, updateWineLayer } from './wine-map.js';

// 1. Create the Leaflet map (only once)
const map = initFranceWineMap('map');

// 2. Load the GeoJSON data and add it to the map
loadwinelayer(map).then((layer) => {
  window.winelayer = layer;
  import('./ui.js').then((uiModule) => {
    if (uiModule.initForm) {
      uiModule.initForm(
        'filter-panel',
        window.allWineData?.features || [],
        (filtered) => {
          updateWineLayer(window.winelayer, filtered);
        },
      );
    }
  });
});
