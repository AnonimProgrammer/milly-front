import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 6,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#1e3a8a",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.85)",
          }}
        />
      </div>
    ),
    size,
  );
}
