
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotAuthenticated = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Not Authenticated</CardTitle>
          <CardDescription>You need to be logged in to edit your profile.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link to="/">
            <Button className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotAuthenticated;
