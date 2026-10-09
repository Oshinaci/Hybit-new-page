import React from 'react';

// Pure Hybit geometric mark without background (for watermarks, card marks, stamps)
export const HybitMark: React.FC<{
  className?: string;
  size?: number | string;
  fill?: string;
}> = ({ className = '', size = 32, fill = 'currentColor' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    style={typeof size === 'number' ? { width: size, height: size } : undefined}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left Column Capsule */}
    <rect x="23.5" y="32" width="12" height="36" rx="6" fill={fill} />

    {/* Center Column Top Segment */}
    <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" fill={fill} />

    {/* Center Column Bottom Segment */}
    <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" fill={fill} />

    {/* Right Column Capsule */}
    <rect x="64.5" y="32" width="12" height="36" rx="6" fill={fill} />
  </svg>
);

export const HybitIcon: React.FC<{
  className?: string;
  size?: number;
  transparentBg?: boolean;
  fill?: string;
}> = ({
  className = '',
  size = 32,
  transparentBg = false,
  fill = '#FFFFFF',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${transparentBg ? '' : 'shadow-sm'} transition-transform duration-150 hover:scale-[1.02] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background matching Card Balance (#0095FF) unless transparentBg is true */}
        {!transparentBg && <rect width="100" height="100" rx="26" fill="#0095FF" />}

        {/* Left Column Capsule */}
        <rect x="23.5" y="32" width="12" height="36" rx="6" fill={fill} />

        {/* Center Column Top Segment */}
        <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" fill={fill} />

        {/* Center Column Bottom Segment */}
        <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" fill={fill} />

        {/* Right Column Capsule */}
        <rect x="64.5" y="32" width="12" height="36" rx="6" fill={fill} />
      </svg>
    </div>
  );
};

export const HybitLogo: React.FC<{ className?: string; size?: number; showText?: boolean }> = ({
  className = '',
  size = 32,
  showText = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <HybitIcon size={size} />

      {/* Name Hybit rendered in Lobster/Chinese font */}
      {showText && (
        <span className="text-[28px] sm:text-3xl font-normal tracking-wide text-white font-chinese select-none leading-none">
          Hybit
        </span>
      )}
    </div>
  );
};

// Ethereum
export const EthereumIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4.5 12.5L12 16.5L19.5 12.5L12 2Z" fill="currentColor" fillOpacity="0.85" />
    <path d="M12 18L4.5 13.5L12 22L19.5 13.5L12 18Z" fill="currentColor" fillOpacity="0.6" />
    <path d="M12 2V16.5L19.5 12.5L12 2Z" fill="currentColor" fillOpacity="0.4" />
    <path d="M12 18V22L19.5 13.5L12 18Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Base L2 (Official Base Symbol: Circle with horizontal bar)
export const BaseIcon: React.FC<{ className?: string; fill?: string }> = ({
  className = 'w-6 h-6',
  fill = 'currentColor',
}) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM15.9771 29C23.1698 29 29 23.1802 29 16C29 8.81984 23.1698 3 15.9771 3C9.15368 3 3.5564 8.23952 3 14.907H20.213V17.093H3C3.5564 23.7605 9.15368 29 15.9771 29Z"
      fill={fill}
    />
  </svg>
);

// Solana - Official Black Badge with Gradient Glyph (transparent outer background)
export const SolanaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <defs>
      <linearGradient
        id="solana-icon-g1"
        x1="360.88"
        y1="351.46"
        x2="141.21"
        y2="-69.29"
        gradientTransform="matrix(1 0 0 -1 0 314)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#00FFA3" />
        <stop offset="100%" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="solana-icon-g2"
        x1="264.83"
        y1="401.60"
        x2="45.16"
        y2="-19.15"
        gradientTransform="matrix(1 0 0 -1 0 314)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#00FFA3" />
        <stop offset="100%" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="solana-icon-g3"
        x1="312.55"
        y1="376.69"
        x2="92.88"
        y2="-44.06"
        gradientTransform="matrix(1 0 0 -1 0 314)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#00FFA3" />
        <stop offset="100%" stopColor="#DC1FFF" />
      </linearGradient>
    </defs>
    {/* Black circular badge with transparent exterior */}
    <circle cx="256" cy="256" r="256" fill="#000000" />
    {/* Centered Solana 3-bar gradient glyph */}
    <g transform="translate(102, 135) scale(0.775)">
      {/* Top bar */}
      <path
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="url(#solana-icon-g2)"
      />
      {/* Middle bar */}
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1L333.1 120.1z"
        fill="url(#solana-icon-g3)"
      />
      {/* Bottom bar */}
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 237.9z"
        fill="url(#solana-icon-g1)"
      />
    </g>
  </svg>
);

