/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProfileImage = () => {
  const { token, updateAvatarHandler, employeeDetails } =
    useContext(AuthContext);

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAvatar = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      await updateAvatarHandler(token, formData, id);
      setLoading(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <div>
      <Card className="ml-2 mr-2">
        <CardHeader>
          <CardTitle className="text-base">Profile image</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src={
                      employeeDetails?.avatar || "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-right pt-4">
                <form onSubmit={uploadAvatar}>
                  <div className="flex">
                    <Input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="mr-2"
                    />
                    <Button>{loading ? "Uploading..." : "Upload"}</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileImage;
