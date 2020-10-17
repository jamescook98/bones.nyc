import React, { useState, useEffect } from 'react';
import Event from "../Event"
import Carousel from "../Carousel"
import axios from "axios"
import Footer from "../Footer"
// import Logo from "../../assets/bones_higer_res.png";

export default function EventsPage() {
    // const logoStyle = {
    //     position: `absolute`,
    //     top: `16px`,
    //     left: `45px`,
    //     zIndex: "6"
    // }
    const [events, setEvent] = useState([])

    useEffect(() => {
        axios.get("/api/event").then((eventsList) => {
            setEvent(eventsList.data)
        })
    }, [])

    const handleOnInputChange = (() => {
        const startdate = document.getElementById("searchInput").value;
        axios.get("/api/event/" + startdate).then((eventsList) => {
            setEvent(eventsList.data);
        })
    })

    return (
        <div className="mx-auto d-flex flex-column mt-5">
            {/* <img src={Logo} alt="bones_logo" style={logoStyle} /> */}
            <Carousel />
            <div className="input-group my-5 d-flex justify-content-center align-items-center">
                <h5 className="mr-3 my-auto">Search Events by Date:</h5>
                <input type="date" className="form-control col-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="searchInput" />
                <button type="button" className="btn btn-info my-auto ml-3 btn-sm" onClick={handleOnInputChange}>Search</button>
            </div>
            {events.map((event, index) =>
                <Event
                    key={event._id}
                    id={index}
                    date={event.date}
                    venueName={event.venueName}
                    address={event.address}
                    startTime={event.startTime}
                    eventName={event.eventName}
                    cover={event.cover}
                    sets={event.sets} />)}
            <Footer />
        </div>

    );
}