import { Context, Denops, Dispatcher, getCacheOrElse } from "../deps.ts";
import { execute } from "./execute.ts";
import { autocmd, AutocmdHelper } from "./autocmd.ts";
import { VariableHelper } from "./variable.ts";
import { load } from "./load.ts";

export class Vim {
  #denops: Denops;

  readonly g: VariableHelper;
  readonly b: VariableHelper;
  readonly w: VariableHelper;
  readonly t: VariableHelper;
  readonly v: VariableHelper;

  constructor(denops: Denops) {
    this.#denops = denops;
    this.g = new VariableHelper(denops, "g");
    this.b = new VariableHelper(denops, "b");
    this.w = new VariableHelper(denops, "w");
    this.t = new VariableHelper(denops, "t");
    this.v = new VariableHelper(denops, "v");
  }

  static get(): Vim {
    return getCacheOrElse("vim", () => {
      return new Vim(Denops.get());
    });
  }

  get name(): string {
    return this.#denops.name;
  }

  async call(func: string, ...args: unknown[]): Promise<unknown> {
    return await this.#denops.call(func, ...args);
  }

  async cmd(cmd: string, context: Context = {}): Promise<void> {
    await this.#denops.cmd(cmd, context);
  }

  async eval(expr: string, context: Context = {}): Promise<unknown> {
    return await this.#denops.eval(expr, context);
  }

  async execute(
    command: string | string[],
    context: Context = {},
  ): Promise<void> {
    await execute(this.#denops, command, context);
  }

  async autocmd(
    group: string,
    main: (helper: AutocmdHelper) => void,
  ): Promise<void> {
    await autocmd(this.#denops, group, main);
  }

  async load(filePathInfo: URL): Promise<void> {
    await load(this.#denops, filePathInfo);
  }

  register(dispatcher: Dispatcher): void {
    this.#denops.extendDispatcher(dispatcher);
  }
}

export function start(main: (vim: Vim) => Promise<void>) {
  Denops.start(() => main(Vim.get()));
}
