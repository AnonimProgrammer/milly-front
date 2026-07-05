import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
            left: 34,
            top: 34,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#1e3a8a",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 56,
            top: 56,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.85)",
          }}
        />
      </div>
    ),
    size,
  );
}
