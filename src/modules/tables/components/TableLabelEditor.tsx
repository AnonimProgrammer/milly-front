"use client";

import { useState } from "react";
import { inputField, primaryButton } from "@/modules/shared/theme/classNames";

type TableLabelEditorProps = {
  initialLabel: string;
  disabled: boolean;
  isSaving: boolean;
  onSave: (label: string) => void;
};

export function TableLabelEditor({
  initialLabel,
  disabled,
  isSaving,
  onSave,
}: TableLabelEditorProps) {
  const [label, setLabel] = useState(initialLabel);
  const trimmed = label.trim();
  const canSave = trimmed.length > 0 && trimmed !== initialLabel;

  return (
    <div className="mt-6 space-y-2">
      <label htmlFor="table-label" className="text-sm font-medium text-foreground">
        Label
      </label>
      <div className="flex gap-3">
        <input
          id="table-label"
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          disabled={disabled}
          maxLength={100}
          className={`flex-1 ${inputField}`}
        />
        <button
          type="button"
          onClick={() => {
            if (!canSave) return;
            onSave(trimmed);
          }}
          disabled={disabled || !canSave}
          className={`cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${primaryButton}`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
