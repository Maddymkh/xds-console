type Props = {
    className?: string;
  };
  
  export default function Parchment({ className = "" }: Props) {
    return (
      <div
  className={`
    relative
    h-[250px]
    w-[170px]
    rounded-2xl
    border
    border-[#9C5A2A]/40
    bg-gradient-to-br
    from-[#F2C98B]
via-[#D28A43]
via-60%
to-[#7A3B18]
    shadow-xl
    ${className}
  `}
>
  {/* Top Roll */}
  <div className="absolute left-0 right-0 top-0 h-5 rounded-t-2xl bg-[#F0C98A]" />

  {/* Bottom Roll */}
  <div className="absolute bottom-0 left-0 right-0 h-5 rounded-b-2xl bg-[#F0C98A]" />

  {/* Decorative Lines */}
  <div className="absolute inset-6 rounded-xl border border-[#F3D4A2]/20" />
  <div
  className="
    absolute
    inset-0
    rounded-2xl
    opacity-20
    pointer-events-none
  "
  style={{
    background:
      "linear-gradient(115deg, transparent 20%, rgba(255,255,255,.18) 45%, transparent 70%)",
  }}
/>
</div>
    );
  }