import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { PROFILE_URL } from './constants/urls';
import Profile from './reactComponents/Profile';

function App() {
  const [gitUserName, setGitUserName] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gitUserName.length > 0) {
      try {
        const response = await fetch(PROFILE_URL + (gitUserName).toLowerCase());
        const result = await response.json();
        if (!response.ok) {
          return setErrorMsg(result.message);
        }
        setErrorMsg("");
        setSearchResult(result)
      } catch (error) {
        setErrorMsg('Something Went Wrong')
      }
    }
  }

  return (
    <>
      {!searchResult && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm transition-all duration-300 ease-in-out"
          >
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              GitHub Profile Analyzer
            </h1>
            <Input
              className="border border-gray-300 focus:border-blue-500 my-4 w-full text-sm placeholder:text-gray-400"
              onChange={(e) => setGitUserName(e.target.value)}
              required
              placeholder="Enter Username..."
            />
            <Button type="submit" className="w-full">
              Search
            </Button>
            {errorMsg && (
              <p className="text-red-600 text-xs mt-2 text-center">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      )}
      {searchResult && <Profile userDetails={searchResult} />}
    </>
  )
}

export default App
