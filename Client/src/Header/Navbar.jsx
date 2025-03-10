import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
const data = [
  {
    id: 1,
    item: "Employee_List",
    link: "employee-list",
  },
];
export function Navbar() {
  const navigate = useNavigate();
  const { user, token, logoutHandler } = useContext(AuthContext);
  const [key, setKey] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/edit-employee/${key}`);
  };
  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          {token && (
            <>
              {data.map((item, index) => {
                return (
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    key={index}
                    to={item?.link}
                  >
                    {item?.item}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              {token && (
                <>
                  {data.map((item, index) => {
                    return (
                      <Link
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        key={index}
                        to={item?.link}
                      >
                        {item?.item}
                      </Link>
                    );
                  })}
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {token ? (
          <>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form
                className="ml-auto flex-1 sm:flex-initial"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by Uniue Id..."
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>

                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full  gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
              <ModeToggle />
            </div>
          </>
        )}
      </header>
    </div>
  );
}
