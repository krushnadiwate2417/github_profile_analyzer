import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
    CardContent,
    CardDescription,
  } from "@/components/ui/card";
  
  const RepoCard = ({ repoDetails }: { repoDetails: any }) => {
    const handleDate = (updatedDate: Date) => {
      const d = new Date(updatedDate);
      const dd = d.getDate().toString().padStart(2, "0");
      const mm = (d.getMonth() + 1).toString().padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    };
  
    return (
      <div>
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">{repoDetails.name}</CardTitle>
            <CardDescription className="text-gray-500">
              {repoDetails.description || "No Description"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              className="text-blue-600 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
              href={repoDetails.html_url}
            >
              Go to Repo
            </a>
          </CardContent>
          <CardFooter className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <p>📅 {handleDate(repoDetails.updated_at)}</p>
            <p>🔒 {repoDetails.private ? "Private" : "Public"}</p>
            <p>🍴 {repoDetails.forks}</p>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default RepoCard;
  