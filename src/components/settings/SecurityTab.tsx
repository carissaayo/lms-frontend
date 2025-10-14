import { Lock } from "lucide-react";
import PasswordChangeForm from "./PasswordChangeForm"
const  SecurityTab =()=> {
  return (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Security Settings</h2>
              <p className="text-sm text-gray-600 mt-1">
                Keep your account secure by updating your password regularly
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <PasswordChangeForm />
        </div>
      </div>

      
    </div>
  );
}
export default SecurityTab;