"use client";

import { toggleCompleted } from "../actions";

export function ProgressToggle({
  mapId,
  stepId,
  isCompleted,
}: {
  mapId: number;
  stepId: string;
  isCompleted: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        className="switch switch-primary"
        id="completedToggle"
        defaultChecked={isCompleted}
        onChange={async (e) =>
          await toggleCompleted(stepId, e.target.checked, mapId)
        }
      />
      <label className="label label-text text-base" htmlFor="completedToggle">
        Completed
      </label>
    </div>
  );
}
