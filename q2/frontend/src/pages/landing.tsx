import { LoginButton } from "@/components/auth/loginButton"

export const Landing = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-y-6 text-center">
        <h1 className="max-w-[80%] mx-auto text-3xl md:text-5xl font-bold drop-shadow-md">
          Interactive Data Visualization Dashboard
        </h1>
        <LoginButton />
      </div>
    </main>
  )
}
