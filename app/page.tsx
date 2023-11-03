import InputButton from "./components/InputButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="p-6">
        <h1 className="font-bold text-lg">Free way to shorten your URL</h1>
      </div>
      <InputButton />
    </main>
  )
}
