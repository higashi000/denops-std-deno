import { Denops } from "../deps.ts";
import { gather } from "../batch/mod.ts";
import type { GatherHelper } from "../batch/mod.ts";

/**
 * @deprecated Use `gather()` function in `batch` module instead.
 */
export async function batch(
  denops: Denops,
  main: (helper: GatherHelper) => Promise<void> | void,
): Promise<unknown[]> {
  console.warn(
    "DEPRECATED: Use `gather()` function in `batch` module instead.",
  );
  return await gather(denops, async (helper: GatherHelper) => {
    return await main(helper);
  });
}

export type { GatherHelper as BatchHelper };
