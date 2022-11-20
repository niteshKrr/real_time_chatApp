import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SignUp from "../components/authentication/SignUp";
import SignIn from "../components/authentication/SignIn";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#139bc8] to-[#b3dbf1] h-screen">
      <div className="grid grid-cols-2 gap-4 container mx-auto">
        <div className="flex items-center justify-center h-screen">
          <div className="mr-10">
            <SignUp />
          </div>
          <div>
            <SignIn />
          </div>
        </div>
        <div>
          <Image
            className=" img flex justify-start "
            alt="loading..."
            src="/images/special/home-removebg.png"
            height="50"
            width="400"
          />
        </div>
      </div>
    </div>
  );
}
