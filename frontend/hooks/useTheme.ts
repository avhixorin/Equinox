import { RootState } from "@/redux/store";
import { setUserTheme } from "@/redux/userSlice";
import { Theme } from "@/types/types";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTheme = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const theme = user.settings.theme || Theme.LIGHT;

  const applyTheme = useCallback((activeTheme: string) => {
    const htmlElement = document.documentElement;
    if (!htmlElement) return;

    htmlElement.classList.remove("dark");
    if (activeTheme === Theme.DARK) {
      htmlElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    let currentTheme = theme;

    if (theme === Theme.SYSTEM) {
      currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.DARK
        : Theme.LIGHT;
    }

    const nextTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    localStorage.setItem("theme", nextTheme);
    dispatch(setUserTheme(nextTheme));
    applyTheme(nextTheme);
  }, [dispatch, theme, applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem("theme", newTheme);
      dispatch(setUserTheme(newTheme));
      applyTheme(
        newTheme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : newTheme
      );
    },
    [dispatch, applyTheme]
  );

  useEffect(() => {
    const savedThemeStr = localStorage.getItem("theme");
    const savedTheme: Theme =
      savedThemeStr === Theme.DARK || savedThemeStr === Theme.LIGHT || savedThemeStr === Theme.SYSTEM
        ? (savedThemeStr as Theme)
        : Theme.LIGHT;
    setTheme(savedTheme);
  }, [setTheme]);

  return { theme, toggleTheme, setTheme };
};

export default useTheme;
