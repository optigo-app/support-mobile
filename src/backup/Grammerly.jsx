import React, { createContext, useContext, useEffect, useState } from "react";
import { WorkerLinter, binaryInlined } from "harper.js";
import { Popover, Box, Typography, Chip } from "@mui/material";

const HarperContext = createContext(null);

export const useHarper = () => useContext(HarperContext);

export default function HarperGrammarProvider({ children }) {
  const [linter, setLinter] = useState(null);
  const [lints, setLints] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLint, setSelectedLint] = useState(null);

  // -----------------------------
  // Load Harper WASM ONCE globally
  // -----------------------------
  useEffect(() => {
    const init = async () => {
      const ln = new WorkerLinter({
        binary: binaryInlined,
        dialect: 0
      });
      await ln.setup();
      setLinter(ln);
    };
    init();
  }, []);

  // -----------------------------
  // Global typing listener
  // -----------------------------
  useEffect(() => {
    if (!linter) return;

    const handleTyping = async () => {
      const el = document.activeElement;
      if (!el || !("value" in el)) return;

      const text = el.value;
      const res = await linter.lint(text);
      setLints(res);
    };

    window.addEventListener("keyup", handleTyping);
    return () => window.removeEventListener("keyup", handleTyping);
  }, [linter]);

  // -----------------------------
  // Highlight errors in active input
  // -----------------------------
  useEffect(() => {
    const el = document.activeElement;
    if (!el || !("value" in el)) return;

    const text = el.value;

    let output = "";
    let cursor = 0;

    lints.forEach((lint, index) => {
      const { start, end } = lint.span();

      output += text.slice(cursor, start);
      output += `<span class="grammar-err" data-lint="${index}">
        ${text.slice(start, end)}
      </span>`;
      cursor = end;
    });

    output += text.slice(cursor);

    if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") return;
  }, [lints]);

  // -----------------------------
  // Click to open popover
  // -----------------------------
  useEffect(() => {
    const clickHandler = (e) => {
      if (e.target.classList.contains("grammar-err")) {
        const index = Number(e.target.dataset.lint);
        setSelectedLint(lints[index]);
        setAnchorEl(e.target);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [lints]);

  const handleApply = async (replacement) => {
    const el = document.activeElement;
    const text = el.value;

    const newText = await linter.applySuggestion(
      text,
      selectedLint,
      selectedLint.suggestions()[0]
    );

    el.value = newText;
    setAnchorEl(null);
  };

  return (
    <HarperContext.Provider value={{ lints }}>
      {children}

      {/* Global Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {selectedLint && (
          <Box sx={{ p: 2, maxWidth: 250 }}>
            <Typography fontWeight={600}>
              {selectedLint.lint_kind_pretty()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {selectedLint.message()}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedLint.suggestions().map((s, i) => (
                <Chip
                  key={i}
                  label={s.get_replacement_text()}
                  size="small"
                  color="primary"
                  onClick={() => handleApply(s)}
                />
              ))}
            </Box>
          </Box>
        )}
      </Popover>
    </HarperContext.Provider>
  );
}
