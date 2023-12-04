import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabView = () => {
  return (
    <Tabs defaultValue="top-posts" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="top-posts" className="">
          Top Posts
        </TabsTrigger>
        <TabsTrigger value="answers" className="">
          Answers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="top-posts">Top posts</TabsContent>
      <TabsContent value="answers">Top answers</TabsContent>
    </Tabs>
  );
};

export default TabView;
