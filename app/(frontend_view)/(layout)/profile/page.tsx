import PersisterPage from "./PersisterPage";

export default function LoginSuccessPage() {
  return (
    <section
      id="Section"
      className={`bg-gray-300 py-[35px] sm:py-[50px] px-2 sm:px-[35px] xl:px-[70px] min-h-screen  
    |||  flex flex-col justify-center items-center`}
    >
      <PersisterPage />
    </section>
  );
}
/*****************************************************
      other
 ****************************************************/
// async function getData() {
//   const res = await fetch("http://localhost:8000/api/v1/users/login/success", {
//     credentials: "include",
//   });
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   const resJson = await res.json();
//   console.log("resJson", resJson);
//   if (resJson.status == false) {
//     return null;
//   }
//   return resJson.data;
// }
