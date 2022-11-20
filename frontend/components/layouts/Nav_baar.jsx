import React from "react";
import { Navbar, Button } from "flowbite-react";
import Image from "next/image";

const Nav_baar = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <Image
          src="/images/special/icon.png"
          height="60"
          width="40"
          alt="logo..."
          className="mr-2"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          S-Chat
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button gradientDuoTone="greenToBlue" className="mr-3">
          Get started
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" className="text-xl" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="text-xl">
          About
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="text-xl">
          Services
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="text-xl">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="text-xl">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav_baar;
