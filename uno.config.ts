import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  theme: {
    colors: {
      primary: "rgb(var(--primary-color) / <alpha-value>)",
    },
  },
  shortcuts: {
    todoTag:
      "px-2 py-0.5 rounded-md overflow-hidden text-xs bg-amber-50 text-amber-600 border-amber-200 border-1px border-solid",
    doingTag:
      "px-2 py-0.5 rounded-md overflow-hidden text-xs bg-blue-50 text-blue-600 border-blue-200 border-1px border-solid",
    doneTag:
      "px-2 py-0.5 rounded-md overflow-hidden text-xs bg-emerald-50 text-emerald-600 border-emerald-200 border-1px border-solid",
  },
});