// Polygon PoS - Official Polygon Icon
export const PolygonIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 360 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <rect width="360" height="360" rx="180" fill="#6C00F6" />
    <path
      d="M218.804 99.5819L168.572 128.432V218.473L140.856 234.539L112.97 218.46V186.313L140.856 170.39L158.786 180.788V154.779L140.699 144.511L90.4795 173.687V231.399L140.869 260.418L191.088 231.399V141.371L218.974 125.291L246.846 141.371V173.374L218.974 189.597L200.887 179.107V204.986L218.804 215.319L269.519 186.47V128.432L218.804 99.5819Z"
      fill="#FFFFFF"
    />
  </svg>
);

// Arbitrum One - Official Arbitrum Logomark FullColor
export const ArbitrumIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 2500 2500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Navy Hexagon Background */}
    <path
      fill="#213147"
      d="M226 760v980c0 63 33 120 88 152l849 490c54 31 121 31 175 0l849-490c54-31 88-89 88-152V760c0-63-33-120-88-152l-849-490c-54-31-121-31-175 0L314 608c-54 31-87 89-87 152H226z"
    />
    {/* Bright Blue Right Slants */}
    <path
      fill="#12AAFF"
      d="M1435 1440l-121 332c-3 9-3 19 0 29l208 571 241-139-289-793c-7-18-32-18-39 0z"
    />
    <path
      fill="#12AAFF"
      d="M1678 882c-7-18-32-18-39 0l-121 332c-3 9-3 19 0 29l341 935 241-139L1678 883V882z"
    />
    {/* Light Ice Blue Hexagon Border */}
    <path
      fill="#9DCCED"
      d="M1250 155c6 0 12 2 17 5l918 530c11 6 17 18 17 30v1060c0 12-7 24-17 30l-918 530c-5 3-11 5-17 5s-12-2-17-5l-918-530c-11-6-17-18-17-30V719c0-12 7-24 17-30l918-530c5-3 11-5 17-5l0 0V155zm0-155c-33 0-65 8-95 25L237 555c-59 34-95 96-95 164v1060c0 68 36 130 95 164l918 530c29 17 62 25 95 25s65-8 95-25l918-530c59-34 95-96 95-164V719c0-68-36-130-95-164L1344 25c-29-17-62-25-95-25l0 0H1250z"
    />
    {/* Navy polygon bridge */}
    <polygon fill="#213147" points="642 2179 727 1947 897 2088 738 2234" />
    {/* Pure White Parallel Slanted Beams */}
    <path
      fill="#FFFFFF"
      d="M1172 644H939c-17 0-33 11-39 27L401 2039l241 139 550-1507c5-14-5-28-19-28L1172 644z"
    />
    <path
      fill="#FFFFFF"
      d="M1580 644h-233c-17 0-33 11-39 27L738 2233l241 139 620-1701c5-14-5-28-19-28V644z"
    />
  </svg>
);

// Optimism (OP) - Official Optimism Red Badge with White OP Glyph
export const OptimismIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 1037 1037"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Official Optimism Red Circle Badge */}
    <circle cx="518.5" cy="518.5" r="518.5" fill="#FF0420" />
    {/* Official Optimism White OP Glyph */}
    <path
      fill="#FFFFFF"
      d="M761.8 365.3H576.3l-43.7 309.6h88.8l10.5-75h101c91.2 0 136.7-36.6 147-114.9 10.7-80.7-27.5-119.7-118.1-119.7zm28.2 114.3c-3.6 33.3-22.7 47.8-60.9 47.8h-86.9l12.6-89.5h90.9c34.7 0 47.7 11.8 44.3 41.7zM357.4 358c-120.9 0-184.3 50.8-199.2 159.6-15.2 111.3 37 164.5 161 164.5 124 0 184-50.8 198.9-159.6 15.1-111.3-36.7-164.5-160.7-164.5zm70.4 159.7c-8.2 61.4-39.1 88.9-103.7 88.9-60.6 0-83.4-24.2-75.5-84.1 8.2-61.7 39.7-88.9 103.7-88.9s83.7 22.7 75.5 84.1z"
    />
  </svg>
);

// BNB Chain
export const BNBIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L15.5 5.5L8.5 12.5L5 9L12 2Z" />
    <path d="M19 9L22.5 12.5L19 16L15.5 12.5L19 9Z" />
    <path d="M12 22L8.5 18.5L15.5 11.5L19 15L12 22Z" />
    <path d="M5 15L8.5 11.5L5 8L1.5 11.5L5 15Z" />
    <path d="M12 15.5L8.5 12L12 8.5L15.5 12L12 15.5Z" />
  </svg>
);

