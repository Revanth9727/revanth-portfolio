"use client";

import RecruiterMode from "@/components/RecruiterMode";
import DevMode from "@/components/DevMode";
import ModeToggle, { useMode } from "@/components/ModeToggle";

export default function Page() {
  const [mode, setMode] = useMode();

  return (
    <>
      <ModeToggle mode={mode} setMode={setMode} />
      {mode === "dev" ? <DevMode /> : <RecruiterMode />}
    </>
  );
}
