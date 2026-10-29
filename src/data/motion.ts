/** Reference motion settings, kept independent of component markup. */
export const motionSettings = {
  scrollDuration: 1.2,
  scrollEase: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  horizontalDistance: 2000,
  horizontalScrub: 0.5,
  revealDuration: 1.2,
  revealEase: "power3.out",
  cursorFollow: 0.15,
};
