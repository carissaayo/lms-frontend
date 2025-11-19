import useAuthStore from "@/store/useAuthStore";

const Forbidden = () => {
    const { errorMessage } = useAuthStore((state) => state);
    console.log(errorMessage,"fjjf");
    
  return (
   <div className="w-full flex justify-center my-10">
            <h2 className="text-2xl font-semibold text-red-500">
             {errorMessage}
            </h2>
          </div>
  )
}

export default Forbidden