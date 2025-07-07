
import Artificial from "./component/artificial";
import Nav from "./component/navbar";
import Screen from "./3-d-component/scene";
import About from "./component/about";


export default function Home() {


  return (
    <>

      <Nav />

      <div className="h-100 flex-col  flex items-center justify-center gap-6 font-bold bg-gradient-to-b from-gray-900 via-50% to-gray-700/30 ">
        <h1 className="sm:text-xl md:text-3xl lg:text-5xl">Welcome To Walmart Navigator</h1>
        <h1 className="sm:text-xl md:text-2xl m-5 lg:text-3xl text-gray-300/70">We are here to help you find what you need </h1>
      </div>

      <div className="flex  flex-col items-center gap-6 justify-center">


      </div>

      <Artificial />

      <Screen />

      <About/>
    </>
  );
}
