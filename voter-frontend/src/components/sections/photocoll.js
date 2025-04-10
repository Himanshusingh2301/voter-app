import React from "react";
import "./photocoll.css";

const ECSection = () => {
    return (
        <section className="photo-video-section py-4">
            <div className="container-fluid">
                <div className="row gx-0 ">
                    {/* Left Column - EC Members */}
                    <div className="col-md-3 col-12 left">
                        <div className="ec-officer">
                            <div className="page-title">HON'BLE COMMISSION</div>

                            {/* EC Members */}
                            {[
                                {
                                    name: "Shri Gyanesh Kumar",
                                    title: "Chief Election Commissioner",
                                    img: "/img2/cec-Shri-Gyanesh-Kumar.jpg",
                                    link: "/cec-shri-gyanesh-kumar",
                                },
                                {
                                    name: "Dr. Sukhbir Singh Sandhu",
                                    title: "Election Commissioner",
                                    img: "/img2/EC-Dr-Sukhbir-Singh-Sandhu.jpg",
                                    link: "/ec-dr-sukhbir-singh-sandhu",
                                },
                                {
                                    name: "Dr. Vivek Joshi",
                                    title: "Election Commissioner",
                                    img: "/img2/dr-vivek-joshi.png",
                                    link: "/ec-dr-vivek-joshi",
                                },
                            ].map((ec, index) => (
                                <div className="ec-box" key={index}>
                                    <div className="ec-profile">
                                        <div className="frame-left"></div>
                                        <a href={ec.link}>
                                            <img src={ec.img} alt={ec.name} />
                                        </a>
                                        <div className="frame-right"></div>
                                    </div>
                                    <div className="pro-title">
                                        <h6>{ec.name}</h6>
                                        <p>{ec.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center Column - Photos */}
                    <div className="col-md-6 col-12 center">
                        <div className="photo-gallery">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="photo-frame frame-hght-01">
                                        <img src="/img2/cec_gyanesh_with_president.jpg" alt="CEC with President" />
                                    </div>
                                    <div className="photo-frame frame-hght-01a mrg-top-3">
                                        <img src="/img2/003.jpg" alt="Gallery 003" />
                                    </div>
                                </div>

                                <div className="col-md-6 col-12 d-grid">
                                    <div className="photo-frame frame-hght-02">
                                        <img src="/img2/004.jpg" alt="Gallery 004" />
                                    </div>
                                    <div className="photo-frame frame-hght-02">
                                        <img src="/img2/005.jpg" alt="Gallery 005" />
                                    </div>
                                    <div className="photo-frame frame-hght-02a mrg-top-3">
                                        <img src="/img2/006.jpg" alt="Gallery 006" />
                                    </div>
                                </div>
                            </div>
                            <div className="btn">
                               
                                <a href="/photo-gallery">Photo Gallery </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Campaign + Video */}
                    <div className="col-md-3 col-12 right">
                        <div className="ec-officer">
                            <figure className="noth">
                                <img src="/img2/one-voter-sure.png" alt="Nothing like voting" />
                            </figure>
                            <div className="video-wrap">
                                <div className="video-frame">
                                    <a href="https://www.youtube.com/embed/to324JIljf8" target="_blank" rel="noopener noreferrer">
                                        <img src="/img2/group-1420.jpg" alt="Video Cover" />
                                    </a>
                                </div>
                            </div>
                            <div className="btn rbtn">
                                <a href="/video">Video Gallery </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ECSection;
