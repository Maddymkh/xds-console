"use client";
import Parchment from "./Parchment";
import { motion } from "framer-motion";
import { useState } from "react";
import CeremonyLayout from "../ui/CeremonyLayout";

type Props = {
  governmentMotion: string;
  oppositionMotion: string;
  sessionId: number;
  onContinue: (
    chosenStance: "Government" | "Opposition"
  ) => void;
};

export default function ParchmentChoice({
  governmentMotion,
  oppositionMotion,
  sessionId,
  onContinue,
}: Props) {
  const [selected, setSelected] = useState<
  "Government" | "Opposition" | null
>(null);
const choose = (
  side: "Government" | "Opposition"
) => {
  setSelected(side);

  setTimeout(() => {
    onContinue(side);
  }, 2000);
};
return (
  <CeremonyLayout
  title="Motion Draw"
  subtitle="XDS Awaits"
  size="sm"
  embedded
>

<div className="text-center">

<div className="flex justify-center gap-16">
      

        {/* Government */}

        <ParchmentCard
          title="Government"
          selected={selected === "Government"}
          disabled={selected !== null}
          onClick={() => choose("Government")}
        />

        {/* Opposition */}

        <ParchmentCard
          title="Opposition"
          selected={selected === "Opposition"}
          disabled={selected !== null}
          onClick={() => choose("Opposition")}
        />

      </div>

    </div>

  </CeremonyLayout>
);

}
type CardProps = {
  title: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
};
function ParchmentCard({
  title,
  selected,
  disabled,
  onClick,
}: CardProps) {
  return (
    

    <motion.div
    
    onClick={!disabled ? onClick : undefined}
    
    initial={{
        opacity:0,
        y:40
    }}
    
    animate={{
      opacity: disabled && !selected ? 0.15 : 1,
      scale: selected ? 1.04 : 1,
      y: selected ? -12 : 0,
      boxShadow: selected
        ? "0 0 60px rgba(193,122,41,.35)"
        : "0 10px 30px rgba(0,0,0,.3)",
    }}
    transition={{
        duration:.6
    }}
    
    whileHover={{
      y:-18,
      scale:1.05,
      rotateX:6,
      rotateY:-4,
  }}
    className="
    group
    panel
    relative
    flex
    h-[460px]
    w-[310px]
    cursor-pointer
    items-center
    justify-center
    overflow-hidden
    rounded-[38px]
    border
    border-[#A86A2A]/20
    transition-all
    duration-500
    "
    >
    <div
    className="
    absolute
    inset-0
    opacity-0
    transition-opacity
    duration-500
    group-hover:opacity-100
    "
    style={{
        background:
        "radial-gradient(circle at center, rgba(193,122,41,.18), transparent 70%)",
    }}
/>
    {
    !selected
    ?
    
    <div
    className="
text-[150px]
text-[#C17A29]
drop-shadow-[0_0_18px_rgba(193,122,41,.35)]
select-none
"
    >
      <div
className="
absolute
top-8
left-1/2
-translate-x-1/2
h-10
w-10
rounded-full
border
border-[#E0B072]
bg-[#8C3A24]
shadow-[0_0_20px_rgba(140,58,36,.45)]
"
/>
    <Parchment />
    </div>
    
    :
    
    <motion.div
    
    initial={{
      opacity: 0,
      y: 15,
    }}
    
    animate={{
      opacity: 1,
      y: 0,
    }}
    
    transition={{
      delay: .3,
      duration: .4,
    }}
    
    className="
    text-center
    "
    >
    <p className="body-ui mt-5 text-muted">
XDS accepts your choice.
</p>
    <p className="text-sm uppercase tracking-[.4em] text-muted">
    
    Chosen Side
    
    </p>
    
    <h2
className="
display
mt-6
text-4xl
text-[#D69A57]
"
>
    
    {title}
    
    </h2>
    
    </motion.div>
    
    }
    
    </motion.div>
    
    );
  }