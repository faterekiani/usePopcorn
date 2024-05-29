import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callBack);

      // cleanup function
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [action, key]
  );
}
