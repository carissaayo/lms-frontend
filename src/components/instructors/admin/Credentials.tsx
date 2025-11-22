import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, CheckCircle,} from "lucide-react";
import { InstructorDetail } from "@/types/instructor.types";


const CredentialsTab = ({ instructor }: { instructor: InstructorDetail }) => {
  return (
    <>
      {instructor.education && instructor.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instructor.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {instructor.certifications && instructor.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instructor.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CredentialsTab;
