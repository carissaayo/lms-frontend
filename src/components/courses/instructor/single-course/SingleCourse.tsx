import { Course, CourseStatus } from '@/types/course.types';
import CourseLessons from './CourseLessons';
import { Lesson } from '@/types/lesson.types';

const SingleCourse = ({
  course,
  lessons,
  newLesson,
  setNewLesson,
}: {
  course: Course;
  lessons: Lesson[];
  newLesson: string;
  setNewLesson: (e: string) => void;
}) => {
  return (
    <>
      {/* Cover Image */}

      {course.coverImage && (
        <div className="w-full h-64 rounded-2xl overflow-hidden shadow">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Course Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <p className="text-muted-foreground">{course.category}</p>
          </section>

          {/* Lessons Section */}
          <CourseLessons
            lessons={lessons}
            newLesson={newLesson}
            setNewLesson={setNewLesson}
          />
        </div>

        {/* Sidebar */}
        <aside className="bg-card p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Course Info</h2>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-medium">
              ₦{course.price.toLocaleString?.() ?? course.price}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span
              className={`font-medium ${
                course.status === CourseStatus.APPROVED
                  ? "text-green-600"
                  : course.status === CourseStatus.PENDING
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {course.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Enrolled Students:</span>
            <span className="font-medium">{course.enrollments ?? 0}</span>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SingleCourse