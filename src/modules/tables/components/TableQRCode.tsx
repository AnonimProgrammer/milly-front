export function TableQRCode({ size = 200 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 29 29"
      shapeRendering="crispEdges"
      className="text-black"
      aria-hidden="true"
    >
      <rect width="29" height="29" fill="white" />
      <rect x="0" y="0" width="7" height="7" fill="currentColor" />
      <rect x="1" y="1" width="5" height="5" fill="white" />
      <rect x="2" y="2" width="3" height="3" fill="currentColor" />
      <rect x="22" y="0" width="7" height="7" fill="currentColor" />
      <rect x="23" y="1" width="5" height="5" fill="white" />
      <rect x="24" y="2" width="3" height="3" fill="currentColor" />
      <rect x="0" y="22" width="7" height="7" fill="currentColor" />
      <rect x="1" y="23" width="5" height="5" fill="white" />
      <rect x="2" y="24" width="3" height="3" fill="currentColor" />
      <rect x="20" y="20" width="5" height="5" fill="currentColor" />
      <rect x="21" y="21" width="3" height="3" fill="white" />
      <rect x="22" y="22" width="1" height="1" fill="currentColor" />
      <rect x="8" y="1" width="2" height="1" fill="currentColor" />
      <rect x="12" y="0" width="1" height="3" fill="currentColor" />
      <rect x="15" y="1" width="3" height="1" fill="currentColor" />
      <rect x="9" y="9" width="3" height="1" fill="currentColor" />
      <rect x="14" y="14" width="3" height="1" fill="currentColor" />
      <rect x="19" y="13" width="1" height="3" fill="currentColor" />
      <rect x="11" y="22" width="2" height="3" fill="currentColor" />
      <rect x="24" y="25" width="3" height="2" fill="currentColor" />
    </svg>
  );
}
