import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecordingId() {
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <Tabs defaultValue="transcript" className="w-full">
        <TabsList>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-4" value="transcript">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="summary">Change your password here.</TabsContent>
      </Tabs>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-center pb-4">
          Action Items
        </h2>
        <Card>
          <CardContent className="flex space-x-4 items-center">
            <Checkbox />
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
