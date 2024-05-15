import StoreProvider from "@/lib/redux-store/StoreProvider";
import ProductList from "./ProductList";

export default function LoginSuccessPage() {
  return (
    <section
      id="Section"
      className={`bg-gray-300 py-[35px] sm:py-[50px] px-2 sm:px-[35px] xl:px-[70px] min-h-screen  
    |||  flex flex-col justify-center items-center`}
    >
      <StoreProvider>
        <ProductList />
      </StoreProvider>
    </section>
  );
}
