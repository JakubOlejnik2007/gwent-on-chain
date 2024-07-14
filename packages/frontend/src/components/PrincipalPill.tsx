import React from "react";
import Pill from "./ui/Pill";

type PrincipalPillProps = {
  principal?: string;
  className?: string;
};

const PrincipalPill = ({
  principal,
  className,
}: PrincipalPillProps) => {
  return (
    <Pill className={className}>
      <img alt="ic" className="w-4 h-4" src="/ic.svg" />
      {principal?.slice(0, 6) + "..." + principal?.slice(-4)}
    </Pill>
  );
}

export default PrincipalPill;