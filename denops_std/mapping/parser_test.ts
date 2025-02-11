import { assertEquals, assertThrows } from "../deps_test.ts";
import { Mapping } from "./types.ts";
import { parse } from "./parser.ts";

const testcases: [string, Mapping][] = [
  ["n  <Space>hp    @<Plug>(test-denops-std)", {
    mode: "n",
    lhs: "<Space>hp",
    rhs: "<Plug>(test-denops-std)",
    noremap: false,
    script: false,
    buffer: true,
  }],
  [
    'v  <C-B>       * test#denops#has_scroll() ? test#denops#nvim_scroll(0, 1) : "\<C-B>"',
    {
      mode: "v",
      lhs: "<C-B>",
      rhs:
        'test#denops#has_scroll() ? test#denops#nvim_scroll(0, 1) : "\<C-B>"',
      noremap: true,
      script: false,
      buffer: false,
    },
  ],
  ["o  <C-B>       * <Left>", {
    mode: "o",
    lhs: "<C-B>",
    rhs: "<Left>",
    noremap: true,
    script: false,
    buffer: false,
  }],
  ["x  <C-G>Q        <Plug>(test-denops-std)", {
    mode: "x",
    lhs: "<C-G>Q",
    rhs: "<Plug>(test-denops-std)",
    noremap: false,
    script: false,
    buffer: false,
  }],
  [
    'n  <C-L>       * empty(get(b:, \'current_syntax\')) ? "\<C-L>" : "\<C-L>:syntax sync fromstart\<CR>"',
    {
      mode: "n",
      lhs: "<C-L>",
      rhs:
        'empty(get(b:, \'current_syntax\')) ? "\<C-L>" : "\<C-L>:syntax sync fromstart\<CR>"',
      noremap: true,
      script: false,
      buffer: false,
    },
  ],
  ["   -             <Plug>(test-denops-std)", {
    mode: "",
    lhs: "-",
    rhs: "<Plug>(test-denops-std)",
    noremap: false,
    script: false,
    buffer: false,
  }],
  [
    "v  <Plug>(test-denops-std) & :<C-U>call test#denops#call('test#denops#do')<CR>gv<SNR>102_(register)g@",
    {
      mode: "v",
      lhs: "<Plug>(test-denops-std)",
      rhs:
        ":<C-U>call test#denops#call('test#denops#do')<CR>gv<SNR>102_(register)g@",
      noremap: false,
      script: true,
      buffer: false,
    },
  ],
];
for (const [record, expected] of testcases) {
  Deno.test(`parse() parses '${record}' and return a Mapping instance`, () => {
    const actual = parse(record);
    assertEquals(actual, expected);
  });
}
Deno.test(`parse() throws an error for invalid record`, () => {
  assertThrows(
    () => {
      parse("This-is-invalid-record");
    },
    undefined,
    "Failed to parse a mapping record",
  );
});
