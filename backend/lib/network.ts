export function getServerIP(): string {
  if (process.env.SERVER_IP) {
    return process.env.SERVER_IP;
  }

  return "localhost";
}
