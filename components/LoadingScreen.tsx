import LoadingBar from '@components/LoadingBar'
import GiannisXP from '@components/GiannisXP'

export default function LoadingScreen() {
  return (
    <div className="z-50 bg-black absolute overflow-hidden inset-0 h-screen">
      <main className="flex flex-col h-screen">
        <div className="h-full flex">
          <div className="mx-auto my-auto flex flex-col gap-8">
            <GiannisXP />
            <LoadingBar />
          </div>
        </div>
        <footer className="flex items-center justify-between h-20 px-16 text-white font-thin">
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="hover:cursor-auto">
              {' '}
              For the best experience <br /> Enter Full Screen (F11){' '}
            </p>
          </div>
          <p className="text-3xl font-mono font-bold">Portfolio</p>
        </footer>
      </main>
    </div>
  )
}
