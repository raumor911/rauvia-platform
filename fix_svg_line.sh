#!/bin/bash
SVG_FILE="public/media/rauvia-methodology-interactive.svg"

# Update the main lines
sed -i 's/M690 166H1960/M690 226H1960/g' "$SVG_FILE"

# Update the gold dots on the line
sed -i 's/cx="820" cy="166"/cx="820" cy="226"/g' "$SVG_FILE"
sed -i 's/cx="1130" cy="166"/cx="1130" cy="226"/g' "$SVG_FILE"
sed -i 's/cx="1430" cy="166"/cx="1430" cy="226"/g' "$SVG_FILE"
sed -i 's/cx="1730" cy="166"/cx="1730" cy="226"/g' "$SVG_FILE"

# Update the arrow at the end
sed -i 's/M1960 166H2010M1992 150L2010 166L1992 182/M1960 226H2010M1992 210L2010 226L1992 242/g' "$SVG_FILE"

