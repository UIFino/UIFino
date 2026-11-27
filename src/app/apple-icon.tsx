import { ImageResponse } from "next/og";
import { BRAND_MATRIX_CELLS, type MatrixTone } from "@/components/shell/brand-mark";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

const STATIC_TONE_HEX: Record<MatrixTone, string> = {
  primary: "#ececee",
  muted: "#26262a",
  accent: "#ceff00"
};

/** Generates a 180x180 crisp pixel Apple Touch Icon matching src/app/icon.svg. */
export default function AppleIcon() {
  const rows: readonly (0 | 1 | 2)[] = [0, 1, 2];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: 12,
          width: "100%",
          height: "100%",
          backgroundColor: "#161618"
        }}
      >
        {rows.map((rowIdx) => (
          <div key={rowIdx} style={{ display: "flex", gap: 12 }}>
            {BRAND_MATRIX_CELLS.filter((cell) => cell.row === rowIdx).map((cell) => (
              <div
                key={cell.col}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: STATIC_TONE_HEX[cell.tone]
                }}
              />
            ))}
          </div>
        ))}
      </div>
    ),
    { ...size }
  );
}
