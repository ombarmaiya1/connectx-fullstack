import React from "react";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { SocialFeed } from "./SocialFeed";
import { CTA } from "./CTA";

export const Landing = () => {
    return (
        <main className="main-content">
            <Hero />
            <Features />
            <SocialFeed />
            <CTA />
        </main>
    );
};
