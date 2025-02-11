import { test } from "../deps_test.ts";
import { echo } from "./echo.ts";

test({
  mode: "all",
  name: "echo() shows short message",
  fn: async (denops) => {
    await echo(denops, "Hello");
    // No way to test if `echo` success
  },
});

test({
  mode: "all",
  name: "echo() shows multiline message",
  fn: async (denops) => {
    await denops.cmd("set cmdheight=5");
    await echo(denops, "A\nB\nC\nD\nE");
    // No way to test if `echo` success
  },
});
