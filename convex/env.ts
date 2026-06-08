/**
 * Reads a required environment variable on the Convex deployment, throwing a
 * clear error if it is missing instead of failing later with a cryptic crash.
 */
export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Set it with: npx convex env set ${name} <value>`
    )
  }
  return value
}
