import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import { Link } from "react-router-dom";

const TitleCard = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2YzODFiZGEwOTEzMDRmMTg4ZGIxMzQxYTNiNDUzNCIsIm5iZiI6MTc0MDMxNDcyNi42NDEsInN1YiI6IjY3YmIxODY2ZWZmZWI5NmU5ZTBhYWZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iP7tn-s5GV9g3ZGPpH9UXxpJKpeWSSbs11ctKX0JA6M",
        },
    };

    const handlewheel = (event) => {
        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
                    options
                );
                const data = await response.json();
                if (data.results) {
                    setApiData(data.results);
                } else {
                    console.error("No results found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        if (cardsRef.current) {
            cardsRef.current.addEventListener("wheel", handlewheel);
        }

        return () => {
            if (cardsRef.current) {
                cardsRef.current.removeEventListener("wheel", handlewheel);
            }
        };
    }, [category]);

    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    if (!card.backdrop_path) {
                        return null;
                    }
                    return (
                        <Link to={`/player/${card.id}`} key={index} className="card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                                alt="card-pic"
                            />
                            <p>{card.original_title}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TitleCard;
