import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCategory } from "@/types/course.types";

interface BasicInfoProps {
  formData: any;
  handleChange: (e: any) => void;
  level: string;
  setLevel: (val: string) => void;
  language: string;
  setLanguage: (val: string) => void;
  COURSE_LEVELS: string[];
  LANGUAGES: string[];
}

export default function BasicInfo({
  formData,
  handleChange,
  level,
  setLevel,
  language,
  setLanguage,
  COURSE_LEVELS,
  LANGUAGES,
}: BasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Complete Web Development Bootcamp"
            required
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">Course Description *</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what students will learn..."
            required
            className="mt-1.5"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={(value) =>
                handleChange({ target: { name: "category", value } } as any)
              }
              required
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CourseCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level">Course Level *</Label>
            <Select value={level} onValueChange={setLevel} required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_LEVELS.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Language *</Label>
            <Select value={language} onValueChange={setLanguage} required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes) *</Label>
            <Input
              id="duration"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 120"
              required
              min="1"
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="price">Price (₦) *</Label>
          <Input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 50000"
            required
            min="0"
            className="mt-1.5"
          />
          
        </div>
      </CardContent>
    </Card>
  );
}
