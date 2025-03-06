
import Chat from "./components/chat/popup"

export default function Home() {
  return (
    <div className="text-gray-600 body-font bg-black min-h-screen flex flex-col items-center justify-center">
      <h2 className="mb-1 text-2xl font-semibold tracking-tighter text-center text-white lg:text-7xl md:text-6xl">
        Applying to Thougthful AI
      </h2>
      <br />
      <h2 className="text-2xl font-semibold leading-6 text-white text-center pb-11">
        Maximillian Kodi
      </h2>
      <p className=" font-semibold leading-6 text-white text-center pb-11">
        click the chat below
      </p>
      <Chat />
    </div>

  );
}
