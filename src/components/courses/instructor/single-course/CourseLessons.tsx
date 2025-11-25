import { Button } from "@/components/ui/button";
import { Lesson } from "@/types/lesson.types";
import { Link } from "@tanstack/react-router";

const CourseLessons = ({
  newLesson,
  setNewLesson,
  lessons,
}: {
  newLesson: string;
  setNewLesson: (e: string) => void;
  lessons: Lesson[];
}) => {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lessons</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLesson}
            onChange={(e) => setNewLesson(e.target.value)}
            placeholder="Lesson name..."
            className="border rounded-lg px-3 py-1 text-sm"
          />
          <Button>
            <Link to="/instructor/lessons/new">Create New Lesson</Link>
          </Button>
        </div>
      </div>

      {lessons?.length > 0 ? (
        <ul className="space-y-2 mb-10">
          {lessons.map((lesson) => (
            <li
              key={lesson.position}
              className="flex gap-3 items-center border-b border-gray-200 pb-2"
            >
              <span className="font-semibold">{lesson.position}.</span>
              <span>{lesson.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground italic">
          No lessons yet. Add your first lesson.
        </p>
      )}
    </section>
  );
};

export default CourseLessons;
