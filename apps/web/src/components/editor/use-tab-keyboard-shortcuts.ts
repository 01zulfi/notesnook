/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { useEffect } from "react";
import { useEditorStore } from "../../stores/editor-store";

const shortcuts = [
  {
    is: (event: KeyboardEvent) =>
      ((event.ctrlKey || event.metaKey) &&
        event.altKey &&
        event.key === "ArrowRight") ||
      (IS_DESKTOP_APP &&
        (event.ctrlKey || event.metaKey) &&
        event.key === "Tab" &&
        !event.altKey &&
        !event.shiftKey),
    action: () => useEditorStore.getState().openNextSession()
  },
  {
    is: (event: KeyboardEvent) =>
      ((event.ctrlKey || event.metaKey) &&
        event.altKey &&
        event.key === "ArrowLeft") ||
      (IS_DESKTOP_APP &&
        (event.ctrlKey || event.metaKey) &&
        event.key === "Tab" &&
        !event.altKey &&
        event.shiftKey),
    action: () => useEditorStore.getState().openPreviousSession()
  },
  {
    is: (event: KeyboardEvent) =>
      IS_DESKTOP_APP && (event.ctrlKey || event.metaKey) && event.key === "w",
    action: () => useEditorStore.getState().closeActiveSession()
  },
  {
    is: (event: KeyboardEvent) =>
      IS_DESKTOP_APP &&
      (event.ctrlKey || event.metaKey) &&
      !event.shiftKey &&
      (event.key === "t" || event.key === "n"),
    action: () => useEditorStore.getState().newSession()
  },
  {
    is: (event: KeyboardEvent) =>
      IS_DESKTOP_APP &&
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === "T",
    action: () => useEditorStore.getState().undoCloseSession()
  }
];

export function useTabKeyboardShortcuts() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        if (shortcut.is(event)) {
          event.preventDefault();
          shortcut.action();
          return;
        }
      }
    };
    document.body.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
