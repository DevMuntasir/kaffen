import { useId } from "react";
export function CoffeeBean({ color = "#C69C6D", glow = "transparent", size = 100, rotation = -20 }: { color?: string; glow?: string; size?: number; rotation?: number }) {
  const shade = (amount: number) => { const value = parseInt(color.replace("#", ""), 16); return `rgb(${[value >> 16, (value >> 8) & 255, value & 255].map(c => Math.max(0, Math.min(255, c + amount))).join(",")})`; };
  const id = useId().replace(/:/g, "");
  return <svg width={size} height={size * 1.35} viewBox="0 0 100 135" aria-hidden="true" focusable="false" style={{ transform: `rotate(${rotation}deg)`, filter: `drop-shadow(0 0 28px ${glow})` }}>
    <defs><radialGradient id={`${id}-base`} cx="35%" cy="30%" r="65%"><stop offset="0" stopColor={shade(40)} stopOpacity="1"/><stop offset="0.4" stopColor={color}/><stop offset="1" stopColor={shade(-40)}/></radialGradient><radialGradient id={`${id}-light`} cx="30%" cy="25%" r="30%"><stop offset="0" stopColor="white" stopOpacity=".35"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="50" cy="67" rx="42" ry="58" fill={`url(#${id}-base)`}/><path d="M50 14 C42 35 42 95 50 118" stroke={shade(-55)} strokeWidth="3.5" fill="none" strokeLinecap="round"/><ellipse cx="50" cy="67" rx="42" ry="58" fill={`url(#${id}-light)`}/><ellipse cx="35" cy="38" rx="12" ry="18" fill="white" opacity=".08" transform="rotate(-15 35 38)"/>
  </svg>;
}
