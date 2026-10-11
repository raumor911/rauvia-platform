#!/bin/bash
SVG_FILE="public/media/aethryon-convergence-animated.svg"

# Remove the broken closing tags at the end
sed -i '/<!-- Right labels -->/,$d' "$SVG_FILE"

# Append the correct tags
cat << 'SVGEOF' >> "$SVG_FILE"
  <!-- Right labels -->
  <g class="font">
    <g transform="translate(1050 220)">
      <text x="0" y="0" font-size="34" font-weight="800" fill="#2563EB">05</text>
      <text x="70" y="0" font-size="22" font-weight="800" fill="#0F172A">RESULTADOS</text>
      <text x="70" y="34" font-size="20" fill="#334155">Impacto medible</text>
      <text x="70" y="62" font-size="20" fill="#334155">y escalable</text>

      <text x="0" y="155" font-size="34" font-weight="800" fill="#2563EB">04</text>
      <text x="70" y="155" font-size="22" font-weight="800" fill="#0F172A">OPERACIÓN</text>
      <text x="70" y="189" font-size="20" fill="#334155">Ejecución eficiente</text>
      <text x="70" y="217" font-size="20" fill="#334155">y automatizada</text>

      <text x="0" y="310" font-size="34" font-weight="800" fill="#2563EB">03</text>
      <text x="70" y="310" font-size="22" font-weight="800" fill="#0F172A">TECNOLOGÍA</text>
      <text x="70" y="344" font-size="20" fill="#334155">Plataformas, datos</text>
      <text x="70" y="372" font-size="20" fill="#334155">e integraciones</text>

      <text x="0" y="465" font-size="34" font-weight="800" fill="#2563EB">02</text>
      <text x="70" y="465" font-size="22" font-weight="800" fill="#0F172A">PROCESOS</text>
      <text x="70" y="499" font-size="20" fill="#334155">Estructura clara</text>
      <text x="70" y="527" font-size="20" fill="#334155">y repetible</text>

      <text x="0" y="620" font-size="34" font-weight="800" fill="#2563EB">01</text>
      <text x="70" y="620" font-size="22" font-weight="800" fill="#0F172A">ESTRATEGIA</text>
      <text x="70" y="654" font-size="20" fill="#334155">Claridad, foco</text>
      <text x="70" y="682" font-size="20" fill="#334155">y dirección</text>
    </g>
  </g>
</svg>
SVGEOF
