export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#0b1230] via-[#0f1b42] to-[#0b1230]"
    >
      <div className="absolute -left-32 -top-32 h-96 w-96 animate-float-slow rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-80 w-80 animate-float-slow2 rounded-full bg-cameroon-green/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 animate-float-slow rounded-full bg-cameroon-yellow/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
