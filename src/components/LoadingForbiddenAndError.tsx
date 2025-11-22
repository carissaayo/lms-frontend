import useAuthStore from '@/store/useAuthStore';
import Forbidden from './forbidden';

const LoadingForbiddenAndError = ({
  isLoading,
  error,
  title
}: {
  isLoading: boolean;
  error:Error|null;
  title:string
}) => {
  const { isForbidden } = useAuthStore.getState();
  return (
    <>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="w-full flex justify-center my-10">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      {isForbidden && error && <Forbidden />}
      {error && !isForbidden && (
        <p className="text-red-600 text-center mt-10">
          Failed to load ${title}.
        </p>
      )}
    </>
  );
};

export default LoadingForbiddenAndError