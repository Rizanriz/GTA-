import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import "../index.css";

gsap.registerPlugin(SplitText);

const Team = () => {
    useEffect(() => {
        const profileImagesContainer = document.querySelector(".profile-images");
        const profileImages = document.querySelectorAll(".profile-images .img");
        const nameElements = document.querySelectorAll(".profile-names .name");
        const nameHeadings = document.querySelectorAll(".profile-names .name h1");

        nameHeadings.forEach((heading) => {
            const split = new SplitText(heading, { type: "chars" });
            split.chars.forEach((char) => char.classList.add("letter"));
        });

        const defaultLetters = nameElements[0].querySelectorAll(".letter");
        gsap.set(defaultLetters, { y: "100%" });

        if (window.innerWidth >= 900) {
            profileImages.forEach((img, index) => {
                const correspondingName = nameElements[index + 1];
                const letters = correspondingName.querySelectorAll(".letter");

                img.addEventListener("mouseenter", () => {
                    gsap.to(img, {
                        scale: 2,
                        duration: 0.5,
                        ease: "power4.out",
                    });
                    profileImages.forEach((otherImg, i) => {
                        if (i !== index) {
                            const direction = i < index ? -1 : 1;
                            gsap.to(otherImg, {
                                x: 30 * direction,
                                duration: 0.5,
                                ease: "power4.out",
                            });
                        }
                    });

                    gsap.to(letters, {
                        y: -140,
                        duration: 0.75,
                        ease: "power4.out",
                        stagger: { each: 0.025, from: "center" },
                    });
                });

                img.addEventListener("mouseleave", () => {
                    gsap.to(img, {
                        scale: 1,
                        duration: 0.5,
                        ease: "power4.out",
                    });

                    profileImages.forEach((otherImg) => {
                        gsap.to(otherImg, {
                            x: 0,
                            duration: 0.5,
                            ease: "power4.out",
                        });
                    });

                    gsap.to(letters, {
                        y: "0%",
                        duration: 0.75,
                        ease: "power4.out",
                        stagger: { each: 0.025, from: "center" },
                    });
                });
            });

            profileImagesContainer.addEventListener("mouseenter", () => {
                gsap.to(defaultLetters, {
                    y: "0%",
                    duration: 0.75,
                    ease: "power4.out",
                    stagger: { each: 0.025, from: "center" },
                });
            });

            profileImagesContainer.addEventListener("mouseleave", () => {
                gsap.to(defaultLetters, {
                    y: "100%",
                    duration: 0.75,
                    ease: "power4.out",
                    stagger: { each: 0.025, from: "center" },
                });
            });
        }
    }, []);

    const Names = ["Lucia", "Jason", "Tommy", "Rico", "Diego", "Mickey", "Elena", "Vinny", "Isabella"];
    const images = Array.from({ length: Names.length }, (_, i) => `/img/img${i + 1}.jpg`);

    return (
        <section className="team">
            <div className="profile-images">
                {images.map((src, i) => (
                    <div className="img" key={i}>
                        <img src={src} alt={`${Names[i]}`} />
                    </div>
                ))}
            </div>
            <div className="profile-names">
                <div className="name default"><h1>THE SQUAD</h1></div>
                {Names.map((name, i) => (
                    <div className="name" key={i}>
                        <h1>{name}</h1>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
