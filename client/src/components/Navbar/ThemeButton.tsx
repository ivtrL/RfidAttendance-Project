"use client";

import IconButton from "@mui/material/IconButton";
import { useTheme } from "next-themes";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <IconButton
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <LightModeIcon className="h-5 w-5 text-orange-300" />
      ) : (
        <DarkModeIcon className="h-5 w-5 text-slate-800" />
      )}
    </IconButton>
  );
}