// Sui
export const SuiIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C9.5 5.5 6 9.5 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9.5 14.5 5.5 12 2ZM12 17.5C10.1 17.5 8.5 15.9 8.5 14C8.5 11.5 10.5 8.6 12 6.5C13.5 8.6 15.5 11.5 15.5 14C15.5 14C15.5 15.9 13.9 17.5 12 17.5Z" />
  </svg>
);

// Aptos
export const AptosIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M12 3L3 21H7.5L12 11.5L16.5 21H21L12 3Z" fill="currentColor" fillOpacity="0.2" />
    <line x1="6" y1="15" x2="18" y2="15" />
    <line x1="8" y1="11" x2="16" y2="11" />
  </svg>
);

// WalletConnect
export const WalletConnectIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5.4 8.2C9 4.6 15 4.6 18.6 8.2L19.2 8.8C19.5 9.1 19.5 9.5 19.2 9.8L17.7 11.3C17.5 11.5 17.2 11.5 17 11.3L16.2 10.5C13.8 8.1 10.2 8.1 7.8 10.5L7 11.3C6.8 11.5 6.5 11.5 6.3 11.3L4.8 9.8C4.5 9.5 4.5 9.1 4.8 8.8L5.4 8.2ZM21.7 11.3L23.2 12.8C23.5 13.1 23.5 13.5 23.2 13.8L16.8 20.2C16.5 20.5 16.1 20.5 15.8 20.2L12 16.4L8.2 20.2C7.9 20.5 7.5 20.5 7.2 20.2L0.8 13.8C0.5 13.5 0.5 13.1 0.8 12.8L2.3 11.3C2.5 11.1 2.8 11.1 3 11.3L6.8 15.1L10.6 11.3C10.8 11.1 11.2 11.1 11.4 11.3L12 11.9L12.6 11.3C12.8 11.1 13.2 11.1 13.4 11.3L17.2 15.1L21 11.3C21.2 11.1 21.5 11.1 21.7 11.3Z" />
  </svg>
);

// USD Coin (USDC) / Circle - Official Circle USDC Logo
export const UsdcIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M48 95C73.9574 95 95 73.9574 95 48C95 22.0426 73.9574 1 48 1C22.0426 1 1 22.0426 1 48C1 73.9574 22.0426 95 48 95Z"
      fill="#0B53BF"
    />
    <path
      d="M56.4609 13.7778V19.8291C68.5341 23.4716 77.3759 34.6928 77.3759 47.9997C77.3759 61.3066 68.5341 72.5278 56.4609 76.1703V82.2216C71.8534 78.4616 83.2509 64.5672 83.2509 47.9997C83.2509 31.4322 71.8534 17.5378 56.4609 13.7778Z"
      fill="#FFFFFF"
    />
    <path
      d="M18.625 47.9997C18.625 34.6928 27.4669 23.4716 39.54 19.8291V13.7778C24.1475 17.5378 12.75 31.4322 12.75 47.9997C12.75 64.5672 24.1475 78.4616 39.54 82.2216V76.1703C27.4669 72.5572 18.625 61.3066 18.625 47.9997Z"
      fill="#FFFFFF"
    />
    <path
      d="M60.6319 54.5506C60.6319 42.5362 41.8025 47.4713 41.8025 40.8325C41.8025 38.4531 43.7119 36.9256 47.3544 36.9256C51.7019 36.9256 53.2 39.0406 53.67 41.89H59.6625C59.1279 36.5426 56.0588 33.1662 50.9382 32.1604V27.4375H45.0632V31.9918C39.4534 32.7062 35.9275 35.973 35.9275 40.8325C35.9275 52.9056 54.7863 48.3819 54.7863 54.9031C54.7863 57.3706 52.4069 59.0156 48.3825 59.0156C43.1244 59.0156 41.3913 56.695 40.745 53.4931H34.8994C35.2781 59.3502 38.8897 63.0159 45.0632 63.9307V68.5625H50.9382V63.9923C56.9633 63.2139 60.6319 59.7089 60.6319 54.5506Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const CircleIcon = UsdcIcon;

// LayerZero
export const LayerZeroIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 6V18L12 22L20 18V6L12 2ZM12 4.3L18 7.3V16.7L12 19.7L6 16.7V7.3L12 4.3ZM12 8.5C10.1 8.5 8.5 10.1 8.5 12C8.5 13.9 10.1 15.5 12 15.5C13.9 15.5 15.5 13.9 15.5 12C15.5 10.1 13.9 8.5 12 8.5Z" />
  </svg>
);

// Chainlink
export const ChainlinkIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 6.6V17.4L12 22L20 17.4V6.6L12 2ZM17.5 16L12 19.2L6.5 16V8L12 4.8L17.5 8V16ZM12 9.5L9 11.2V14.8L12 16.5L15 14.8V11.2L12 9.5Z" />
  </svg>
);
