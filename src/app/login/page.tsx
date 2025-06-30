import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted dark:bg-background p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl mt-16">
        <LoginForm />
      </div>
    </div>
  )
}