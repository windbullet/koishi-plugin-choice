import { Context, Schema, Random } from 'koishi'

export const name = 'choice'

export interface Config {
  content: string
}

export const Config: Schema<Config> = Schema.object({
  content: Schema.string()
    .description("选择后的回复内容（$choice 代表抽取的选择）")
    .default("我觉得$choice不错"),
})

export function apply(ctx: Context, config: Config) {
  ctx.command("choose <...choices>")
    .alias("帮我选一个")
    .action(async ({ session }, ...choices) => {
      return config.content.replaceAll("$choice", Random.pick(choices))
    })
}
