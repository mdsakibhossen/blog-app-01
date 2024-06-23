import { signIn } from "@/lib/auth"

const GoogleLoginButton = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className="bg-blue-500 px-5 py-2 mt-3 w-full rounded">Login with Google</button>
    </form>
  )
}

export default GoogleLoginButton