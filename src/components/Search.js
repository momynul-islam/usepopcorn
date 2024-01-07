import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  //useKey custom hook for enter key for focus search field
  // useKey("Enter", function () {
  //   if (document.activeElement === inputEl.current) return;
  //   inputEl.current.focus();
  //   setQuery("");
  // });

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
