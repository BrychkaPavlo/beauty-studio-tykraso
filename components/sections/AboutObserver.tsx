"use client";

import { RefObject, useEffect } from "react";

interface AboutObserverProps{
    sectionRef: RefObject<HTMLElement | null>;
}

export default function AboutObserver({
    sectionRef,
}:AboutObserverProps){

    useEffect(()=>{

        const section = sectionRef.current;

        if(!section) return;

        const observer = new IntersectionObserver(

            ([entry])=>{

                if(entry.isIntersecting){

                    section.classList.add("show");

                    observer.disconnect();

                }

            },

            {
                threshold:.2,
            }

        );

        observer.observe(section);

        return ()=>observer.disconnect();

    },[sectionRef]);

    return null;

}