import { Button } from "@/components/ui/button";
import { PROFILE_URL } from "@/constants/urls";
import { useState } from "react";
import RepoCard from "./CardsRepo";
import CommitChartAllRepos from "./Chart";

const Profile = ({ userDetails }: { userDetails: any }) => {
  const [repos, setRepos] = useState([]);
  const [err, setErr] = useState("");

  const handleRepoFetch = async () => {
    try {
      const response = await fetch(PROFILE_URL + userDetails.login + "/repos");
      const result = await response.json();
      if (!response.ok) {
        setErr(result.message);
      }
      setRepos(result);
    } catch (error: any) {
      setErr(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-[0.5fr_2fr] gap-6 justify-self-center mb-11 border-b border-gray-300 pb-6 bg-white rounded-xl shadow-md p-6">
        <div className="flex rounded-full justify-center items-center">
          <img
            src={userDetails.avatar_url}
            alt="Profile Photo"
            className="w-24 h-24 rounded-full md:w-28 md:h-28 border border-gray-300"
          />
        </div>
        <div className="flex flex-col justify-center text-gray-800 gap-3">
          <div className="text-lg font-medium">Username: {userDetails.login}</div>
          <div className="text-sm">
            GitHub URL:&nbsp;
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={userDetails.html_url}
            >
              {userDetails.html_url}
            </a>
          </div>
          <div className="flex gap-8 mt-2 text-center">
            <div className="flex flex-col">
              <h5 className="text-sm text-gray-500">Public Repos</h5>
              <h2 className="text-lg font-bold">{userDetails.public_repos}</h2>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-gray-500">Following</h5>
              <h2 className="text-lg font-bold">{userDetails.following}</h2>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-gray-500">Followers</h5>
              <h2 className="text-lg font-bold">{userDetails.followers}</h2>
            </div>
          </div>
        </div>
      </div>

      {err && <p className="text-red-600 text-sm text-center">{err}</p>}

      {repos.length === 0 && (
        <div className="text-center mt-4">
          <Button onClick={handleRepoFetch}>Show Repos</Button>
        </div>
      )}

      {repos.length > 0 && (
        <div className="flex flex-col items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90vw] max-w-6xl">
            {repos.map((repo, index) => (
              <RepoCard key={index} repoDetails={repo} />
            ))}
          </div>
          <div className="my-8 justify-self-center">
            <CommitChartAllRepos username={userDetails.login} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
