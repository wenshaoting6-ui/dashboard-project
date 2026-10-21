import { filterWineData } from './filter.js';
import { updateWineLayer } from './wine-map.js';

function initForm(el, regions, onFilter = null) {
  const containEL = typeof el === 'string' ? document.getElementById(el) : el;
  if (!containEL) {
    throw new Error('A valid DOM element or selector must be provided for the form.');
  }

  const allregions = regions || [];

  // --- Helper: read all controls and apply filters ---
  function applyFilters() {
    // 2. Read checked type checkboxes
    const selectedTypes = Array.from(
      containEL.querySelectorAll('input[name="type"]:checked'),
    ).map((box) => box.value);

    // 3. Read checked food pairing checkboxes
    const selectedfood = Array.from(
      containEL.querySelectorAll('input[name="foodpair"]:checked'),
    ).map((box) => box.value);

    const flavorseleced = containEL.querySelector('#flavor-select');
    const selectedflavor = flavorseleced ? flavorseleced.value : '';

    // 4. Apply type + food pairing filters
    let filtered = filterWineData(allregions, selectedTypes, selectedfood, selectedflavor);

    // 6. Notify the caller (or update the map directly)
    if (onFilter) {
      onFilter(filtered);
    }
  }

  containEL.querySelectorAll('#flavor-select').forEach((a) => {
    a.addEventListener('change', applyFilters);
  });

  // Type checkboxes: filter on change
  containEL.querySelectorAll('input[name="type"]').forEach((a) => {
    a.addEventListener('change', applyFilters);
  });

  // Food pairing checkboxes: filter on change
  containEL.querySelectorAll('input[name="foodpair"]').forEach((a) => {
    a.addEventListener('change', applyFilters);
  });
}

export { initForm,
};
