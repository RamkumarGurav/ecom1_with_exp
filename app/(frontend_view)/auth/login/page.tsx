import LoginCard from "./LoginCard";
import PersisterPage from "./PersisterPage";

export default function InputForm() {
  return (
    <section
      id="Section"
      className={`bg-gray-300 py-[35px] sm:py-[50px] px-2 sm:px-[35px] xl:px-[70px] min-h-screen  
    |||  flex flex-col justify-center items-center`}
    >
      <title>Login</title>
      {/* <div className="flex gap-1  p-2 mb-4 rounded-full flex-col justify-center items-center">
        <p className="text-xs font-bold underline">test credentials</p>
        <p className="text-xs"> username:Hukum Gupta</p>
        <p className="text-xs">password:hukum1234</p>
      </div> */}

      <PersisterPage />
    </section>
  );
}
