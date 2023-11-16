import type { RouteContext } from '$fresh/server.ts'

interface GithubResponse {
  login: string
  name: string
  avatar_url: string
}


export default async function Page(_req: Request, ctx: RouteContext<{username: string}>) {
  const resp = await fetch(
    `https://api.github.com/users/${ctx.params.username}`
  )

  if (!resp.ok) {
    return <h1>An Error occurred</h1>
  }

  const { login, name, avatar_url } = (await resp.json()) as GithubResponse

  return (
    <div>
      <img src={avatar_url} width={64} height={64} alt="" />
      <h1>{name}</h1>
      <p>{login}</p>
    </div>
  )
}
