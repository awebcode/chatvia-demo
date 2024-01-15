import "./AuthLayout.scss";

import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Images } from "../../../constants";
import { Seo } from "../../common/Seo/Seo";
import { cookies } from "../../../utils";
import { useNavigate } from "react-router-dom";

export interface IAppProps {
  children: React.ReactNode;

  style?: React.CSSProperties;

  title: string;
  layoutDescription: string;
}

export function AuthLayout({
  children,
  style,
  title,
  layoutDescription,
}: IAppProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = cookies.getCookie("user");

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <Seo
        data={{
          title: `${title} | Chatvia`,
          description:
            "Stay in touch! Free online calls, messaging, affordable international calling to mobiles or landlines, and instant online meetings on Chatvia.",
          url: "https://chatviaa.vercel.app/",
          thumbnailUrl:
            "https://i.pinimg.com/236x/a7/80/9b/a7809b7ad7d11c7df28cbaafbfb33379.jpg",
        }}
      />
      <div
        className="w-full flex-center container auth-layout"
        style={{ ...style, height: "100vh" }}
      >
        <div className="w-4/5 flex-center wrapper font-bold">
          <Card
            className="text-black w-2/4 rounded-md auth-card"
            elevation={10}
          >
            <CardContent>
              <div className="w-full mb-6">
                <div className="w-full h-8 flex justify-center mb-4">
                  <img
                    className="w-4/5 h-full object-contain"
                    src={Images.logo}
                    alt="logo"
                  />
                </div>

                <h4 className="text-center text-xl font-semibold">{title} </h4>
                <p className="text-gray-400 text-center text-base">
                  {layoutDescription}
                </p>
              </div>

              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
