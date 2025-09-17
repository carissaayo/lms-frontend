import { useState } from "react";
import { useEnrollCourse } from "@/hooks/use-course";
import { X, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Course } from "@/types/course.types";
import { Button } from "../ui/button";
import useAuthStore from "@/store/useAuthStore";

interface ModalProps {
  course: Course;
  onClose: () => void;
}

const CourseModals = ({ course, onClose }: ModalProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user } = useAuthStore((state) => state);

  const email = user?.email;
  const enrollMutation = useEnrollCourse();

  const handleConfirmPurchase = async () => {
    try {
      await enrollMutation.mutateAsync(course._id);
      setShowConfirmModal(false);
      setShowPaymentModal(true);

      toast.success("Enrollment successful!", {
        description: `You are now enrolled in ${course.title}.`,
        position: "top-center",
      });
    } catch (error: any) {
      toast.error("Enrollment failed", {
        description: error?.response?.data?.message || "Something went wrong.",
        position: "top-center",
      });
    }
  };

  const handleClose = () => {
    setShowConfirmModal(false);
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 h-screen w-screen bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-2/5 border-2 border-gray-300 ">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-300">
              <h3 className="text-lg font-semibold font-heading">
                Confirm Enrollment
              </h3>
              <Button
                onClick={handleClose}
                className="cursor-pointer rounded-full h-8 w-8 hover:scale-110"
              >
                <X size={30} />
              </Button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-blue-600 mr-3" size={24} />
                <h4 className="text-md font-medium">
                  You're about to enroll in {course.title}
                </h4>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-bold text-blue-600">
                    ₦{course.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                We'll send a confirmation email to{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 p-6 border-t border-gray-300">
              <Button
                onClick={handleClose}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2  hover:text-gray-800 w-full sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                onClick={handleConfirmPurchase}
                disabled={enrollMutation.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center w-full sm:w-auto"
              >
                {enrollMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Enrolling...
                  </>
                ) : (
                  "Confirm Enrollment"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 h-screen w-screen bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full text-center p-6 border border-gray-300">
            <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold mb-2">
              Enrollment Initiated🎉
            </h3>
            <p className="text-gray-600 mb-4">
              A payment link has been sent to {email}.
            </p>
            <button
              onClick={handleClose}
              className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseModals;
