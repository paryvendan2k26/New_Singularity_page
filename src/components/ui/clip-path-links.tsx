"use client";

import React from "react";
import { SiGoogle, SiTiktok, SiSpotify } from "react-icons/si";
import { FaDiscord } from "react-icons/fa";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { useAnimate } from "framer-motion";

export const ClipPathLinks = () => {
  return (
    <div className="divide-y border divide-white/10 border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="grid grid-cols-2 divide-x divide-white/10">
        <LinkBox Icon={SiGoogle} href="mailto:kamalkamalesh316@gmail.com" />
        <LinkBox Icon={Github} href="https://github.com/kamaleshsa" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-white/10">
        <LinkBox Icon={Twitter} href="https://x.com/Kamales71036733" />
        <LinkBox Icon={Linkedin} href="https://www.linkedin.com/in/kamaleshsa" />
        <LinkBox Icon={Instagram} href="https://www.instagram.com/k.a.m.a_l" />
        <LinkBox Icon={Facebook} href="https://www.facebook.com/share/16Zgo4MK6M/" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <LinkBox Icon={FaDiscord} href="https://discord.com/users/1367756111725334599" />
        <LinkBox
          href="https://21st.dev/kamaleshsa"
          imgSrc="https://media.licdn.com/dms/image/v2/D4E0BAQH3Jqtih4t7-A/company-logo_200_200/B4EZY_fSK1HUAM-/0/1744821888382/21st_dev_logo"
        />
        <LinkBox
          href="https://kamaleshsaportfolio.netlify.app/"
          imgSrc="https://i.ibb.co/q36kg6qT/fotor-2025052503615.png"
        />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, imgSrc, className }: any) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent) => {
    const box = e.currentTarget.getBoundingClientRect();
    const proximityToLeft = { proximity: Math.abs(box.left - e.clientX), side: "left" };
    const proximityToRight = { proximity: Math.abs(box.right - e.clientX), side: "right" };
    const proximityToTop = { proximity: Math.abs(box.top - e.clientY), side: "top" };
    const proximityToBottom = { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" };
    const sortedProximity = [proximityToLeft, proximityToRight, proximityToTop, proximityToBottom].sort((a, b) => a.proximity - b.proximity);
    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const side = getNearestSide(e) as keyof typeof ENTRANCE_KEYFRAMES;
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[side] });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e) as keyof typeof EXIT_KEYFRAMES;
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[side] });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-white bg-transparent"
    >
      {imgSrc ? (
        <img src={imgSrc} alt="icon" className={className ?? "max-h-8 sm:max-h-12 object-contain opacity-50"} />
      ) : (
        <Icon className="text-xl sm:text-3xl opacity-50" />
      )}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-white text-black transition-colors duration-300"
      >
        {imgSrc ? (
          <img src={imgSrc} alt="icon hover" className={className ?? "max-h-8 sm:max-h-12 object-contain grayscale invert"} />
        ) : (
          <Icon className="text-xl sm:text-3xl" />
        )}
      </div>
    </a>
  );
};