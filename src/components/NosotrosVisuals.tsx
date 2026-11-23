// Figura decorativa (aria-hidden) de Nosotros: negocio, operación y tecnología se cruzan en un núcleo.
// Las etiquetas se pintan con CSS (data-label) y solo reutilizan palabras del encabezado de la sección.
export function IntersectionVenn() {
  return (
    <figure className="nx-venn" aria-hidden="true">
      <svg viewBox="0 0 360 330" focusable="false">
        <defs>
          <radialGradient id="nxv-core" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff8dc" /><stop offset=".45" stopColor="#FFD766" /><stop offset="1" stopColor="#E6A300" stopOpacity="0" /></radialGradient>
          <radialGradient id="nxv-a" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#2a7f9e" stopOpacity=".5" /><stop offset="1" stopColor="#1E4A74" stopOpacity=".12" /></radialGradient>
          <radialGradient id="nxv-b" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#4a78b3" stopOpacity=".5" /><stop offset="1" stopColor="#1E4A74" stopOpacity=".12" /></radialGradient>
          <radialGradient id="nxv-c" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#e6a300" stopOpacity=".32" /><stop offset="1" stopColor="#1E4A74" stopOpacity=".1" /></radialGradient>
        </defs>
        <g className="nx-v-orbit"><circle cx="180" cy="178" r="150" fill="none" stroke="#8cb9eb" strokeOpacity=".3" strokeDasharray="3 9" /><circle cx="180" cy="28" r="3.4" fill="#FFD766" /></g>
        <circle className="nx-v-c nx-v-c1" cx="180" cy="130" r="86" fill="url(#nxv-a)" stroke="#8cb9eb" strokeOpacity=".7" strokeWidth="1.4" />
        <circle className="nx-v-c nx-v-c2" cx="130" cy="216" r="86" fill="url(#nxv-b)" stroke="#8cb9eb" strokeOpacity=".7" strokeWidth="1.4" />
        <circle className="nx-v-c nx-v-c3" cx="230" cy="216" r="86" fill="url(#nxv-c)" stroke="#FFD766" strokeOpacity=".55" strokeWidth="1.4" />
        <circle className="nx-v-core" cx="180" cy="187" r="46" fill="url(#nxv-core)" />
        <circle cx="180" cy="187" r="9" fill="#fff8dc" />
      </svg>
      <span className="nx-v-l nx-v-l1" data-label="Negocio" />
      <span className="nx-v-l nx-v-l2" data-label="Operación" />
      <span className="nx-v-l nx-v-l3" data-label="Tecnología" />
    </figure>
  );
}
